import { useEffect, useState } from "react";
import styles from "./InjectionOrder.module.css";
import { InjectionOrderListTable } from "./components/InjectionOrderListTable";
import type { InjectionVO } from "../types";
import { InjectionOrderDetailPanel } from "./components/InjectionOrderDetailPanel";
import { INJECTION_ORDER_ROUTE } from "./constants";
import axios from "axios";

export function InjectionOrder() {
    const [activeInjection, setActiveInjection] = useState("all");
    const [injectionOrderList, setInjectionOrderList] = useState<InjectionVO[]>([]);
    const [searchText, setSearchText] = useState("");
    const [injectionDetailList, setInjectionDetailList] = useState<InjectionVO[]>([]);
    const [selectedMedicalNumber, setSelectedMedicalNumber] = useState<string | null>(null);

    const handleSelectRow = (medicalNumber: string) => {
        setSelectedMedicalNumber(medicalNumber);
        fetchInjectionDetailList(medicalNumber);

    };

    const fetchInjectionList = () => {
        axios.get(`/api/injection-orders`)
            .then((res) => setInjectionOrderList(res.data))
            .catch((err) => console.error("주사구분 목록 조회 실패 : ", err));
    };

    useEffect(() => {
        fetchInjectionList();
    }, [activeInjection]);

    const fetchInjectionDetailList = (medicalNumber: string) => {
        axios.get<InjectionVO[]>(`/api/injection-orders/${medicalNumber}`)
            .then((res) => setInjectionDetailList(res.data))
            .catch((err) => console.error("주사오더 상세정보 조회 실패 : ", err));
    };

    const filteredList = injectionOrderList.filter((item) => {
        const keyword = searchText.trim();
        if (!keyword) return true;
        return (
            item.memberName.includes(keyword) ||
            item.birthDate.includes(keyword)
        );
    })

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        const pad = (n: number) => String(n).padStart(2, "0");
        return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }

    const handleComplete = async (medicalNumber: string) => {
        try {
            await axios.patch(`/api/injection-orders/${medicalNumber}/complete`);

            // 리스트에서 해당 환자 제거
            setInjectionOrderList((prev) => prev.filter((item) => item.medicalNumber !== medicalNumber));

            // 상세 패널 비우기
            setInjectionDetailList([]);
        } catch (err) {
            console.error("주사 처치 완료 요청 실패 : ", err);
        }
    }


    return (
        <div className={styles.injectionOrderContainer}>
            <div className={styles.mainContentRow}>
                <InjectionOrderListTable
                    injectionTabs={INJECTION_ORDER_ROUTE}
                    activeInjection={activeInjection}
                    onChangeInjection={setActiveInjection}
                    searchText={searchText}
                    onChangeSearchText={setSearchText}
                    filteredList={filteredList}
                    selectedMedicalNumber={selectedMedicalNumber}
                    onSelectRow={handleSelectRow}
                    formatDate={formatDate}
                />
            </div>
            <div className={styles.rightColumn}>
                <InjectionOrderDetailPanel
                    detailList={injectionDetailList}
                    formatDate={formatDate}
                    onComplete={handleComplete}
                />
            </div>
        </div>
    )
}