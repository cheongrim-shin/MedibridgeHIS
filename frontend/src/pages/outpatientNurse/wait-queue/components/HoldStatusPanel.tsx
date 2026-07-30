import type { HoldListVO } from "../../types";
import styles from "./HoldStatusPanel.module.css";

interface HoldStatusPanelProps {
    holdList: HoldListVO[];
    spaceLabelMap: Record<string, string>;// SPACE_NUMBER("1") → "진료실1" 같은 라벨 변환용
    onReturnConfirm: (medicalNumber: string, spaceNumber: string) => void;
}

export function HoldStatusPanel({holdList, spaceLabelMap, onReturnConfirm} : HoldStatusPanelProps) {
    return (
        <div className={styles.holdStatusContainer}>
            <h3 className={styles.sectionTitle}>대기 보류 현황</h3>
            <div className={styles.holdContainer}>
            <table className={styles.holdTable}>
                <thead>
                    <tr>
                        <th >이름(나이/성별)</th>
                        <th>진료실 구분</th>
                        <th>보류 사유</th>
                        <th>제어</th>
                    </tr>
                </thead>
                <tbody>
                    {holdList.length === 0 ? (
                    <tr>
                        <td colSpan={4} className={styles.emptyRow}>
                            보류 중인 환자가 없습니다.
                        </td>
                    </tr>
                    ) : (
                        holdList.map((item) => (
                            <tr key={item.medicalNumber}>
                                <td>
                                     <p className={styles.holdStatePatientName}>
                                        {item.memberName}
                                        <span className={styles.holdStatePatientInfo}>
                                            ({item.age}세/{item.gender})
                                        </span>

                                         <button
                                            type="button"
                                            className={styles.detailBtn}
                                            onClick={() => console.log("환자 상세정보 클릭:", item.memberName)}
                                            title="환자 상세정보"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="3" />
                                                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                                            </svg>
                                        </button>
                                    </p>
                                </td>
                                <td className={styles.holdSpaceCell} >{spaceLabelMap[item.spaceNumber] ?? item.spaceNumber}</td>
                                <td className={styles.holdReasonCell} title={item.holdReason}>{item.holdReason}</td>

                                <td>
                                    <button 
                                        className={styles.returnBtn}
                                        onClick={() => onReturnConfirm(item.medicalNumber, item.spaceNumber)}
                                    >
                                        대기 복귀
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
        </div>
    );
}