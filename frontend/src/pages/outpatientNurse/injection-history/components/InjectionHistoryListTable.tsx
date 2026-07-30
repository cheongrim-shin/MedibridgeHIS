import type { InjectionHistoryTab, InjectionHistoryVO } from "../../types";
import styles from "./InjectionHistoryListTable.module.css";

interface InjectionHistoryListTableProps {
    routeTabs: InjectionHistoryTab[];
    activeRoute: string;
    onChangeRoute: (routeId:string) => void;
    periodOptions: InjectionHistoryTab[];
    period: string;
    onChangePeriod: (period:string) => void;
    startDate: string;
    endDate: string;
    onChangeStartDate: (v: string) => void;
    onChangeEndDate: (v: string) => void;
    keyword: string;
    onChangeKeyword: (v: string) => void;
    onResetFilter: () => void;
    list: InjectionHistoryVO[];
    selectedMedicalNumber: string | null;   // 추가
    onSelectRow: (medicalNumber: string) => void;
    formatDate: (dateStr: string) => string;
}

export function InjectionHistoryListTable({
    routeTabs,
    activeRoute,
    onChangeRoute,
    periodOptions,
    period,
    onChangePeriod,
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    keyword,
    onChangeKeyword,
    onResetFilter,
    list,
    selectedMedicalNumber,
    onSelectRow,
    formatDate,
} : InjectionHistoryListTableProps) {
    return (
        <div className={styles.injectionTableContainer}>
            <div className={styles.filterRow}>
                <input
                    type="date"
                    className={styles.filterInput}
                    value={startDate}
                    onChange={(e) => onChangeStartDate(e.target.value)}
            />
            <span>~</span>
            <input
                type="date"
                className={styles.filterInput}
                value={endDate}
                onChange={(e) => onChangeEndDate(e.target.value)}
                />
                <select
                    className={styles.filterSelect}
                    value={period}
                    onChange={(e) => onChangePeriod(e.target.value)}
                    >
                        {periodOptions.map((p) => (
                            <option key={p.id} value={p.id}>{p.label}</option>
                        ))}
                        
                    </select>

                        <button className={styles.resetButton} onClick={onResetFilter}>
                            필터 초기화
                        </button>
                        
                    <input
                        type="text"
                        className={styles.injectionSearchInput}
                        placeholder="환자명 또는 생년월일을 검색해주세요"
                        value={keyword}
                        onChange={(e)=> onChangeKeyword(e.target.value)}
                        />
            </div>

            <div className={styles.tabRow}>
                {routeTabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${styles.tabButton} ${
                            activeRoute === tab.id ? styles.tabButtonActive : ""
                        }`}
                        onClick={() => onChangeRoute(tab.id)}
                        >
                            {tab.label}
                        </button>
                ))}

            </div>

            <div className={styles.injectionListContainer}>
                <table className={styles.injectionTable}>
                    <thead>
                        <tr>
                            <th>주사 일시</th>
                            <th>환자명</th>
                            <th>나이/성별</th>
                            <th>처방 오더명</th>
                        </tr>
                    </thead>
                <tbody>
                    {list.length === 0 ? (
                        <tr>
                            <td colSpan={4} className={styles.emptyRow}>
                                주사 이력이 없습니다.
                            </td>
                        </tr>
                    ) : (
                        list.map((item) => (
                            <tr
                                key={item.medicalNumber}
                                className={`${styles.injectionTableRow} ${
                                    selectedMedicalNumber === item.medicalNumber ? styles.injectionTableRowActive : ""
                                 }`}
                                onClick={() => onSelectRow(item.medicalNumber)}
                            >
                                <td className={styles.patientbirthCell}>{formatDate(item.injectionDate)}</td>
                                <td className={styles.memberNameCell}>{item.memberName}</td>
                                <td className={styles.patientbirthCell}>{item.age}세/{item.gender}</td>
                                <td className={styles.injectionOrderName}>
                                    {item.medicineName}
                                    {item.medCnt > 1 ? ` 외 ${item.medCnt -1}개` : ""}
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