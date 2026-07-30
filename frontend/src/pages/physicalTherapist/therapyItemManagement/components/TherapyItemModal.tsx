// ============================================================
// [컴포넌트] TherapyItemModal.tsx
// 등록/수정/조회 모달 + 폼.
// ============================================================
import { useState } from 'react';
import styles from '../TherapyItemManagement.module.css';
import type { TherapyItem, TherapyType, InsuranceType, ModalMode } from '../therapyItem.types';
import { EMPTY_THERAPY_ITEM, THERAPY_TYPES, INSURANCE_TYPES, THERAPY_TYPE_LABEL, DEFAULT_DURATION } from '../therapyItem.types';
import type { ActionResult } from '../useTherapyItems';
import { Modal } from '../../therapyQueue/components/Modal';
import { FormGroup } from '../../therapyQueue/components/FormGroup';
import { FormRow } from '../../therapyQueue/components/FormRow';
import { Select } from '../../therapyQueue/components/Select';
import { FormControl } from '../../therapyQueue/components/FormControl';
import { Input } from '../../therapyQueue/components/Input';
import { Button } from '../../therapyQueue/components/Button';


interface TherapyItemModalProps {
    mode: ModalMode;                 // register | edit | view
    initial: TherapyItem | null;     // edit/view 일 때 채울 값 (register 면 null)
    onSubmit: (item: TherapyItem, mode: ModalMode) => Promise<ActionResult>; // 등록/수정 위임
    onDelete: (code: string) => Promise<ActionResult>;                       // 삭제 위임
    onToEdit: () => void;            // 조회 → 수정 모드 전환
    onClose: () => void;            // 모달 닫기
}

export const TherapyItemModal = ({ mode, initial, onSubmit, onDelete, onToEdit, onClose }: TherapyItemModalProps) => {
    // 폼 상태 한 덩어리로 관리 (필드별 useState 분산 → 객체 1개)
    const [form, setForm] = useState<TherapyItem>(initial ?? EMPTY_THERAPY_ITEM);
    const [isDeleteToggled, setIsDeleteToggled] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isView = mode === 'view';

    // 단일 변경 핸들러: 어떤 필드든 key 로 갱신
    const update = <K extends keyof TherapyItem>(key: K, value: TherapyItem[K]) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    // 검증: 통과하면 null, 실패하면 에러 메시지 반환
    const validate = (): string | null => {
        if(!form.code.trim() || !form.name.trim()) return "필수 정보를 모두 입력해 주십시오.";
        // BE와 동일 규칙을 FE에서 선제 검증 (불필요한 서버 왕복 방지)
        if(!/^P\d{2}$/.test(form.code.trim())) return "치료 코드는 P+숫자 2자리 형식입니다. (예: P09)"
        if(!Number.isFinite(form.price) || form.price < 0) return '올바른 수가를 입력해 주십시오.';
        if(!Number.isFinite(form.durationMinutes) || form.durationMinutes <= 0)
            return '올바른 소요 시간(분)을 입력해 주십시오.';
        return null;
    };

    // 저장(등록/수정)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(isView || isSubmitting) return;
        const msg = validate();
        if (msg) {
            alert(msg);
            return;
        }
        setIsSubmitting(true);
        try{
            const result = await onSubmit(form, mode); 
            alert(result.message);
            if (result.ok) onClose();            
        }finally{
            setIsSubmitting(false); // 실패해도 다시 시도 가능
        }
    };

    // 삭제
    const handleDelete = async () => {
        if (window.confirm(`정말 ${form.code} 치료 항목을 삭제하시겠습니까?`)) {
            const result = await onDelete(form.code);
            alert(result.message);
            if (result.ok) onClose();
        }
    };

    return (
        <Modal onClick={onClose}>
            <Modal.Header>
                <Modal.Title>
                    {mode === 'register' && '신규 치료 항목 등록'}
                    {mode === 'edit' && '치료 항목 수정'}
                    {mode === 'view' && '치료 항목 상세 정보'}
                </Modal.Title>
                <Modal.CloseBtn onClick={onClose} />
            </Modal.Header>

            <Modal.Content>
                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <FormGroup size="md">
                        <FormRow columns={2}>
                            <FormControl label="치료 구분" required>
                                <Select
                                    value={form.type}
                                    onChange={(e)=>{
                                        const nextType = e.target.value as TherapyType;
                                        setForm((prev) =>({
                                            ...prev,
                                            type: nextType,
                                            durationMinutes:DEFAULT_DURATION[nextType],
                                        }));
                                    }}
                                >
                                    {THERAPY_TYPES.map((t) => (
                                        <option key={t} value={t}>{THERAPY_TYPE_LABEL[t]}</option>  
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl label="치료 코드" required>
                                <Input
                                    type="text"
                                    value={form.code}
                                    onChange={(e) => update('code', e.target.value)}
                                    placeholder="예: P09"
                                    disabled={mode === 'edit' || isView}
                                    required size="sm" color="green"
                                />
                            </FormControl>
                        </FormRow>

                        <FormRow columns={1}>
                            <FormControl label="치료 항목명" required>
                                <Input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => update('name', e.target.value)}
                                    placeholder="예: 온습포 (Hot Pack)"
                                    required size="sm" color="green" disabled={isView}
                                />
                            </FormControl>
                        </FormRow>

                        <FormRow columns={1}>
                            <FormControl label="소요 시간 (분)" required>
                                <Input
                                    type="number"
                                    value={form.durationMinutes || ''}
                                    onChange={(e) => update('durationMinutes', Number(e.target.value))}
                                    placeholder="예: 30"
                                    required size="sm" color="green" disabled={isView}
                                />
                            </FormControl>
                        </FormRow>

                        <FormRow columns={2}>
                            <FormControl label="급여 여부" required>
                                <Select
                                    value={form.insuranceType}
                                    onChange={(e) => update('insuranceType', e.target.value as InsuranceType)}
                                    required size="sm" color="green" disabled={isView}
                                >
                                    {INSURANCE_TYPES.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl label="수가 (원)" required>
                                <Input
                                    type="number"
                                    value={form.price || ''}
                                    onChange={(e) => update('price', Number(e.target.value))}
                                    placeholder="예: 25000"
                                    required size="sm" color="green" disabled={isView}
                                />
                            </FormControl>
                        </FormRow>
                    </FormGroup>

                    {/* 액션 버튼: 조회 모드면 '수정하기', 그 외엔 '저장' */}
                    <div className={styles.modalActionRow}>
                        {isView ? (
                            <Button key="toEdit" type="button" color="green" size="md" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToEdit(); }} fullWidth>
                                수정하기
                            </Button>
                        ) : (
                            <Button key="submit" type="submit" color="green" size="md" fullWidth>
                                저장
                            </Button>
                        )}
                    </div>

                    {/* 고급 설정(삭제): 등록 모드가 아닐 때만 노출 */}
                    {mode !== 'register' && (
                        <>
                            <div className={styles.advancedToggleContainer}>
                                <span
                                    className={styles.advancedToggleBtn}
                                    onClick={() => setIsDeleteToggled(!isDeleteToggled)}
                                >
                                    {isDeleteToggled ? '고급 설정 숨기기' : '고급 설정'}
                                </span>
                            </div>

                            {isDeleteToggled && (
                                <div className={styles.deleteWarningArea}>
                                    <Button type="button" color="red" size="sm" onClick={handleDelete} fullWidth>
                                        삭제하기
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </form>
            </Modal.Content>
        </Modal>
    );
};
