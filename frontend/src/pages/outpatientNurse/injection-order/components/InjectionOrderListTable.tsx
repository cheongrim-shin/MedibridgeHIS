import type { InjectionTab, InjectionVO } from "../../types";
import styles from "./InjectionOrderListTable.module.css";

interface InjectionOrderListTableProps {
    injectionTabs: InjectionTab[];
    activeInjection: string;
    onChangeInjection: (injectionId: string) => void;
    searchText: string;
    onChangeSearchText: (text: string) => void;
    filteredList: InjectionVO[];
    selectedMedicalNumber: string | null;   // 추가
    onSelectRow: (medicalNumer: string) => void;
    formatDate:(dateStr:string) => string;
}

export function InjectionOrderListTable({
    injectionTabs,
    activeInjection,
    onChangeInjection,
    searchText,
    onChangeSearchText,
    filteredList,
    selectedMedicalNumber,
    onSelectRow,
    formatDate
} : InjectionOrderListTableProps) {
    return (
        <div className={styles.injectionTableContainer}>
            <input type="text"
            className={styles.injectionSearchInput}
            placeholder="환자명 또는 생년월일을 검색해주세요"
            value={searchText}
            onChange={(e) => onChangeSearchText(e.target.value)}
            />

        <div className={styles.tabRow}>
            {injectionTabs.map((injection) => (
                <button
                    key={injection.id}
                    className={`${styles.tabButton} ${
                        activeInjection === injection.id ? styles.tabButtonActive : ""
                    }`}
                    onClick={()=> onChangeInjection(injection.id)}
                >
                    {injection.label}
                </button>
            ))}
        </div>

        <div className={styles.injectionListContainer}>
            <table className={styles.injectionTable}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>환자명</th>
                        <th>생년월일</th>
                        <th>나이/성별</th>
                        <th>오더일시</th>
                        <th>처방 오더명</th>
                    </tr>
                </thead>
            <tbody>
                {filteredList.length === 0 ? (
                    <tr>
                        <td colSpan={6} className={styles.emptyRow}>
                            주사 대기 중인 환자가 없습니다.
                        </td>
                    </tr>
                ) : (
                    filteredList.map((item, index) => (
                        <tr key={item.medicalNumber}
                            className={`${styles.injectionTableRow} ${
                                selectedMedicalNumber === item.medicalNumber ? styles.injectionTableRowActive : ""
                             }`}
                            onClick={()=> onSelectRow(item.medicalNumber)}
                        >
                            <td className={styles.patientbirthCell}>{index +1}</td>
                            <td className={styles.memberNameCell}>
                                {item.memberName}
                            </td>
                            <td className={styles.patientbirthCell}>{item.birthDate}</td>
                            <td className={styles.patientbirthCell}>{item.age}세/{item.gender}</td>
                            <td className={styles.patientbirthCell}>{formatDate(item.prescriptionDate)}</td>
                            <td className={styles.injectionOrderName}>
                                {item.medicineName}
                                {item.medCnt > 1 ? `외 ${item.medCnt -1}개` : ""}
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
                </table>
        </div>
        </div>

    )
}