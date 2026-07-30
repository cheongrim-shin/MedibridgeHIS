import { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/Button";
import { getUnitLabel } from "../constants";
import styles from "./InjectionOrderDetailPanel.module.css";
import type { InjectionVO, OtherPrescriptionVO, PhysicalTherapyOrderVO } from "../../types";
import axios from "axios";

interface InjectionOrderDetailPanelProps {
    detailList: InjectionVO[];
    formatDate: (dateStr: string) => string;
    dateLabel?: string;
    dateValue?: (item: InjectionVO) => string;
    hideCompleteButton?: boolean;
    onComplete?: (medicalNumber: string) => void;
}

export function InjectionOrderDetailPanel({ detailList, formatDate, dateLabel = "오더일시", dateValue = (item) => item.prescriptionDate, hideCompleteButton = false, onComplete }: InjectionOrderDetailPanelProps) {

    const medicalNumber = detailList[0]?.medicalNumber;

    const [lastMedicalNumber, setLastMedicalNumber] = useState(medicalNumber);
    const [otherPrescriptions, setOtherPrescriptions] = useState<OtherPrescriptionVO[]>([]);
    const [physicalTherapyList, setPhysicalTherapyList] = useState<PhysicalTherapyOrderVO[]>([]);
    const [showOtherPrescriptions, setShowOtherPrescriptions] = useState(false);
    const [showPhysicalTherapy, setShowPhysicalTherapy] = useState(false);


    if (medicalNumber !== lastMedicalNumber) {
        setLastMedicalNumber(medicalNumber);
        setOtherPrescriptions([]);
        setPhysicalTherapyList([]);

        // 환자 바뀌면 접힌 상태로 초기화
        setShowOtherPrescriptions(false);
        setShowPhysicalTherapy(false);
    }
    useEffect(() => {
        if (!medicalNumber) return;

        axios.get<OtherPrescriptionVO[]>(`/api/injection-orders/${medicalNumber}/other-prescriptions`)
            .then((res) => setOtherPrescriptions(res.data))
            .catch((err) => console.error("다른 처방 목록 조회 실패 : ", err));

        axios.get<PhysicalTherapyOrderVO[]>(`/api/injection-orders/${medicalNumber}/physical-therapy`)
            .then((res) => setPhysicalTherapyList(res.data))
            .catch((err) => console.error("물리치료 오더 목록 조회 실패 : ", err));

    }, [medicalNumber]);

    if (detailList.length === 0) {
        return (
            <div className={styles.emptyDetailCard}>
                <svg className={styles.emptyIconDetail} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <p className={styles.emptyDetailText}>좌측 목록에서 주사 오더를 선택하여 결과를 상세 조회하고 처치를 관리할 수 있습니다.</p>
            </div>
        );

    }

    const patient = detailList[0];
    return (
        <div className={styles.detailPanelContainer}>
            <h3 className={styles.detailTitle}>주사 오더 상세 정보</h3>

            <div className={styles.patientInfo}>
                <div className={styles.patientInfoRow}>
                    <div className={styles.infoCol}>
                        <span className={styles.label}>환자명</span>
                        <div className={styles.value}>{patient.memberName}</div>
                    </div>
                    <div className={styles.infoCol}>
                        <span className={styles.label}>나이/성별</span>
                        <div className={styles.value}>{patient.age}세/{patient.gender}</div>
                    </div>
                </div>

                <div className={styles.patientInfoRow}>
                    <div className={styles.infoCol}>
                        <span className={styles.label}>{dateLabel}</span>
                        <div className={styles.value}>{formatDate(dateValue(patient))}</div>
                    </div>
                </div>

                {/* ★새로 추가: 오더내린의사 / 상병명 행 */}
                <div className={styles.patientInfoRow}>
                    <div className={styles.infoCol}>
                        <span className={styles.label}>오더내린의사</span>
                        <div className={styles.value}>{patient.doctorName || "-"}</div>
                    </div>
                    <div className={styles.infoCol}>
                        <span className={styles.label}>상병명</span>
                        <div className={styles.value}>{patient.diagnosisName || "-"}</div>
                    </div>
                </div>
            </div>

            <hr className={styles.divider}></hr>
            <div className={styles.resultSection}>
                <table className={styles.injectionTable}>
                    <thead>
                        <tr>
                            <th>약품명</th>
                            <th>처방용량</th>
                            <th>단위</th>
                            <th>처방횟수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detailList.map((item, index) => (
                            <tr key={index}>
                                <td className={styles.truncateCell} title={item.medicineName}>{item.medicineName}</td>
                                <td>{item.dosage}</td>
                                <td>{getUnitLabel(item.unit)}</td>
                                <td>{item.frequency}회</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <hr className={styles.divider}></hr>

            {/* 처방된 약 */}
            <div className={styles.otherOrderSection}>
                <button
                    type="button"
                    className={styles.sectionToggle}
                    onClick={() => setShowOtherPrescriptions((v) => !v)}
                >
                    <span>처방된 약 (경구/외용) {otherPrescriptions.length > 0 && `(${otherPrescriptions.length})`}</span>
                    <span>{showOtherPrescriptions ? "▲" : "▼"}</span>
                </button>
                {showOtherPrescriptions && (
                    otherPrescriptions.length === 0 ? (
                        <p className={styles.otherOrderEmpty}>처방된 약이 없습니다</p>
                    ) : (
                        <table className={styles.medicineTable}>
                            <thead>
                                <tr>
                                    <th>약품명</th>
                                    <th>1회투약량</th>
                                    <th>1일횟수</th>
                                    <th>일수</th>
                                    <th>상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {otherPrescriptions.map((item, index) => (
                                    <tr key={index}>
                                        <td className={styles.truncateCell} title={item.medicineName}>{item.medicineName}</td>
                                        <td>{item.totalQty}(mg/정)</td>
                                        <td>{item.frequency}회</td>
                                        <td>{item.numberOfDaysAdministered}일</td>
                                        <td>{item.prescriptionStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                )}
            </div>

            {/* 물리치료 오더 */}
            <div className={styles.otherOrderSection}>
                <button
                    type="button"
                    className={styles.sectionToggle}
                    onClick={() => setShowPhysicalTherapy((v) => !v)}
                >
                    <span>물리치료 오더 {physicalTherapyList.length > 0 && `(${physicalTherapyList.length})`}</span>
                    <span>{showPhysicalTherapy ? "▲" : "▼"}</span>
                </button>
                {showPhysicalTherapy && (
                    physicalTherapyList.length === 0 ? (
                        <p className={styles.otherOrderEmpty}>물리치료 오더가 없습니다.</p>
                    ) : (
                        <table className={styles.medicineTable}>
                            <thead>
                                <tr>
                                    <th>치료항목</th>
                                    <th>구분</th>
                                    <th>상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {physicalTherapyList.map((item, index) => (
                                    <tr key={index}>
                                        <td className={styles.truncateCell} title={item.treatmentItemName}>{item.treatmentItemName}</td>
                                        <td>{item.therapyType}</td>
                                        <td>{item.treatmentStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                )}

            </div>
            <hr className={styles.divider}></hr>

            {!hideCompleteButton && (
                <Button
                    color="red"
                    variant="solid"
                    size="md"
                    onClick={() => onComplete?.(medicalNumber!)}
                    leftIcon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    }
                >
                    주사 처치 완료
                </Button>
            )}
        </div>
    )
}