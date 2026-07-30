import type { MedicalHistoryListVO } from "../../types";
import styles from "./MedicalHistoryList.module.css";

export interface MedicalHistoryListProps {
    list: MedicalHistoryListVO[];
    selected: MedicalHistoryListVO | null;
    onSelectRow: (item: MedicalHistoryListVO) => void;
}

export function MedicalHistoryList({ list, selected, onSelectRow }: MedicalHistoryListProps) {

    return (
        <div className={styles.tableSection}>
            <table className={styles.historyTable}>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>생년월일</th>
                        <th>나이/성별</th>
                    </tr>
                </thead>
                <tbody>
                    {list.length === 0 ? (
                        <tr>
                            <td colSpan={3} className={styles.emptyRow}>검색 결과가 없습니다.</td>
                        </tr>
                    ) : (
                        list.map((item) => (
                            <tr
                                key={`${item.memberName}_${item.birthDate}`}
                                className={`${styles.historyRow} ${
                                    selected?.memberName === item.memberName && selected?.birthDate === item.birthDate
                                    ? styles.historyRowActive
                                    : ""
                                }`}
                                onClick={() => onSelectRow(item)}
                            >
                                <td className={styles.nameCell}>{item.memberName}</td>
                                <td>{item.birthDate}</td>
                                <td>{item.age}세/{item.gender}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}