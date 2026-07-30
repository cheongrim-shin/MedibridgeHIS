import { useEffect, useState } from "react";
import styles from "./NewMedicalRecordsModal.module.css";
import axios from "axios";

interface DiagnosisCodeVO {
    sickCd: string;
    sickNm: string;
    sickEngNm: string;
}

interface NewMedicalRecordsModalProps {
    onClose: () => void;
    onCreate: (diagnosisName: string) => void;
}

export function NewMedicalRecordsModal({ onClose, onCreate }: NewMedicalRecordsModalProps) {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState<DiagnosisCodeVO[]>([]);
    const [selected, setSelected] = useState<DiagnosisCodeVO | null>(null);

    useEffect(() => {
        if (!keyword.trim() || selected) {
            setResults([]);
            return;
        }

        const timer = setTimeout(() => {
            axios.get<DiagnosisCodeVO[]>(`/api/doctor/diagnosis-search`, {
                params: { keyword: keyword.trim() },
            })
                .then((res) => setResults(res.data))
                .catch((err) => console.error("상병코드 검색 실패 : ", err))
        }, 400);

        return () => clearTimeout(timer);
    }, [keyword, selected]);

    const today = new Date();
    const todayText = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    const handleSelect = (item: DiagnosisCodeVO) => {
        setSelected(item);
        setKeyword(item.sickNm);
        setResults([]);
    };

    const handleKeywordChange = (value: string) => {
        setKeyword(value);
        setSelected(null);
    };

    const handleCreate = () => {
        if (!keyword.trim()) return;
        onCreate(keyword.trim());
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>신규 진료기록</h3>
                    <button className={styles.closeButton} onClick={onClose}>x</button>
                </div>

                <div className={styles.group}>
                    <label className={styles.fieldLabel}>시작일</label>
                    <input className={styles.dateInput} value={todayText} readOnly />

                    <label className={styles.fieldLabel}>
                        상병명 (진단명) <span className={styles.required}>*</span>
                    </label>
                    <div className={styles.searchWrapper}>
                        <input
                            className={styles.searchInput}
                            placeholder="상병명 또는 코드를 검색하세요."
                            value={keyword}
                            onChange={(e) => handleKeywordChange(e.target.value)}
                            autoFocus
                        />

                        {results.length > 0 && !selected && (
                            <div className={styles.resultList}>
                                {results.map((item, index) => (
                                    <div
                                        key={`${item.sickCd}-${index}`}
                                        className={styles.resultItem}
                                        onClick={() => handleSelect(item)}
                                    >
                                        <span>{item.sickNm}</span>
                                        <span className={styles.codeBadge}>{item.sickCd}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <label className={styles.fieldLabel}>상병코드</label>
                    <input
                        className={styles.codeInput}
                        value={selected?.sickCd ?? ""}
                        readOnly
                        placeholder="상병을 검색하면 자동으로 입력됩니다."
                    />
                    {/* 버튼 바로 위, 공공데이터 API 안내 문구 */}
                    <p className={styles.apiNotice}>
                        ⓘ 공공데이터포털(건강보험심사평가원) </p>
                        <p className={styles.apiNotice}>질병정보 API를 통해 실시간으로 조회됩니다.</p>
                    <button
                        className={styles.createButton}
                        onClick={handleCreate}
                        disabled={!keyword.trim()}
                    >
                        진료기록 개설
                    </button>
                </div>
            </div>
        </div>
    )
}