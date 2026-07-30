import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TodayCallList.module.css";
import { PatientDetailPanel } from "./components/PatientDetailPanel";
import { CallModal } from "./components/CallModal";
import type { MedicalRecordDetailVO, MedicalRecordOptionVO, PrescriptionHistoryVO, WaitingListVO } from "../types";
import { WaitingListTable } from "./components/WaitingListTable";
import axios from "axios";

export function TodayCallList() {
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");
    const [list, setList] = useState<WaitingListVO[]>([]);
    const [selected, setSelected] = useState<WaitingListVO | null>(null);

    const [checkedDocs, setCheckedDocs] = useState<string[]>([]);

    const [recordOptions, setRecordOptions] = useState<MedicalRecordOptionVO[]>([]);
    const [selectedRecordNumber, setSelectedRecordNumber] = useState<string>("");
    const [lastRecordNumber, setLastRecordNumber] = useState(selectedRecordNumber);
    const [recordDetail, setRecordDetail] = useState<MedicalRecordDetailVO[]>([]);
    const [prescriptionHistory, setPrescriptionHistory] = useState<PrescriptionHistoryVO[]>([]);

    const [callingPatient, setCallingPatient] = useState<WaitingListVO | null>(null);
    const [callError, setCallError] = useState(false);

    const fetchWaitingList = () => {
        axios.get<WaitingListVO[]>(`/api/doctor/waiting-list`)
            .then((res) => setList(res.data))
            .catch((err) => console.error("진료대기목록조회실패: ", err));
    };

    useEffect(() => {
        fetchWaitingList();
    }, []);

    const filteredList = list.filter((item) => {
        const trimmed = keyword.trim();
        if (!trimmed) return true;
        return item.memberName.includes(trimmed) || item.birthDate.includes(trimmed);
    });

    const handleSelectRow = (item: WaitingListVO) => {
        setSelected(item);
        setCheckedDocs([]);
        setRecordDetail([]);
        setSelectedRecordNumber("");

        axios.get<MedicalRecordOptionVO[]>(`/api/doctor/medical-record-options`, {
            params: { medicalNumber: item.medicalNumber },
        })
            .then((res) => {
                setRecordOptions(res.data);
                if (res.data.length > 0) {
                    setSelectedRecordNumber(res.data[0].medicalRecordNumber);
                }
            })
            .catch((err) => console.error("진료기록 목록 조회 실패: ", err))
    };

    if (selectedRecordNumber !== lastRecordNumber) {
        setLastRecordNumber(selectedRecordNumber);
        setRecordDetail([]);
    }

    useEffect(() => {
        if (!selectedRecordNumber) return;

        axios.get<MedicalRecordDetailVO[]>(`/api/doctor/medical-record-detail`, {
            params: { medicalRecordNumber: selectedRecordNumber },
        })
            .then((res) => setRecordDetail(res.data))
            .catch((err) => console.error("진료기록 상세 조회 실패 : ", err))

        axios.get<PrescriptionHistoryVO[]>(`/api/doctor/prescription-history`, {
            params: { medicalRecordNumber: selectedRecordNumber },
        })
            .then((res) => setPrescriptionHistory(res.data))
            .catch((err) => console.error("처방 이력 조회 실패 : ", err));
    }, [selectedRecordNumber]);

    const toggleDoc = (id: string) => {
        setCheckedDocs((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    const handleCallClick = () => {
        if (!selected) return;

        if (selected.receiptStatus === "진료중") {
            navigate(`/doctor/diagnose?medicalNumber=${selected.medicalNumber}`);
            return;
        }
        // 호출 성공시 음성안내 재생
        speakAnnouncement(`${selected.memberName}님, 진료실로 들어와주시길 바랍니다.`);
        setCallingPatient(selected);
        setCallError(false);
    };

    const handleModalClose = () => {
        setCallingPatient(null);
        setCallError(false);
        fetchWaitingList();
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        return dateStr.replaceAll("-", ".");
    };

    // 텍스트를 음성으로 읽어주는 함수
    const speakAnnouncement = (text: string) => {
        if (!("speechSynthesis" in window)) {
            console.error("이 브라우저는 음성안내를 지원하지 않습니다.")
            return;
        }
        // 읽을 문장을 담는 객체 생성
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ko-KR";
        utterance.rate = 0.9; // 읽는 속도

        // 실제 읽기 시작
        window.speechSynthesis.speak(utterance);

    };

    const handleModalConfirm = () => {
        if (!callingPatient) return;

        axios.post(`/api/doctor/call-patient`, { medicalNumber: callingPatient.medicalNumber })
            .then(() => {
                navigate(`/doctor/diagnose?medicalNumber=${callingPatient.medicalNumber}`);
            })
            .catch((err) => {
                console.error("환자 호출 실패 : ", err);
                setCallError(true);
            });
    };

    return (
        <div className={styles.callListContainer}>
            <div className={styles.mainRow}>
                <div className={styles.listPanel}>
                    <div className={styles.filterRow}>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="환자명 또는 생년월일을 검색해주세요"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button
                            className={styles.callButtonTop}
                            onClick={handleCallClick}
                            disabled={!selected}
                        >
                            {selected?.receiptStatus == "진료중" ? "진료 이어하기" : "진료하기"}
                        </button>
                    </div>

                    <WaitingListTable
                        list={list}
                        filteredList={filteredList}
                        selected={selected}
                        onSelectRow={handleSelectRow}
                        formatDate={formatDate}
                    />
                </div>

                <PatientDetailPanel
                    key={selected?.medicalNumber ?? "empty"}
                    selected={selected}
                    checkedDocs={checkedDocs}
                    onToggleDoc={toggleDoc}
                    recordOptions={recordOptions}
                    selectedRecordNumber={selectedRecordNumber}
                    onChangeRecordNumber={setSelectedRecordNumber}
                    recordDetail={recordDetail}
                    prescriptionHistory={prescriptionHistory}
                    formatDate={formatDate}
                />
            </div>

            {callingPatient && (
                <CallModal
                    patient={callingPatient}
                    error={callError}
                    onConfirm={handleModalConfirm}
                    onClose={handleModalClose}
                />
            )}
        </div>
    );
}