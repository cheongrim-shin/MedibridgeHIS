import { useEffect, useState } from "react";
import { InjectionOrderDetailPanel } from "../injection-order/components/InjectionOrderDetailPanel";
import styles from "./InjectionHistory.module.css";
import type { InjectionHistoryVO, InjectionVO } from "../types";
import { INJECTION_HISTORY_PERIOD, INJECTION_HISTORY_ROUTE } from "./constants";
import { InjectionHistoryListTable } from "./components/InjectionHistoryListTable";
import axios from "axios";

export function InjectionHistory() {

    // 선택한 환자 색상 고정
    const [selectedMedicalNumber, setSelectedMedicalNumber] = useState<string | null>(null)

    // 필터 상태
    const [activeRoute, setActiveRoute] = useState("all");
    const [period, setPeriod] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [keyword, setKeyword] = useState("");

    // 목록/상세 데이터
    const [historyList, setHistoryList] = useState<InjectionHistoryVO[]>([]);
    const [detailList, setDetailList] = useState<InjectionVO[]>([]);


    const fetchHistoryList = () => {
        axios.get<InjectionHistoryVO[]>(`/api/injection-history`, {
            params: {
                route: activeRoute || undefined,
                period: period || undefined,
                startDate: startDate || undefined,
                endDate: endDate || undefined,
                keyword: keyword || undefined,
            },
        })
            .then((res) => setHistoryList(res.data))
            .catch((err) => console.error("주사 이력 목록 조회 실패 : ", err));
    };

    // 필터 값이 바뀔때마다 목록 다시 조회
    useEffect(() => {
        fetchHistoryList();
    }, [activeRoute, period, startDate, endDate, keyword]);

    const fetchDetailList = (medicalNumber: string) => {
        axios.get<InjectionVO[]>(`/api/injection-history/${medicalNumber}`)
            .then((res) => setDetailList(res.data))
            .catch((err) => console.error("주사 이력 상세 조회 실패 : ", err));
    };

    const handleResetFilter = () => {
        setActiveRoute("");
        setPeriod("");
        setStartDate("");
        setEndDate("");
        setKeyword("");
    };

    const handleSelectRow = (medicalNumber: string) => {
        setSelectedMedicalNumber(medicalNumber);
        fetchDetailList(medicalNumber);
    }

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const d = new Date(dateStr.replace(" ", "T"));
        const pad = (n: number) => String(n).padStart(2, "0");
        return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };


    return (
        <div className={styles.injectionHistoryContainer}>
            <div className={styles.mainContentRow}>
                <InjectionHistoryListTable
                    routeTabs={INJECTION_HISTORY_ROUTE}
                    activeRoute={activeRoute}
                    onChangeRoute={setActiveRoute}
                    periodOptions={INJECTION_HISTORY_PERIOD}
                    period={period}
                    onChangePeriod={setPeriod}
                    startDate={startDate}
                    endDate={endDate}
                    onChangeStartDate={setStartDate}
                    onChangeEndDate={setEndDate}
                    keyword={keyword}
                    onChangeKeyword={setKeyword}
                    onResetFilter={handleResetFilter}
                    list={historyList}
                    selectedMedicalNumber={selectedMedicalNumber}
                    onSelectRow={handleSelectRow}
                    formatDate={formatDate}
                />
            </div>

            <div className={styles.rightColumn}>
                <InjectionOrderDetailPanel
                    detailList={detailList}
                    formatDate={formatDate}
                    dateLabel="주사일시"
                    dateValue={(item) => item.injectionDate ?? ""}
                    hideCompleteButton
                />
            </div>
        </div>
    )
}