import { useState } from "react";
import { DOCUMENT_TYPES } from "../constants";
import styles from "./DocumentIssueTab.module.css";
import { CustomSelect } from "./CustomSelect";
import axios from "axios";

const DOCUMENT_USE_OPTIONS = [
    { value: "보험제출용", label: "보험제출용" },
    { value: "직장제출용", label: "직장제출용" },
    { value: "본인제출용", label: "본인제출용" },
    { value: "기타", label: "기타" },
];

const OPINION_LETTER_ID = "OPINION";

interface DocumentIssueTabProps {
    patient: {
        memberName: string;
        age: number;
        gender: string;
    };

    checkedDocs: string[];
    onToggleDoc: (id: string) => void;
    showPatientInfo?: boolean;
    className?: string;
    medicalNumber: string; // 접수번호 - 제출용으로 필요
}

export function DocumentIssueTab({ patient, checkedDocs, onToggleDoc, showPatientInfo = true, className, medicalNumber }: DocumentIssueTabProps) {

    const [receiveUse, setReceiveUse] = useState("보험제출용");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // 소견서 내용을 담을 상태 (의사가 직접 입력하는 텍스트)
    const [opinionContent, setOpinionContent] = useState("");

    const totalPrice = DOCUMENT_TYPES
        .filter((doc) => checkedDocs.includes(doc.id))
        .reduce((sum, doc) => sum + doc.price, 0);

    // 소견서가 체크되어 있는지 여부 (텍스트박스를 보여줄지 말지 판단용)
    const isOpinionChecked = checkedDocs.includes(OPINION_LETTER_ID);

    const handleSubmit = () => {

        // 소견서를 체크했는데 내용을 안 썼으면 전송 막기
        if (isOpinionChecked && opinionContent.trim() === "") {
            alert("소견서 내용을 입력해주세요.");
            return;
        }

        setSubmitting(true);

        // 체크된 서류들만 골라내기 (예: 진단서, 소견서 등 여러 개일 수 있음)
        const selectedDocs = DOCUMENT_TYPES.filter((doc) => checkedDocs.includes(doc.id));
        
        // .map으로 "서류 하나당 API 요청 하나씩" 만들어냄
        // 이 시점에는 아직 요청을 "보내기만" 한 상태고, 결과가 오길 기다리는 Promise 객체들의 배열이 만들어짐
        const requests = selectedDocs.map((doc) => {
            // 소견서인 경우에만 실제 입력한 내용을 담고,
            // 진단서처럼 내용이 필요 없는 서류는 null로 보냄 (DB 컬럼도 Nullable로 되어있으니 문제없음)
            const documentContents = doc.id === OPINION_LETTER_ID ? opinionContent : null;

            return axios.post(`/api/doctor/document-request`, {
                medicalNumber,
                receiveUse,
                documentType: doc.label,   // 👈 새로 추가: "이 요청이 어떤 서류인지" 이름표를 붙여서 보냄
                documentContents,          // 👈 이제 서류 종류별로 내용이 따로 들어감
            });
        });

        // Promise.all: 여러 개의 요청을 동시에 다 보내고, "전부 다 끝날 때까지" 기다렸다가 다음 동작을 함
        // 편지 3통을 각각 접수시키고, 3통 다 접수 완료됐다는 확인을 받은 후에 "접수 완료" 화면을 보여주는 것과 같음
        Promise.all(requests)
            .then(() => setSubmitted(true))
            .catch((err) => console.error("서류 발급 신청 실패 : ", err))
            .finally(() => setSubmitting(false));
    };

    return (
        <div className={`${styles.documentTabContent} ${className ?? ""}`}>
            {showPatientInfo && (
                <p className={styles.patientLine}>{patient.memberName} ({patient.age}세/{patient.gender})</p>
            )}

            <CustomSelect
                options={DOCUMENT_USE_OPTIONS}
                value={receiveUse}
                onChange={setReceiveUse}
                placeholder="용도선택"
            />
            <div className={styles.documentList}>
                {DOCUMENT_TYPES.map((doc) => (
                    // 체크박스 줄 + (필요하면) 텍스트박스, 이 둘을 하나로 묶는 바깥 상자
                    // key는 반드시 이 바깥 상자(.map()이 실제로 반환하는 최상위 요소)에 있어야 함
                    <div key={doc.id}>
                        <label className={styles.documentItem}>
                            <input
                                type="checkbox"
                                checked={checkedDocs.includes(doc.id)}
                                onChange={() => onToggleDoc(doc.id)}
                            />
                            <span>{doc.label}</span>
                            <span className={styles.documentPrice}>{doc.price.toLocaleString()}원</span>
                        </label>

                        {/* 이 항목이 소견서이고, 동시에 체크되어 있을 때만 텍스트박스를 보여줌 */}
                        {doc.id === OPINION_LETTER_ID && isOpinionChecked && (
                            <textarea
                                className={styles.opinionTextarea}
                                placeholder="소견서 내용을 입력하세요."
                                value={opinionContent}
                                onChange={(e) => setOpinionContent(e.target.value)}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.documentSummary}>
                <div className={styles.summaryRow}>
                    <span>선택된 서류</span>
                    <span>{checkedDocs.length}건</span>
                </div>
                <div className={styles.summaryRow}>
                    <strong>예상 총 비용</strong>
                    <strong>{totalPrice.toLocaleString()}원</strong>
                </div>
            </div>

            <button
                className={styles.submitDocButton}
                disabled={checkedDocs.length === 0 || submitting}
                onClick={handleSubmit}
            >
                {submitting ? "전송중..." : submitted ? "재신청" : "서류 발급 신청 전송"}
            </button>
        </div>
    );
}