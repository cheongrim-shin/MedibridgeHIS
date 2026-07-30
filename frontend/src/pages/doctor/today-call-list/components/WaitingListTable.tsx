import type { WaitingListVO } from "../../types";
import styles from "./WaitingListTable.module.css";

interface WaitingListTableProps {
    list: WaitingListVO[];
    filteredList: WaitingListVO[];
    selected: WaitingListVO | null;
    onSelectRow: (item: WaitingListVO) => void;
    formatDate: (dateStr: string) => string;
}

export function WaitingListTable({ list, filteredList, selected, onSelectRow, formatDate }: WaitingListTableProps) {
    return (
        <div className={styles.tableSection}>
            <table className={styles.callTable}>
                <thead>
                    <tr>
                        <th>접수시간</th>
                        <th>환자명</th>
                        <th>나이/성별</th>
                        <th>진료이력</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.length === 0 ? (
                        <tr>
                            <td colSpan={4} className={styles.emptyRow}>
                                {list.length === 0 ? "오늘 진료 대기중인 환자가 없습니다." : "검색 결과가 없습니다."}
                            </td>
                        </tr>
                    ) : (
                        filteredList.map((item) => (
                            <tr
                                key={item.medicalNumber}
                                className={`${styles.callTableRow} ${
                                    selected?.medicalNumber === item.medicalNumber ? styles.callTableRowActive : ""
                                }`}
                                onClick={() => onSelectRow(item)}
                            >
                                <td>{formatDate(item.receiptDate)}</td>
                                <td className={styles.memberNameCell}>
                                    {item.memberName}
                                    {item.receiptStatus === "진료중" && (
                                        <span className={styles.inProgressBadge}>진료중</span>
                                    )}
                                    </td>
                                <td>{item.age}세/{item.gender}</td>
                                <td className={styles.episodeCell}>
                                    {item.diagnosisName ? `[${item.diagnosisName}]` : "-"}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}