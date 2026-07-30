import { useEffect, useRef, useState } from "react";
import type { AddedInjectionOrder, AddedMedicineOrder, AddedTherapyOrder, MedicineSearchVO, PhysicalTherapyItemVO } from "../../types";
import styles from "./OcsOrderPanel.module.css";
import axios from "axios";

type OrderCategory = 'medicine' | 'injection' | 'therapy';

interface OcsOrderPanelProps {
    addedMedicines: AddedMedicineOrder[];
    addedInjections: AddedInjectionOrder[];
    addedTherapies: AddedTherapyOrder[];
    onAddMedicine: (item: MedicineSearchVO) => void;
    onAddInjection: (item: MedicineSearchVO) => void;
    onAddTherapy: (item: PhysicalTherapyItemVO) => void;
    onUpdateMedicine: (index: number, field: keyof AddedMedicineOrder, value: string) => void;
    onUpdateInjection: (index: number, field: keyof AddedInjectionOrder, value: string) => void;
    onRemoveMedicine: (index: number) => void;
    onRemoveInjection: (index: number) => void;
    onRemoveTherapy: (index: number) => void;
    onClearAll: () => void;
}

const CATEGORY_LABEL: Record<OrderCategory, string> = {
    medicine: "의약품",
    injection: "주사처방",
    therapy: "물리치료",
};

export function OcsOrderPanel({
    addedMedicines,
    addedInjections,
    addedTherapies,
    onAddMedicine,
    onAddInjection,
    onAddTherapy,
    onUpdateMedicine,
    onUpdateInjection,
    onRemoveMedicine,
    onRemoveInjection,
    onRemoveTherapy,
    onClearAll,
}: OcsOrderPanelProps) {
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);
    const [activeSearch, setActiveSearch] = useState<OrderCategory | null>(null);
    const [keyword, setKeyword] = useState("");
    const [medicineResults, setMedicineResults] = useState<MedicineSearchVO[]>([]);
    const [therapyResults, setTherapyResults] = useState<PhysicalTherapyItemVO[]>([]);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const addSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (addSectionRef.current && !addSectionRef.current.contains(e.target as Node)) {
                setShowCategoryMenu(false);
                setActiveSearch(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, []);

    const hasAnyOrder = addedMedicines.length > 0 || addedInjections.length > 0 || addedTherapies.length > 0;

    const openSearch = (category: OrderCategory) => {
        setActiveSearch(category);
        setShowCategoryMenu(false);
        setKeyword("");

        // 처음 열었을때 목록 보여주기
        if (category === "medicine" || category === "injection") {
            axios.get<MedicineSearchVO[]>(`/api/doctor/medicine-search`, {
                params: { keyword: "", category },
            })
                .then((res) => setMedicineResults(res.data))
                .catch((err) => console.error("의약품 검색 실패 : ", err));
        } else if (category === "therapy") {
            axios.get<PhysicalTherapyItemVO[]>(`/api/doctor/physical-therapy-search`, {
                params: { keyword: "" },
            })

                .then((res) => setTherapyResults(res.data))
                .catch((err) => console.error("물리치료 검색 실패 : ", err));
        }
    };

    const handleSearchChange = (value: string) => {
        setKeyword(value);
        if (!value.trim()) {
            setMedicineResults([]);
            setTherapyResults([]);
            return;
        }

        if (activeSearch === "medicine" || activeSearch === "injection") {
            axios.get<MedicineSearchVO[]>(`/api/doctor/medicine-search`, {
                params: { keyword: value, category: activeSearch },
            })
                .then((res) => setMedicineResults(res.data))
                .catch((err) => console.error("의약품 검색 실패 : ", err))
        } else if (activeSearch === "therapy") {
            axios.get<PhysicalTherapyItemVO[]>(`/api/doctor/physical-therapy-search`, {
                params: { keyword: value },
            })
                .then((res) => setTherapyResults(res.data))
                .catch((err) => console.error("물리치료 검색 실패 : ", err));
        }
    }

    const handleSelectMedicineResult = (item: MedicineSearchVO) => {
        if (activeSearch === "medicine") {
            onAddMedicine(item);
        } else if (activeSearch === "injection") {
            onAddInjection(item);
        }
        setActiveSearch(null);
    };

    const handleSelectTherapyResult = (item: PhysicalTherapyItemVO) => {
        onAddTherapy(item);
        setActiveSearch(null);
    }

    return (
        <div className={styles.ocsOrderPanel}>
            {/* 담긴 항목들 */}
            {addedMedicines.length > 0 && (
                <div className={styles.orderGroup}>
                    <p className={styles.orderGroupTitleMedicine}>의약품</p>
                    {addedMedicines.map((item, index) => (
                        <div key={index} className={styles.orderCard}>
                            <div className={styles.orderCardHeader}>
                                <span className={styles.orderCardName}>{item.medicineName}</span>
                                <button className={styles.removeButton} onClick={() => onRemoveMedicine(index)}>x</button>
                            </div>
                            <div className={styles.orderCardInputs}>
                                <input
                                    type="number"
                                    className={styles.orderInput}
                                    value={item.dosage}
                                    onChange={(e) => onUpdateMedicine(index, "dosage", e.target.value)}
                                />
                                <span>정 x</span>
                                <input
                                    type="number"
                                    className={styles.orderInput}
                                    value={item.frequency}
                                    onChange={(e) => onUpdateMedicine(index, "frequency", e.target.value)}
                                />
                                <span>회 x</span>
                                <input
                                    type="number"
                                    className={styles.orderInput}
                                    value={item.days}
                                    onChange={(e) => onUpdateMedicine(index, "days", e.target.value)}
                                />
                                <span>일</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {addedInjections.length > 0 && (
                <div className={styles.orderGroup}>
                    <p className={styles.orderGroupTitleInjection}>주사처방</p>
                    {addedInjections.map((item, index) => (
                        <div key={index} className={styles.orderCard}>
                            <div className={styles.orderCardHeader}>
                                <span className={styles.orderCardName}>{item.medicineName}</span>
                                <button className={styles.removeButton} onClick={() => onRemoveInjection(index)}>x</button>
                            </div>
                            <div className={styles.orderCardInputs}>
                                <input
                                    type="number"
                                    className={styles.orderInput}
                                    value={item.dosage}
                                    onChange={(e) => onUpdateInjection(index, "dosage", e.target.value)}
                                />
                                <span>{item.unitLabel}</span>  {/* ← 여기가 진짜 고쳐야 할 자리 */}
                                <input
                                    type="number"
                                    className={styles.orderInput}
                                    value={item.frequency}
                                    onChange={(e) => onUpdateInjection(index, "frequency", e.target.value)}
                                />
                                <span>회</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {addedTherapies.length > 0 && (
                <div className={styles.orderGroup}>
                    <p className={styles.orderGroupTitleTherapy}>물리치료</p>
                    {addedTherapies.map((item, index) => (
                        <div key={index} className={styles.orderCard}>
                            <div className={styles.orderCardHeader}>
                                <span className={styles.orderCardName}>{item.codeName1}</span>
                                <button className={styles.removeButton} onClick={() => onRemoveTherapy(index)}>x</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 처방오더 추가 버튼 + 카테고리 드롭다운 */}
            <div className={styles.addSection} ref={addSectionRef}>
                <button
                    type="button"
                    className={styles.addOrderButton}
                    onClick={() => setShowCategoryMenu((v) => !v)}
                >
                    + 처방/오더 추가
                </button>

                {showCategoryMenu && (
                    <div className={styles.categoryMenu}>
                        <button className={styles.categoryMenuItem} onClick={() => openSearch("medicine")}>
                            <span className={styles.categoryIcon}>💊</span>의약품
                        </button>
                        <button className={styles.categoryMenuItem} onClick={() => openSearch("injection")}>
                            <span className={styles.categoryIcon}>💉</span>주사처방
                        </button>
                        <button className={styles.categoryMenuItem} onClick={() => openSearch("therapy")}>
                            <span className={styles.categoryIcon}>🦵</span>물리치료
                        </button>
                    </div>
                )}

                {activeSearch && (
                    <div className={styles.searchPanel}>
                        <div className={styles.searchPanelHeader}>
                            <span>{CATEGORY_LABEL[activeSearch]} 처방추가</span>
                            <button className={styles.searchCloseButton} onClick={() => setActiveSearch(null)}>닫기</button>
                        </div>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="검색어를 입력하세요."
                            value={keyword}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            autoFocus
                        />
                        <div className={styles.searchResultList}>
                            {(activeSearch === "medicine" || activeSearch === "injection") &&
                                medicineResults.map((item) => (
                                    <div
                                        key={item.medicineCode}
                                        className={styles.searchResultItem}
                                        onClick={() => handleSelectMedicineResult(item)}
                                    >
                                        <p className={styles.searchResultName}>{item.medicineName}</p>
                                        <p className={styles.searchResultMeta}>
                                            {item.specification} | {item.unitLabel} | {item.unitCost.toLocaleString()}원
                                        </p>
                                    </div>
                                ))}

                            {activeSearch == "therapy" &&
                                therapyResults.map((item) => (
                                    <div
                                        key={item.commonCodeNumber}
                                        className={styles.searchResultItem}
                                        onClick={() => handleSelectTherapyResult(item)}
                                    >
                                        <p className={styles.searchResultName}>{item.codeName1}</p>
                                        <p className={styles.searchResultMeta}>
                                            {item.codeName2} | {item.unitPrice.toLocaleString()}원
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
            {hasAnyOrder && (
                <div className={styles.advancedSection}>
                    <button className={styles.advancedToggle} onClick={() => setShowAdvanced((v) => !v)}>
                        고급 옵션 {showAdvanced ? "▲" : "▼"}
                    </button>
                    {showAdvanced && (
                        <button className={styles.clearButton} onClick={onClearAll}>
                            비우기
                        </button>
                    )}

                </div>
            )}
        </div>
    );
}