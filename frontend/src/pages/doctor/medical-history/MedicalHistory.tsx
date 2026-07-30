import { useEffect, useMemo, useState } from "react";
import styles from "./MedicalHistory.module.css";
import type { MedicalHistoryListVO, MedicalRecordDetailVO, MedicalRecordOptionVO, PrescriptionHistoryVO } from "../types";
import { MedicalHistoryList } from "./components/MedicalHistoryList";
import { MedicalRecordTab } from "../components/MedicalRecordTab";
import axios from "axios";
export function MedicalHistory() {

    const [keyword, setKeyword] = useState("");
    const [rawList, setRawList] = useState<MedicalHistoryListVO[]>([]);

    const [selected, setSelected] = useState<MedicalHistoryListVO | null>(null);

    const [recordOptions, setRecordOptions] = useState<MedicalRecordOptionVO[]>([]);
    const [selectedRecordNumber, setSelectedRecordNumber] = useState("");
    const [lastRecordNumber, setLastRecordNumber] = useState(selectedRecordNumber);
    const [recordDetail, setRecordDetail] = useState<MedicalRecordDetailVO[]>([]);
    const [prescriptionHistory, setPrescriptionHistory] = useState<PrescriptionHistoryVO[]>([]);
    const [recordSubTab, setRecordSubTab] = useState<"soap" | "prescription">("soap");

    const handleUpdateRecord = (updated: MedicalRecordDetailVO) => {
        axios.put(`/api/doctor/medical-record-detail`, updated)
            .then(() => {
                setRecordDetail((prev) =>
                    prev.map((r) => (r.medicalNumber === updated.medicalNumber ? updated : r))
                );
            })
            .catch((err) => console.error("SOAP 수정 실패 : ", err))
    };

    // 검색어 바뀔때마다 서버에 재 조회
    useEffect(() => {
        const timer = setTimeout(() => {
            axios.get<MedicalHistoryListVO[]>(`/api/doctor/medical-history`, {
                params: { keyword: keyword.trim() || undefined },
            })
                .then((res) => setRawList(res.data))
                .catch((err) => console.error("진료 이력 목록 조회 실패 : ", err))
        }, 300);

        return () => clearTimeout(timer);
    }, [keyword]);

    // 환자별 최근 방문 1건만 남기기
    const patientList = useMemo(() => {
        const seen = new Set<string>();
        const result: MedicalHistoryListVO[] = [];
        for (const item of rawList) {
            const key = `${item.memberName}_${item.birthDate}`;
            if (seen.has(key)) continue;
            seen.add(key);
            result.push(item);
        }
        return result;
    }, [rawList])

    const handleSelectRow = (item: MedicalHistoryListVO) => {
        setSelected(item);
        setSelectedRecordNumber("");
        setRecordDetail([]);

        axios.get<MedicalRecordOptionVO[]>(`/api/doctor/medical-record-options`, {
            params: { medicalNumber: item.medicalNumber },
        })
            .then((res) => {
                setRecordOptions(res.data);
                if (res.data.length > 0) {
                    setSelectedRecordNumber(res.data[0].medicalRecordNumber);
                }
            })
            .catch((err) => console.error("진료기록 목록 조회 실패 : ", err));
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
            .catch((err) => console.error("진료기록 상세 조회 실패 : ", err));

        axios.get<PrescriptionHistoryVO[]>(`/api/doctor/prescription-history`, {
            params: { medicalRecordNumber: selectedRecordNumber },
        })
            .then((res) => setPrescriptionHistory(res.data))
            .catch((err) => console.error("처방 이력 조회 실패 : ", err));
    }, [selectedRecordNumber]);

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        return dateStr.replaceAll("-", ".");
    };

    const handleRenameDiagnosis = (medicalRecordNumber: string, diagnosisName: string) => {
        axios.put(`/api/doctor/diagnosis-name`, { medicalRecordNumber, diagnosisName })
            .then(() => {
                setRecordOptions((prev) =>
                    prev.map((o) => o.medicalRecordNumber === medicalRecordNumber ? { ...o, diagnosisName } : o)
                );
            })
            .catch((err) => console.error("진단명 수정 실패 : ", err))
    };

    // OCS처방이력에서 "수정" 눌렀을 때 실행됨
    const handleUpdatePrescription = async (
        item: PrescriptionHistoryVO,
        updated: { qty: string; frequency: string; days: string }
    ): Promise<boolean> => {
        try {
            if (item.prescriptionType === "의약품") {
                await axios.put(`/api/doctor/prescription/${item.medicalNumber}/${item.medicineCode}`, {
                    qty: updated.qty,
                    frequency: updated.frequency,
                    days: updated.days,
                });
            } else if (item.prescriptionType === "주사") {
                await axios.put(`/api/doctor/injection/${item.medicalNumber}/${item.medicineCode}`, {
                    qty: updated.qty,
                    frequency: updated.frequency,
                });
            }

            if (selectedRecordNumber) {
                const res = await axios.get<PrescriptionHistoryVO[]>(`/api/doctor/prescription-history`, {
                    params: { medicalRecordNumber: selectedRecordNumber },
                });
                setPrescriptionHistory(res.data);
            }
            return true;
        } catch (err) {
            console.error("처방 수정 실패 : ", err);
            return false;
        }
    };

    // OCS처방이력에서 "삭제" 눌렀을 때 실행됨
    const handleDeletePrescription = async (item: PrescriptionHistoryVO): Promise<boolean> => {
        try {
            if (item.prescriptionType === "의약품") {
                await axios.delete(`/api/doctor/prescription/${item.medicalNumber}/${item.medicineCode}`);
            } else if (item.prescriptionType === "주사") {
                await axios.delete(`/api/doctor/injection/${item.medicalNumber}/${item.medicineCode}`);
            } else if (item.prescriptionType === "물리치료") {
                await axios.delete(`/api/doctor/physical-therapy-order/${item.treatmentNumber}`);
            }

            if (selectedRecordNumber) {
                const res = await axios.get<PrescriptionHistoryVO[]>(`/api/doctor/prescription-history`, {
                    params: { medicalRecordNumber: selectedRecordNumber },
                });
                setPrescriptionHistory(res.data);
            }
            return true;
        } catch (err) {
            console.error("처방 삭제 실패 : ", err);
            return false;
        }
    };

    return (
        <div className={styles.historyContainer}>
            <div className={styles.mainRow}>
                <div className={styles.listPanel}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="환자명 또는 생년월일을 검색하세요."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <MedicalHistoryList
                        list={patientList}
                        selected={selected}
                        onSelectRow={handleSelectRow}
                    />
                </div>

                <div className={styles.detailPanel}>
                    {!selected ? (
                        <div className={styles.emptyDetail}>좌측 목록에서 환자를 선택해 주세요.</div>
                    ) : (
                        <>
                            <MedicalRecordTab
                                recordOptions={recordOptions}
                                selectedRecordNumber={selectedRecordNumber}
                                onChangeRecordNumber={setSelectedRecordNumber}
                                recordDetail={recordDetail}
                                prescriptionHistory={prescriptionHistory}
                                recordSubTab={recordSubTab}
                                onChangeSubTab={setRecordSubTab}
                                formatDate={formatDate}
                                editable
                                onUpdateRecord={handleUpdateRecord}
                                onRenameDiagnosis={handleRenameDiagnosis}
                                onUpdatePrescription={handleUpdatePrescription}
                                onDeletePrescription={handleDeletePrescription}
                            />
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}