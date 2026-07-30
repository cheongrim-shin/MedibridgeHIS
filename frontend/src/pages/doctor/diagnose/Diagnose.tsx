import { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import styles from "./Diagnose.module.css";
import type { AddedInjectionOrder, AddedMedicineOrder, AddedTherapyOrder, MedicalRecordDetailVO, MedicalRecordOptionVO, MedicineSearchVO, PatientInfoVO, PhysicalTherapyItemVO, PrescriptionHistoryVO } from "../types";
import { OcsOrderPanel } from "./components/OcsOrderPanel";
import { MedicalRecordTab } from "../components/MedicalRecordTab";
import { CustomSelect } from "../components/CustomSelect";
import { DocumentIssueTab } from "../components/DocumentIssueTab";
import { NewMedicalRecordsModal } from "./components/NewMedicalRecordsModal";
import axios from "axios";

type RightTab = "ocs" | "document";

interface LayoutContext {
    setPageTitle: (title: React.ReactNode) => void;
    setHeaderAction: (action: React.ReactNode) => void;
}

const getDraftKey = (medicalNumber: string) => `diagnose-draft-${medicalNumber}`;

interface DiagnoseDraft {
    registerS: string;
    registerO: string;
    registerA: string;
    registerP: string;
    aiSummaryText: string;
    addedMedicines: AddedMedicineOrder[];
    addedInjections: AddedInjectionOrder[];
    addedTherapies: AddedTherapyOrder[];
}

function loadDraft(medicalNumber: string | null): DiagnoseDraft | null {
    if (!medicalNumber) return null;
    try {
        const raw = sessionStorage.getItem(getDraftKey(medicalNumber));
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function Diagnose() {

    const [searchParams] = useSearchParams();
    const medicalNumber = searchParams.get("medicalNumber");

    const draft = loadDraft(medicalNumber);

    const [aiSummaryText, setAiSummaryText] = useState(draft?.aiSummaryText ?? "");
    const [isSummarizing, setIsSummarizing] = useState(false);

    const [checkedDocs, setCheckedDocs] = useState<string[]>([]);
    const [showNewMedicalRecordModal, setShowNewMedicalRecordModal] = useState(false);
    const [addedMedicines, setAddedMedicines] = useState<AddedMedicineOrder[]>(draft?.addedMedicines ?? []);
    const [addedInjections, setAddedInjections] = useState<AddedInjectionOrder[]>(draft?.addedInjections ?? []);
    const [addedTherapies, setAddedTherapies] = useState<AddedTherapyOrder[]>(draft?.addedTherapies ?? []);

    const { setPageTitle, setHeaderAction } = useOutletContext<LayoutContext>();

    const handleAiSummary = () => {
        if (recordDetail.length === 0) {
            alert("요약할 진료 기록이 없습니다.")
            return;
        }

        setIsSummarizing(true);
        axios.post<{ summary: string }>(`/api/doctor/ai-summary`, { records: recordDetail })
            .then((res) => setAiSummaryText(res.data.summary))
            .catch((err) => {
                console.error("AI요약에 실패 : ", err);
                alert("AI 요약에 실패했습니다.");
            })
            .finally(() => setIsSummarizing(false));
    }


    const handleAddTherapy = (item: PhysicalTherapyItemVO) => {
        setAddedTherapies((prev) => [...prev, {
            commonCodeNumber: item.commonCodeNumber,
            codeName1: item.codeName1,
            codeName2: item.codeName2,
        }]);
    };

    const handleUpdateMedicine = (index: number, field: keyof AddedMedicineOrder, value: string) => {
        setAddedMedicines((prev) => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
    };

    const handleUpdateInjection = (index: number, field: keyof AddedInjectionOrder, value: string) => {
        setAddedInjections((prev) => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
    };

    const handleRemoveMedicine = (index: number) => {
        setAddedMedicines((prev) => prev.filter((_, i) => i !== index));
    };

    const handleRemoveInjection = (index: number) => {
        setAddedInjections((prev) => prev.filter((_, i) => i !== index));
    };

    const handleRemoveTherapy = (index: number) => {
        setAddedTherapies((prev) => prev.filter((_, i) => i !== index))
    };

    const handleClearAllOrders = () => {
        setAddedMedicines([]);
        setAddedInjections([]);
        setAddedTherapies([]);
    };

    const navigate = useNavigate();

    const [recordSubTab, setRecordSubTab] = useState<"soap" | "prescription">("soap")
    const [rightTab, setRightTab] = useState<RightTab>("ocs");

    const [patient, setPatient] = useState<PatientInfoVO | null>(null)

    // 조회할 진료기록 (좌측)
    const [recordOptions, setRecordOptions] = useState<MedicalRecordOptionVO[]>([]);
    const [viewingRecordNumber, setViewingRecordNumber] = useState("");
    const [recordDetail, setRecordDetail] = useState<MedicalRecordDetailVO[]>([]);

    // 저장할 진료기록 (중앙)
    const [savingRecordNumber, setSavingRecordNumber] = useState("");

    // OCS 처방 이력
    const [prescriptionHistory, setPrescriptionHistory] = useState<PrescriptionHistoryVO[]>([]);

    // SOAP - draft에 저장된 값이 있으면 그걸로 복원, 없으면 빈 칸으로 시작
    const [registerS, setRegisterS] = useState(draft?.registerS ?? "");
    const [registerO, setRegisterO] = useState(draft?.registerO ?? "");
    const [registerA, setRegisterA] = useState(draft?.registerA ?? "");
    const [registerP, setRegisterP] = useState(draft?.registerP ?? "");

    useEffect(() => {
        if (!medicalNumber) return;

        const draftData: DiagnoseDraft = {
            registerS, registerO, registerA, registerP, aiSummaryText,
            addedMedicines, addedInjections, addedTherapies,
        };
        sessionStorage.setItem(getDraftKey(medicalNumber), JSON.stringify(draftData));
    }, [medicalNumber, registerS, registerO, registerA, registerP, addedMedicines, addedInjections, addedTherapies, aiSummaryText]);

    const [isSaving, setIsSaving] = useState(false);

    const [treatmentEnd, setTreatmentEnd] = useState(false);

    const handleComplete = useCallback(async () => {
        if (!medicalNumber || isSaving) return;
        setIsSaving(true);

        try {
            if (addedMedicines.length > 0 || addedInjections.length > 0 || addedTherapies.length > 0) {
                await axios.post(`/api/doctor/save-orders`, {
                    medicalNumber,
                    medicines: addedMedicines.map((m) => ({
                        medicineCode: m.medicineCode, dosage: m.dosage, frequency: m.frequency, days: m.days,
                    })),
                    injections: addedInjections.map((i) => ({
                        medicineCode: i.medicineCode, dosage: i.dosage, unit: i.unit, frequency: i.frequency,
                    })),
                    therapies: addedTherapies.map((t) => ({
                        commonCodeNumber: t.commonCodeNumber, codeName1: t.codeName1, codeName2: t.codeName2,
                    })),

                });
            }

            await axios.post(`/api/doctor/complete-treatment`, {
                medicalNumber,
                medicalRecordNumber: savingRecordNumber || null,
                registerS,
                registerO,
                registerA,
                registerP,
                treatmentEnd,
            });

            // 진료완료 저장까지 성공했으니, 더 이상 임시본이 필요 없음 → 지워줌
            sessionStorage.removeItem(getDraftKey(medicalNumber));

            navigate("/doctor/history");

        } catch (err) {
            console.error("진료완료 처리 실패 : ", err);
        } finally {
            setIsSaving(false);
        }
    }, [medicalNumber, isSaving, addedMedicines, addedInjections, addedTherapies, savingRecordNumber, registerS, registerO, registerA, registerP, treatmentEnd, navigate]);

    // 환자 기본정보 + 진료기록 목록 + 처방이력 로드
    useEffect(() => {
        if (!medicalNumber) return;

        axios.get(`/api/doctor/patient-info`, {
            params: { medicalNumber }
        })
            .then((res) => setPatient(res.data))
            .catch((err) => console.error("환자 정보 조회 실패 : ", err));

        axios.get<MedicalRecordOptionVO[]>(`/api/doctor/medical-record-options`, {
            params: { medicalNumber }
        })
            .then((res) => {
                setRecordOptions(res.data);
                if (res.data.length > 0) {
                    setViewingRecordNumber(res.data[0].medicalRecordNumber);
                    setSavingRecordNumber(res.data[0].medicalRecordNumber);
                }
            })
            .catch((err) => console.error("진료기록 목록 조회 실패 : ", err));

    }, [medicalNumber]);

    // 헤더 제목
    useEffect(() => {
        if (patient) {
            setPageTitle(
                <>
                    <span className={styles.patientName}>{patient.memberName}</span>
                    <span className={styles.patientMeta}>(만 {patient.age}세/{patient.gender})</span>
                </>
            );
        }
        return () => setPageTitle(null);
    }, [patient]);


    // 조회할 진료기록 바뀌면 SOAP 히스토리 다시 조회
    const [lastViewingRecordNumber, setLastViewingRecordNumber] = useState(viewingRecordNumber);
    if (viewingRecordNumber !== lastViewingRecordNumber) {
        setLastViewingRecordNumber(viewingRecordNumber);
        setRecordDetail([]);
    }

    useEffect(() => {
        if (!viewingRecordNumber) return;

        axios.get(`/api/doctor/medical-record-detail`, {
            params: { medicalRecordNumber: viewingRecordNumber },
        })
            .then((res) => setRecordDetail(res.data))
            .catch((err) => console.error("진료기록 상세 조회 실패 : ", err));

        axios.get<PrescriptionHistoryVO[]>(`/api/doctor/prescription-history`, {
            params: { medicalRecordNumber: viewingRecordNumber },
        })
            .then((res) => setPrescriptionHistory(res.data))
            .catch((err) => console.error("처방 이력 조회 실패 : ", err));

    }, [viewingRecordNumber]);

    const handleNewRecord = () => {
        setShowNewMedicalRecordModal(true);
    };

    const handleCreateMedicalRecord = (diagnosisName: string) => {
        if (!medicalNumber) return;

        axios.post(`/api/doctor/create-medical-record`, { medicalNumber, diagnosisName })
            .then(res => {
                const newRecordNumber = res.data;
                const newOption = {
                    medicalRecordNumber: newRecordNumber,
                    diagnosisName,
                    startDate: new Date().toISOString().slice(0, 10),
                    recordStatus: "진행중",
                };

                setRecordOptions((prev) => [newOption, ...prev]);
                setSavingRecordNumber(newRecordNumber);
                setShowNewMedicalRecordModal(false);
            })

            .catch((err) => console.error("신규 진료기록 생성 실패 : ", err));
    };

    // 진료완료 버튼을 헤더로 전달
    useEffect(() => {
        setHeaderAction(
            <button className={styles.completeButtonHeader} onClick={handleComplete}>
                {isSaving ? "저장중..." : "진료완료"}
            </button>
        );
        return () => setHeaderAction(null);
    }, [handleComplete, isSaving])

    const handleToggleDoc = (id: string) => {
        setCheckedDocs((prev) =>
            prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
        );
    };


    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        return dateStr.replaceAll("-", ".");
    }

    const handleAddMedicine = (item: MedicineSearchVO) => {
        setAddedMedicines((prev) => {
            if (prev.some((m) => m.medicineCode === item.medicineCode)) {
                alert("이미 추가된 약제입니다.");
                return prev;
            }
            return [...prev, {
                medicineCode: item.medicineCode,
                medicineName: item.medicineName,
                dosage: "1",
                frequency: "1",
                days: "1",
            }];
        });
    };

    const handleAddInjection = (item: MedicineSearchVO) => {
        setAddedInjections((prev) => {
            if (prev.some((i) => i.medicineCode === item.medicineCode)) {
                alert("이미 추가된 약제입니다.");
                return prev;
            }
            return [...prev, {
                medicineCode: item.medicineCode,
                medicineName: item.medicineName,
                dosage: "1",
                unit: item.unit,           // 저장용 코드값 (그대로)
                unitLabel: item.unitLabel, // 화면 표시용 텍스트 (추가)
                frequency: "1",
            }];
        });
    };

    const handleChangeSavingRecord = (value: string) => {
        setSavingRecordNumber(value);
        if (value) {
            setViewingRecordNumber(value);
        }
    };

    // OCS처방이력에서 "수정" 눌렀을 때 실행됨
    const handleUpdatePrescription = async (
        item: PrescriptionHistoryVO,
        updated: { qty: string; frequency: string; days: string }
    ): Promise<boolean> => {
        try {
            if (item.prescriptionType === "의약품") {
                await axios.put(`/api/doctor/prescription/${item.medicalNumber}/${item.medicineCode}`, {
                    qty: updated.qty,
                    frequency: updated.frequency,
                    days: updated.days,
                });
            } else if (item.prescriptionType === "주사") {
                await axios.put(`/api/doctor/injection/${item.medicalNumber}/${item.medicineCode}`, {
                    qty: updated.qty,
                    frequency: updated.frequency,
                });
            }

            // 성공하면 처방이력을 다시 불러와서 화면 갱신
            if (viewingRecordNumber) {
                const res = await axios.get<PrescriptionHistoryVO[]>(`/api/doctor/prescription-history`, {
                    params: { medicalRecordNumber: viewingRecordNumber },
                });
                setPrescriptionHistory(res.data);
            }
            return true;
        } catch (err) {
            // 백엔드가 409(Conflict)로 응답하면 "이미 처리돼서 수정 불가"라는 뜻
            console.error("처방 수정 실패 : ", err);
            return false;
        }
    };

    // OCS처방이력에서 "삭제" 눌렀을 때 실행됨
    const handleDeletePrescription = async (item: PrescriptionHistoryVO): Promise<boolean> => {
        try {
            if (item.prescriptionType === "의약품") {
                await axios.delete(`/api/doctor/prescription/${item.medicalNumber}/${item.medicineCode}`);
            } else if (item.prescriptionType === "주사") {
                await axios.delete(`/api/doctor/injection/${item.medicalNumber}/${item.medicineCode}`);
            } else if (item.prescriptionType === "물리치료") {
                await axios.delete(`/api/doctor/physical-therapy-order/${item.treatmentNumber}`);
            }

            if (viewingRecordNumber) {
                const res = await axios.get<PrescriptionHistoryVO[]>(`/api/doctor/prescription-history`, {
                    params: { medicalRecordNumber: viewingRecordNumber },
                });
                setPrescriptionHistory(res.data);
            }
            return true;
        } catch (err) {
            console.error("처방 삭제 실패 : ", err);
            return false;
        }
    };


    // 발표/시연용 - SOAP 4칸에 미리 정해둔 샘플 문구를 한 번에 채워 넣음
    // 실제 진료 데이터가 아니라 데모용 더미 텍스트라는 점 주의
    const handleFillSampleData = () => {
        setRegisterS("무릎 통증 호소. 계단 오르내릴 때 통증이 심해진다고 함. 발병 시기는 약 2주 전.");
        setRegisterO("무릎 관절 부위 압통 있음. 부종 경미. ROM 제한 없음. 촉진 시 슬개골 아래 압통 심함.");
        setRegisterA("무릎뼈의 기타 장애 의심. 퇴행성 변화 가능성 배제 불가.");
        setRegisterP("소염진통제 처방. 물리치료(견인치료) 병행. 2주 후 재진 권유. 증상 지속 시 영상검사 고려.");
    };

    return (
        <div className={styles.diagnoseContainer}>
            <div className={styles.threeColumnRow}>
                {/* 좌측 진료기록 - 기존 JSX 통째로 교체 */}
                <div className={styles.leftColumn}>
                    <MedicalRecordTab
                        recordOptions={recordOptions}
                        selectedRecordNumber={viewingRecordNumber}
                        onChangeRecordNumber={setViewingRecordNumber}
                        recordDetail={recordDetail}
                        prescriptionHistory={prescriptionHistory}
                        recordSubTab={recordSubTab}
                        onChangeSubTab={setRecordSubTab}
                        formatDate={formatDate}
                        onUpdatePrescription={handleUpdatePrescription}
                        onDeletePrescription={handleDeletePrescription}
                    />
                </div>

                {/* 중앙 저장항 진료기록 + SOAP 입력 */}
                <div className={styles.middleColumn}>
                    <div className={styles.middleHeader}>
                        <div>
                            <label className={styles.fieldLabel}>저장할 진료기록</label>
                            <CustomSelect
                                options={[
                                    { value: "", label: "신규 진료기록" },
                                    ...recordOptions.map((opt) => ({
                                        value: opt.medicalRecordNumber,
                                        label: `[${opt.startDate}] ${opt.diagnosisName}`,
                                    })),
                                ]}
                                value={savingRecordNumber}
                                onChange={handleChangeSavingRecord}
                                placeholder="신규 진료기록"
                            />
                        </div>
                        <div className={styles.middleHeaderRight}>
                            <label className={styles.treatmentEndCheckbox}>
                                <input
                                    type="checkbox"
                                    checked={treatmentEnd}
                                    // 체크박스를 클릭하면 브라우저가 e.target.checked에 true/false를 담아서 알려줌
                                    // 그 값을 그대로 상태에 저장
                                    onChange={(e) => setTreatmentEnd(e.target.checked)}
                                />
                                치료종결
                            </label>
                            <button className={styles.newRecordButton} onClick={handleNewRecord}>+ 신규 진료기록</button>
                        </div>
                    </div>
                    <div className={styles.aiSummaryBox}>
                        <div className={styles.aiSummaryHeader}>
                            <span>관련 이력 (AI 요약)</span>
                            <button className={styles.aiSummaryButton} onClick={handleAiSummary} disabled={isSummarizing}>
                                {isSummarizing ? "요약중..." : "+ AI 요약"}
                            </button>
                        </div>
                        <p className={styles.aiSummaryText}>{aiSummaryText}</p>
                        {aiSummaryText && (
                            <p className={styles.aiApiNotice}>ⓘ Powered by Google Gemini</p>
                        )}
                    </div>

                    {/* 시연용 - SOAP 샘플 데이터 자동 입력 버튼 */}
                    <div className={styles.demoFillRow}>
                        <button className={styles.demoFillButton} onClick={handleFillSampleData} type="button">
                            ✎ 샘플 데이터 입력 (시연용)
                        </button>
                    </div>


                    <div className={styles.soapGrid}>

                        <div className={styles.soapBox}>
                            <span className={`${styles.soapLabel} ${styles.soapS}`}>S 주관적 증상</span>
                            <textarea
                                className={styles.soapTextarea}
                                value={registerS}
                                onChange={(e) => setRegisterS(e.target.value)}
                            />
                        </div>

                        <div className={styles.soapBox}>
                            <span className={`${styles.soapLabel} ${styles.soapO}`}>O 객관적 진찰 소견</span>
                            <textarea
                                className={styles.soapTextarea}
                                value={registerO}
                                onChange={(e) => setRegisterO(e.target.value)}
                            />
                        </div>

                        <div className={styles.soapBox}>
                            <span className={`${styles.soapLabel} ${styles.soapA}`}>A 평가/진단</span>
                            <textarea
                                className={styles.soapTextarea}
                                value={registerA}
                                onChange={(e) => setRegisterA(e.target.value)}
                            />
                        </div>

                        <div className={styles.soapBox}>
                            <span className={`${styles.soapLabel} ${styles.soapP}`}>P 계획/처치</span>
                            <textarea
                                className={styles.soapTextarea}
                                value={registerP}
                                onChange={(e) => setRegisterP(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* 우측 OCS처방/서류발급/수술오더 */}
                <div className={styles.rightColumn}>
                    <div className={styles.tabRow}>
                        <button className={rightTab === "ocs" ? styles.tabActive : styles.tab} onClick={() => setRightTab("ocs")}>OCS 처방</button>
                        <button className={rightTab === "document" ? styles.tabActive : styles.tab} onClick={() => setRightTab("document")}>서류 발급</button>
                    </div>



                    {rightTab === "ocs" && (
                        <OcsOrderPanel
                            addedMedicines={addedMedicines}
                            addedInjections={addedInjections}
                            addedTherapies={addedTherapies}
                            onAddMedicine={handleAddMedicine}
                            onAddInjection={handleAddInjection}
                            onAddTherapy={handleAddTherapy}
                            onUpdateMedicine={handleUpdateMedicine}
                            onUpdateInjection={handleUpdateInjection}
                            onRemoveMedicine={handleRemoveMedicine}
                            onRemoveInjection={handleRemoveInjection}
                            onRemoveTherapy={handleRemoveTherapy}
                            onClearAll={handleClearAllOrders}
                        />
                    )}

                    {rightTab === "document" && patient && (
                        <DocumentIssueTab
                            patient={patient}
                            checkedDocs={checkedDocs}
                            onToggleDoc={handleToggleDoc}
                            showPatientInfo={false}
                            className={styles.documentTabNoPadding}
                            medicalNumber={medicalNumber ?? ""}
                        />
                    )}
                </div>
            </div>

            {showNewMedicalRecordModal && (
                <NewMedicalRecordsModal
                    onClose={() => setShowNewMedicalRecordModal(false)}
                    onCreate={handleCreateMedicalRecord}
                />
            )}
        </div>
    )
}