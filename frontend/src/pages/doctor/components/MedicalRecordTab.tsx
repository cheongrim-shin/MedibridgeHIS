import { useState } from "react";
import type { MedicalRecordDetailVO, MedicalRecordOptionVO, PrescriptionHistoryVO } from "../types";
import { CustomSelect } from "./CustomSelect";
import styles from "./MedicalRecordTab.module.css";

type RecordSubTab = "soap" | "prescription";


interface MedicalRecordTabProps {
    recordOptions: MedicalRecordOptionVO[];
    selectedRecordNumber: string;
    onChangeRecordNumber: (value: string) => void;
    recordDetail: MedicalRecordDetailVO[];
    prescriptionHistory: PrescriptionHistoryVO[];
    recordSubTab: RecordSubTab;
    onChangeSubTab: (tab: RecordSubTab) => void;
    formatDate: (dateStr: string) => string;
    editable?: boolean;
    onUpdateRecord?: (updated: MedicalRecordDetailVO) => void;
    onRenameDiagnosis?: (medicalRecordNumber: string, diagnosisName: string) => void;

    onUpdatePrescription?: (
        item: PrescriptionHistoryVO,
        updated: { qty: string; frequency: string; days: string }
    ) => Promise<boolean>;
    onDeletePrescription?: (item: PrescriptionHistoryVO) => Promise<boolean>;
}

export function MedicalRecordTab({
    recordOptions,
    selectedRecordNumber,
    onChangeRecordNumber,
    recordDetail,
    prescriptionHistory,
    recordSubTab,
    onChangeSubTab,
    formatDate,
    editable = false,
    onUpdateRecord,
    onRenameDiagnosis,
    onUpdatePrescription,
    onDeletePrescription,
}: MedicalRecordTabProps) {
    const [isRenaming, setIsRenaming] = useState(false);
    const [renameDraft, setRenameDraft] = useState("");

    const [editingNumber, setEditingNumber] = useState<string | null>(null);
    const [draft, setDraft] = useState<MedicalRecordDetailVO | null>(null);

    // 현재 드롭다운에서 선택된 진료가록 정보 찾기
    const currentOption = recordOptions.find((o) => o.medicalRecordNumber == selectedRecordNumber)

    const startRename = () => {
        setRenameDraft(currentOption?.diagnosisName ?? "");
        setIsRenaming(true);
    };

    const saveRename = () => {
        if (!selectedRecordNumber || !onRenameDiagnosis) return;
        onRenameDiagnosis(selectedRecordNumber, renameDraft.trim());
        setIsRenaming(false);
    };

    const startEdit = (item: MedicalRecordDetailVO) => {
        setEditingNumber(item.medicalNumber);
        setDraft({ ...item });
    };

    const cancelEdit = () => {
        setEditingNumber(null);
        setDraft(null);
    };

    const saveEdit = () => {
        if (!draft || !onUpdateRecord) return;
        onUpdateRecord(draft);
        setEditingNumber(null);
        setDraft(null);
    };

    const selectOptions = recordOptions.length > 0
        ? recordOptions.map((opt) => ({
            value: opt.medicalRecordNumber,
            label: `[${opt.startDate}] ${opt.diagnosisName}${opt.recordStatus === "종료" ? " (종결)" : ""}`,
        }))
        : [{ value: "", label: "진료기록없음" }];

    // 처방 이력 인라인 수정용 상태
    // key는 "의약품/주사면 medicalNumber-medicineCode", "물리치료면 treatmentNumber"로 만듦 - 항목 하나를 정확히 구분하기 위함
    const [editingPrescriptionKey, setEditingPrescriptionKey] = useState<string | null>(null);
    const [prescriptionDraft, setPrescriptionDraft] = useState({ qty: "", frequency: "", days: "" });

    const getPrescriptionKey = (item: PrescriptionHistoryVO) =>
        item.prescriptionType === "물리치료"
            ? `therapy-${item.treatmentNumber}`
            : `${item.medicalNumber}-${item.medicineCode}`;

    const startEditPrescription = (item: PrescriptionHistoryVO) => {
        setEditingPrescriptionKey(getPrescriptionKey(item));
        setPrescriptionDraft({
            qty: item.qty ?? "",
            frequency: item.frequency ?? "",
            days: item.days ?? "",
        });
    };

    const cancelEditPrescription = () => {
        setEditingPrescriptionKey(null);
    };

    const saveEditPrescription = async (item: PrescriptionHistoryVO) => {
        if (!onUpdatePrescription) return;
        const success = await onUpdatePrescription(item, prescriptionDraft);
        if (success) {
            setEditingPrescriptionKey(null);
        } else {
            alert("이미 처리된 처방이라 수정할 수 없습니다.");
        }
    };

    const handleDeletePrescription = async (item: PrescriptionHistoryVO) => {
        if (!onDeletePrescription) return;
        if (!window.confirm(`"${item.itemName}" 처방을 삭제하시겠습니까?`)) return;

        const success = await onDeletePrescription(item);
        if (!success) {
            alert("이미 처리된 처방이라 삭제할 수 없습니다.");
        }
    };

    // prescriptionHistory를 "같은 날짜/시간"끼리 묶어서 그룹으로 만듦
    // - SQL에서 이미 PRESCRIPTION_DATE ASC로 정렬해서 내려주기 때문에, 같은 시각끼리는 배열 안에서 항상 붙어있음
    // - reduce로 순회하면서: 직전 그룹이랑 날짜가 같으면 그 그룹에 추가, 다르면 새 그룹을 하나 시작
    const groupedPrescriptionHistory = prescriptionHistory.reduce<{ date: string; items: PrescriptionHistoryVO[] }[]>((groups, item) => {
        const lastGroup = groups[groups.length - 1];
        if (lastGroup && lastGroup.date === item.prescriptionDate) {
            lastGroup.items.push(item);
        } else {
            groups.push({ date: item.prescriptionDate, items: [item] });
        }
        return groups;
    }, []);

    return (
        <div className={styles.recordTabContent}>
            <label className={styles.fieldLabel}>조회할 진료기록</label>
            <div className={styles.selectRow}>
                <CustomSelect
                    options={selectOptions}
                    value={selectedRecordNumber}
                    onChange={onChangeRecordNumber}
                    placeholder="진료기록 없음"
                />
                {editable && currentOption && (
                    isRenaming ? (
                        <div className={styles.renameRow}>
                            <input
                                className={styles.renameInput}
                                value={renameDraft}
                                onChange={(e) => setRenameDraft(e.target.value)}
                                autoFocus
                            />
                            <button className={styles.renameSave} onClick={saveRename}>저장</button>
                            <button className={styles.renameCancel} onClick={() => setIsRenaming(false)}>취소</button>
                        </div>
                    ) : (
                        <button className={styles.renameTrigger} onClick={startRename}>
                            수정
                        </button>
                    )

                )}
            </div>
            <div className={styles.subTabRow}>
                <button
                    className={recordSubTab === "soap" ? styles.subTabActive : styles.subTab}
                    onClick={() => onChangeSubTab("soap")}
                >
                    진료기록
                </button>
                <button
                    className={recordSubTab === "prescription" ? styles.subTabActive : styles.subTab}
                    onClick={() => onChangeSubTab("prescription")}
                >
                    OCS처방이력
                </button>
            </div>


            {recordSubTab === "soap" && (
                <div className={styles.soapHistory}>
                    {recordDetail.length === 0 ? (
                        <p className={styles.emptyDetail}>진료 기록이 없습니다.</p>
                    ) : (
                        recordDetail.map((item) => {
                            const isEditing = editable && editingNumber === item.medicalNumber;
                            return (
                                <div key={item.medicalNumber}>
                                    <div className={styles.recordDateRow}>
                                        <p className={styles.recordDate}>{item.treatmentDate}</p>
                                        {editable && !isEditing && (
                                            <button className={styles.editButton} onClick={() => startEdit(item)}>
                                                수정
                                            </button>
                                        )}
                                    </div>

                                    {isEditing ? (
                                        <>
                                            <div className={styles.soapEditLine}>
                                                <span className={styles.soapS}>S</span>
                                                <textarea
                                                    className={styles.soapEditTextarea}
                                                    value={draft?.registerS ?? ""}
                                                    onChange={(e) => setDraft((p) => p ? { ...p, registerS: e.target.value } : p)}
                                                />
                                            </div>
                                            <div className={styles.soapEditLine}>
                                                <span className={styles.soapO}>O</span>
                                                <textarea
                                                    className={styles.soapEditTextarea}
                                                    value={draft?.registerO ?? ""}
                                                    onChange={(e) => setDraft((p) => p ? { ...p, registerO: e.target.value } : p)}
                                                />
                                            </div>
                                            <div className={styles.soapEditLine}>
                                                <span className={styles.soapA}>A</span>
                                                <textarea
                                                    className={styles.soapEditTextarea}
                                                    value={draft?.registerA ?? ""}
                                                    onChange={(e) => setDraft((p) => p ? { ...p, registerA: e.target.value } : p)}
                                                />
                                            </div>
                                            <div className={styles.soapEditLine}>
                                                <span className={styles.soapP}>P</span>
                                                <textarea
                                                    className={styles.soapEditTextarea}
                                                    value={draft?.registerP ?? ""}
                                                    onChange={(e) => setDraft((p) => p ? { ...p, registerP: e.target.value } : p)}
                                                />
                                            </div>
                                            <div className={styles.editActionRow}>
                                                <button className={styles.saveButton} onClick={saveEdit}>저장</button>
                                                <button className={styles.cancelButton} onClick={cancelEdit}>취소</button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className={styles.soapBlock}>
                                                <p className={styles.soapDotLabel}>
                                                    <span className={styles.soapDotS}>S</span> 주관적 증상
                                                </p>
                                                <p className={styles.soapBlockContent}>{item.registerS}</p>
                                            </div>
                                            <div className={styles.soapBlock}>
                                                <p className={styles.soapDotLabel}>
                                                    <span className={styles.soapDotO}>O</span> 객관적 진찰 소견
                                                </p>
                                                <p className={styles.soapBlockContent}>{item.registerO}</p>
                                            </div>
                                            <div className={styles.soapBlock}>
                                                <p className={styles.soapDotLabel}>
                                                    <span className={styles.soapDotA}>A</span> 평가/진단
                                                </p>
                                                <p className={styles.soapBlockContent}>{item.registerA}</p>
                                            </div>
                                            <div className={styles.soapBlock}>
                                                <p className={styles.soapDotLabel}>
                                                    <span className={styles.soapDotP}>P</span> 계획/처치
                                                </p>
                                                <p className={styles.soapBlockContent}>{item.registerP}</p>
                                            </div>
                                        </>
                                    )}
                                    <hr className={styles.recordDivider} />
                                </div>
                            );
                        })
                    )}
                </div>
            )}

            {recordSubTab === "prescription" && (
                <div className={styles.timelineList}>
                    {prescriptionHistory.length === 0 ? (
                        <p className={styles.emptyDetail}>처방 이력이 없습니다.</p>
                    ) : (
                        groupedPrescriptionHistory.map((group) => (
                            <div key={group.date} className={styles.timelineItem}>
                                <div className={styles.timelineDot} />
                                <div className={styles.timelineContent}>
                                    <p className={styles.timelineDate}>{formatDate(group.date)}</p>

                                    <div className={styles.prescriptionCardGroup}>
                                        {group.items.map((item) => {
                                            const key = getPrescriptionKey(item);
                                            const isEditingThis = editingPrescriptionKey === key;
                                            const canEdit = item.editable && item.prescriptionType !== "물리치료" && onUpdatePrescription;
                                            const canDelete = item.editable && onDeletePrescription;

                                            return (
                                                <div key={key} className={styles.prescriptionCard}>
                                                    <span className={
                                                        `${styles.categoryBadge} ${item.prescriptionType === "의약품" ? styles.badgeMedicine
                                                            : item.prescriptionType === "주사" ? styles.badgeInjection
                                                                : styles.badgeTherapy
                                                        }`
                                                    }>
                                                        {item.prescriptionType}
                                                    </span>

                                                    <div className={styles.prescriptionInfo}>
                                                        <p className={styles.prescriptionName}>{item.itemName}</p>

                                                        {isEditingThis ? (
                                                            <div className={styles.prescriptionEditRow}>
                                                                <input
                                                                    type="number"
                                                                    className={styles.prescriptionEditInput}
                                                                    value={prescriptionDraft.qty}
                                                                    onChange={(e) => setPrescriptionDraft((p) => ({ ...p, qty: e.target.value }))}
                                                                />
                                                                <span>{item.unit ?? ""} x 일</span>
                                                                <input
                                                                    type="number"
                                                                    className={styles.prescriptionEditInput}
                                                                    value={prescriptionDraft.frequency}
                                                                    onChange={(e) => setPrescriptionDraft((p) => ({ ...p, frequency: e.target.value }))}
                                                                />
                                                                <span>회</span>
                                                                {item.prescriptionType === "의약품" && (
                                                                    <>
                                                                        <span>x</span>
                                                                        <input
                                                                            type="number"
                                                                            className={styles.prescriptionEditInput}
                                                                            value={prescriptionDraft.days}
                                                                            onChange={(e) => setPrescriptionDraft((p) => ({ ...p, days: e.target.value }))}
                                                                        />
                                                                        <span>일</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <p className={styles.prescriptionDosage}>{item.detail}</p>
                                                        )}
                                                    </div>

                                                    <span className={
                                                        item.status === "조제완료" || item.status === "투여완료" || item.status === "치료완료"
                                                            ? styles.statusDone
                                                            : styles.statusPending
                                                    }>
                                                        {item.status}
                                                    </span>

                                                    {(canEdit || canDelete) && (
                                                        <div className={styles.prescriptionActions}>
                                                            {isEditingThis ? (
                                                                <>
                                                                    <button className={styles.saveButton} onClick={() => saveEditPrescription(item)}>저장</button>
                                                                    <button className={styles.cancelButton} onClick={cancelEditPrescription}>취소</button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {canEdit && (
                                                                        <button className={styles.editButton} onClick={() => startEditPrescription(item)}>수정</button>
                                                                    )}
                                                                    {canDelete && (
                                                                        <button className={styles.removeButton} onClick={() => handleDeletePrescription(item)}>삭제</button>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}