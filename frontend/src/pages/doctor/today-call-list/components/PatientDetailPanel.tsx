import { useState } from "react";
import { DocumentIssueTab } from "../../components/DocumentIssueTab";
import styles from "./PatientDetailPanel.module.css";
import type { MedicalRecordDetailVO, MedicalRecordOptionVO, PrescriptionHistoryVO, WaitingListVO } from "../../types";
import { MedicalRecordTab } from "../../components/MedicalRecordTab";

type RightTab = "document" | "record";
type RecordSubTab = "soap" | "prescription";

interface PatientDetailPanelProps {
    selected: WaitingListVO | null;
    checkedDocs: string[];
    onToggleDoc: (id: string) => void;
    recordOptions: MedicalRecordOptionVO[];
    selectedRecordNumber: string;
    onChangeRecordNumber: (value: string) => void;
    recordDetail: MedicalRecordDetailVO[];
    prescriptionHistory: PrescriptionHistoryVO[];
    formatDate: (dateStr: string) => string;
}

export function PatientDetailPanel({
    selected,
    checkedDocs,
    onToggleDoc,
    recordOptions,
    selectedRecordNumber,
    onChangeRecordNumber,
    recordDetail,
    prescriptionHistory,
    formatDate,
}: PatientDetailPanelProps) {
    const [rightTab, setRightTab] = useState<RightTab>("document");
    const [recordSubTab, setRecordSubTab] = useState<RecordSubTab>("soap");

    if (!selected) {
        return (
            <div className={styles.detailPanel}>
                <div className={styles.emptyDetail}>
                    좌측 목록에서 환자를 선택해 주세요.
                </div>
            </div>
        );
    }

    return (
        <div className={styles.detailPanel}>
            <div className={styles.tabRow}>
                <button
                    className={rightTab === "document" ? styles.tabActive : styles.tab}
                    onClick={() => setRightTab("document")}
                >
                    서류발급
                </button>
                <button
                    className={rightTab === "record" ? styles.tabActive : styles.tab}
                    onClick={() => setRightTab("record")}
                >
                    전자의무기록
                </button>
            </div>

            {rightTab === "document" && (
                <DocumentIssueTab
                    patient={selected}
                    checkedDocs={checkedDocs}
                    onToggleDoc={onToggleDoc}
                    medicalNumber={selected.medicalNumber}
                />
            )}

            {rightTab === "record" && (
                <MedicalRecordTab
                    recordOptions={recordOptions}
                    selectedRecordNumber={selectedRecordNumber}
                    onChangeRecordNumber={onChangeRecordNumber}
                    recordDetail={recordDetail}
                    prescriptionHistory={prescriptionHistory}
                    recordSubTab={recordSubTab}
                    onChangeSubTab={setRecordSubTab}
                    formatDate={formatDate}
                />
            )}
        </div>
    );
}