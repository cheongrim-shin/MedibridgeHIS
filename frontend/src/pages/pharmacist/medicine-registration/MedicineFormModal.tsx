import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/Input';
import { Modal } from '../../../components/Modal';
import { Select } from '../../../components/Select';
import { FormControl } from '../../../components/FormControl';
import { FormGroup } from '../../../components/FormGroup';
import { FormRow } from '../../../components/FormRow';
import type { MedicineListVO, MedicineCreateRequest } from '../medicine.types';
import type { CommonCodeVO } from '../commonCode.types';
import { getCommonCodeList } from '../commonCode.api';
import { createMedicine } from '../medicine.api';
import styles from './MedicineFormModal.module.css';

interface MedicineFormModalProps {
    mode: 'register' | 'edit' | 'view';
    initialData: MedicineListVO | null;
    onClose: () => void;
    onRequestEdit: () => void;
    onSubmit: (result: MedicineListVO, isNew: boolean) => void;
    onDelete: (medicineCode: string) => void;
}

export const MedicineFormModal = ({
                                      mode,
                                      initialData,
                                      onClose,
                                      onRequestEdit,
                                      onSubmit,
                                      onDelete,
                                  }: MedicineFormModalProps) => {
    // COMMONCODE C/U 그룹 드롭다운 선택지 (약품명은 이제 텍스트 입력이라 M그룹 조회 불필요)
    const [categoryOptions, setCategoryOptions] = useState<CommonCodeVO[]>([]);
    const [unitOptions, setUnitOptions] = useState<CommonCodeVO[]>([]);
    const [isOptionsLoading, setIsOptionsLoading] = useState(true);

    useEffect(() => {
        let isCancelled = false;

        async function loadOptions() {
            setIsOptionsLoading(true);
            try {
                const [categories, units] = await Promise.all([
                    getCommonCodeList('C'),
                    getCommonCodeList('U'),
                ]);
                if (!isCancelled) {
                    setCategoryOptions(categories);
                    setUnitOptions(units);
                }
            } catch {
                if (!isCancelled) alert('공통코드 목록을 불러오지 못했습니다.');
            } finally {
                if (!isCancelled) setIsOptionsLoading(false);
            }
        }

        loadOptions();
        return () => { isCancelled = true; };
    }, []);

    // 기본 필드
    const [formMedicineNameText, setFormMedicineNameText] = useState(initialData?.medicineNameText ?? '');
    const [formMedicineCategory, setFormMedicineCategory] = useState(initialData?.medicineCategory ?? '');
    const [formManufacturer, setFormManufacturer] = useState(initialData?.manufacturer ?? '');
    const [formSpecification, setFormSpecification] = useState(initialData?.specification ?? '');
    const [formUnit, setFormUnit] = useState(initialData?.unit ?? '');
    const [formCoverageYn, setFormCoverageYn] = useState(initialData?.coverageYn ?? 'Y');
    const [formUnitCost, setFormUnitCost] = useState(initialData ? String(initialData.unitCost) : '');
    const [formInsuranceFee, setFormInsuranceFee] = useState(initialData ? String(initialData.insuranceFee) : '');
    const [formCurrentQuantity, setFormCurrentQuantity] = useState(initialData ? String(initialData.currentQuantity) : '');
    const [formMinQuantity, setFormMinQuantity] = useState(initialData ? String(initialData.minQuantity) : '');

    // 고급 설정 필드 (선택 입력)
    const [formItemSeq, setFormItemSeq] = useState(initialData?.itemSeq ?? '');
    const [formIngredient, setFormIngredient] = useState(initialData?.ingredient ?? '');
    const [formContribution, setFormContribution] = useState(initialData ? String(initialData.contribution) : '');

    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isReadOnly = mode === 'view';

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formMedicineNameText || !formMedicineCategory || !formManufacturer || !formSpecification ||
            !formUnit || !formUnitCost || !formInsuranceFee || !formCurrentQuantity || !formMinQuantity) {
            alert('필수 정보를 모두 입력해 주십시오.');
            return;
        }

        const numericUnitCost = Number(formUnitCost);
        const numericInsuranceFee = Number(formInsuranceFee);
        const numericContribution = Number(formContribution || 0);
        const numericCurrentQuantity = Number(formCurrentQuantity);
        const numericMinQuantity = Number(formMinQuantity);

        if ([numericUnitCost, numericInsuranceFee, numericContribution, numericCurrentQuantity, numericMinQuantity]
            .some((n) => isNaN(n) || n < 0 || !Number.isInteger(n))) {
            alert('금액/수량은 정수로 입력해 주십시오.');
            return;
        }

        const selectedCategory = categoryOptions.find(o => o.commonCodeNumber === formMedicineCategory);
        const selectedUnit = unitOptions.find(o => o.commonCodeNumber === formUnit);

        const isNew = mode === 'register';

        setIsSubmitting(true);
        try {
            if (isNew) {
                const body: MedicineCreateRequest = {
                    itemSeq: formItemSeq.trim(),
                    medicineCategory: formMedicineCategory,
                    medicineNameText: formMedicineNameText,
                    manufacturer: formManufacturer,
                    specification: formSpecification,
                    ingredient: formIngredient,
                    unit: formUnit,
                    coverageYn: formCoverageYn,
                    unitCost: numericUnitCost,
                    insuranceFee: numericInsuranceFee,
                    contribution: numericContribution,
                    currentQuantity: numericCurrentQuantity,
                    minQuantity: numericMinQuantity,
                };

                // 서버가 medicineCode/medicineName(코드)을 채번해서 응답으로 돌려줌
                const created = await createMedicine(body);

                const result: MedicineListVO = {
                    ...created,
                    medicineCategoryName: selectedCategory?.codeName1 ?? '',
                    unitName: selectedUnit?.codeName1 ?? '',
                };

                onSubmit(result, true);
            } else {
                const result: MedicineListVO = {
                    medicineCode: initialData!.medicineCode,
                    medicineName: initialData!.medicineName, // 코드값 불변
                    itemSeq: formItemSeq.trim(),
                    medicineCategory: formMedicineCategory,
                    medicineNameText: formMedicineNameText,
                    manufacturer: formManufacturer,
                    specification: formSpecification,
                    ingredient: formIngredient,
                    unit: formUnit,
                    coverageYn: formCoverageYn,
                    unitCost: numericUnitCost,
                    insuranceFee: numericInsuranceFee,
                    contribution: numericContribution,
                    currentQuantity: numericCurrentQuantity,
                    minQuantity: numericMinQuantity,
                    medicineCategoryName: selectedCategory?.codeName1 ?? '',
                    unitName: selectedUnit?.codeName1 ?? '',
                };

                onSubmit(result, false);
            }
        } catch {
            alert(isNew ? '등록 중 오류가 발생했습니다.' : '수정 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal width="480px" height="auto" onClick={onClose}>
            <Modal.Header>
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>
                    {mode === 'register' && '약품 등록'}
                    {mode === 'view' && `약품 상세 정보 (${initialData?.medicineCode})`}
                    {mode === 'edit' && `약품 정보 수정 (${initialData?.medicineCode})`}
                </span>
                <Modal.CloseBtn onClick={onClose} />
            </Modal.Header>

            <Modal.Content>
                <form onSubmit={handleSubmitForm} className={styles.modalForm}>
                    <FormGroup size="md">
                        <FormRow columns={2} gap="md">
                            <FormControl label="제품명" required>
                                <Input
                                    type="text"
                                    size="sm"
                                    placeholder="예: 타이레놀정500mg"
                                    value={formMedicineNameText}
                                    onChange={(e) => setFormMedicineNameText(e.target.value)}
                                    disabled={isReadOnly}
                                    readOnly={isReadOnly}
                                    required
                                />
                            </FormControl>

                            <FormControl label="약효분류" required>
                                <Select
                                    size="sm"
                                    value={formMedicineCategory}
                                    onChange={(e) => setFormMedicineCategory(e.target.value)}
                                    disabled={isReadOnly || isOptionsLoading}
                                    required
                                >
                                    <option value="" disabled>{isOptionsLoading ? '불러오는 중...' : '선택'}</option>
                                    {categoryOptions.map((opt) => (
                                        <option key={opt.commonCodeNumber} value={opt.commonCodeNumber}>
                                            {opt.codeName1}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </FormRow>

                        <FormRow columns={2} gap="md">
                            <FormControl label="제조사" required>
                                <Input
                                    type="text"
                                    size="sm"
                                    placeholder="제조사명을 입력해 주세요"
                                    value={formManufacturer}
                                    onChange={(e) => setFormManufacturer(e.target.value)}
                                    disabled={isReadOnly}
                                    readOnly={isReadOnly}
                                    required
                                />
                            </FormControl>

                            <FormControl label="규격" required>
                                <Input
                                    type="text"
                                    size="sm"
                                    placeholder="예: 500mg"
                                    value={formSpecification}
                                    onChange={(e) => setFormSpecification(e.target.value)}
                                    disabled={isReadOnly}
                                    readOnly={isReadOnly}
                                    required
                                />
                            </FormControl>
                        </FormRow>

                        <FormRow columns={2} gap="md">
                            <FormControl label="단위" required>
                                <Select
                                    size="sm"
                                    value={formUnit}
                                    onChange={(e) => setFormUnit(e.target.value)}
                                    disabled={isReadOnly || isOptionsLoading}
                                    required
                                >
                                    <option value="" disabled>{isOptionsLoading ? '불러오는 중...' : '선택'}</option>
                                    {unitOptions.map((opt) => (
                                        <option key={opt.commonCodeNumber} value={opt.commonCodeNumber}>
                                            {opt.codeName1}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl label="급여 여부" required>
                                <Select
                                    size="sm"
                                    value={formCoverageYn}
                                    onChange={(e) => setFormCoverageYn(e.target.value)}
                                    disabled={isReadOnly}
                                >
                                    <option value="Y">급여</option>
                                    <option value="N">비급여</option>
                                </Select>
                            </FormControl>
                        </FormRow>

                        <FormRow columns={2} gap="md">
                            <FormControl label="단가 (원)" required>
                                <Input
                                    type="number" size="sm" step="1" min="0"
                                    placeholder="예: 150"
                                    value={formUnitCost}
                                    onChange={(e) => setFormUnitCost(e.target.value)}
                                    disabled={isReadOnly} readOnly={isReadOnly} required
                                />
                            </FormControl>

                            <FormControl label="수가 (원)" required>
                                <Input
                                    type="number" size="sm" step="1" min="0"
                                    placeholder="예: 500"
                                    value={formInsuranceFee}
                                    onChange={(e) => setFormInsuranceFee(e.target.value)}
                                    disabled={isReadOnly} readOnly={isReadOnly} required
                                />
                            </FormControl>
                        </FormRow>

                        <FormRow columns={2} gap="md">
                            <FormControl label="현재고" required>
                                <Input
                                    type="number" size="sm" step="1" min="0"
                                    placeholder="예: 1000"
                                    value={formCurrentQuantity}
                                    onChange={(e) => setFormCurrentQuantity(e.target.value)}
                                    disabled={isReadOnly} readOnly={isReadOnly} required
                                />
                            </FormControl>

                            <FormControl label="최소재고" required>
                                <Input
                                    type="number" size="sm" step="1" min="0"
                                    placeholder="예: 100"
                                    value={formMinQuantity}
                                    onChange={(e) => setFormMinQuantity(e.target.value)}
                                    disabled={isReadOnly} readOnly={isReadOnly} required
                                />
                            </FormControl>
                        </FormRow>
                    </FormGroup>

                    <div className={styles.advancedToggleContainer}>
                        <span
                            className={styles.advancedToggleBtn}
                            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                        >
                            {isAdvancedOpen ? '고급 설정 숨기기' : '고급 설정 (식약처코드/성분함량/공단부담금)'}
                        </span>
                    </div>

                    {isAdvancedOpen && (
                        <FormGroup size="md">
                            <FormRow columns={2} gap="md">
                                <FormControl label="식약처코드">
                                    <Input
                                        type="text" size="sm"
                                        placeholder="예: ITEM001"
                                        value={formItemSeq}
                                        onChange={(e) => setFormItemSeq(e.target.value)}
                                        disabled={isReadOnly} readOnly={isReadOnly}
                                    />
                                </FormControl>

                                <FormControl label="공단부담금 (원)">
                                    <Input
                                        type="number" size="sm" step="1" min="0"
                                        placeholder="예: 35"
                                        value={formContribution}
                                        onChange={(e) => setFormContribution(e.target.value)}
                                        disabled={isReadOnly} readOnly={isReadOnly}
                                    />
                                </FormControl>
                            </FormRow>

                            <FormRow columns={1}>
                                <FormControl label="성분함량">
                                    <Input
                                        type="text" size="sm"
                                        placeholder="예: 아세트아미노펜"
                                        value={formIngredient}
                                        onChange={(e) => setFormIngredient(e.target.value)}
                                        disabled={isReadOnly} readOnly={isReadOnly}
                                    />
                                </FormControl>
                            </FormRow>
                        </FormGroup>
                    )}

                    <div className={styles.modalFooter}>
                        {mode === 'view' ? (
                            <Button
                                type="button"
                                color="indigo"
                                size="md"
                                onClick={(e) => { e.preventDefault(); onRequestEdit(); }}
                            >
                                수정하기
                            </Button>
                        ) : (
                            <Button type="submit" color="indigo" size="md" disabled={isSubmitting}>
                                {isSubmitting ? '저장 중...' : '저장'}
                            </Button>
                        )}
                    </div>

                    {mode !== 'register' && (
                        <div className={styles.deleteWarningArea}>
                            <Button
                                type="button"
                                color="red"
                                size="sm"
                                onClick={() => {
                                    if (window.confirm(`정말 ${initialData?.medicineCode} 약품을 삭제하시겠습니까?`)) {
                                        onDelete(initialData!.medicineCode);
                                    }
                                }}
                            >
                                삭제하기
                            </Button>
                        </div>
                    )}
                </form>
            </Modal.Content>
        </Modal>
    );
};