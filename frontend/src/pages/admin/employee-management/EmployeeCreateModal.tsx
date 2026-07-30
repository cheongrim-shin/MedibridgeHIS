import { useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/Input';
import { Modal } from '../../../components/Modal';
import { Select } from '../../../components/Select';
import { FormGroup } from '../../../components/FormGroup';
import { FormRow } from '../../../components/FormRow';
import { getDepartments, getPositions } from '../../../features/member/api/member.api';
import type { Department, Position } from '../../../features/member/api/member.types';
import { createEmployee } from '../admin.api';

const ADMIN_POSITION_NAME = '관리자';

interface EmployeeCreateModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export const EmployeeCreateModal = ({ onClose, onSuccess }: EmployeeCreateModalProps) => {
    // 폼 입력값
    const [memberId, setMemberId] = useState('');
    const [password, setPassword] = useState('');
    const [memberName, setMemberName] = useState('');
    const [memberPhoneNumber, setMemberPhoneNumber] = useState('');
    const [departmentCode, setDepartmentCode] = useState('');

    // 부서 목록 + 고정된 "관리자" 직책 코드
    const [departments, setDepartments] = useState<Department[]>([]);
    const [adminPosition, setAdminPosition] = useState<Position | null>(null);
    const [isOptionsLoading, setIsOptionsLoading] = useState(true);

    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 마운트 시 부서 목록 + "관리자" 직책 코드 조회
    useEffect(() => {
        let isCancelled = false;

        async function loadOptions() {
            setIsOptionsLoading(true);
            try {
                const [depts, positions] = await Promise.all([getDepartments(), getPositions()]);
                if (isCancelled) return;
                setDepartments(depts);
                const found = positions.find((p) => p.positionName === ADMIN_POSITION_NAME) ?? null;
                setAdminPosition(found);
                if (!found) setErrorMessage('"관리자" 직책 코드를 찾을 수 없습니다. 직책 목록을 확인해 주세요.');
            } catch {
                if (!isCancelled) setErrorMessage('부서/직책 목록을 불러오지 못했습니다.');
            } finally {
                if (!isCancelled) setIsOptionsLoading(false);
            }
        }

        loadOptions();
        return () => { isCancelled = true; };
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!adminPosition) {
            setErrorMessage('"관리자" 직책 코드를 확인할 수 없어 계정을 생성할 수 없습니다.');
            return;
        }
        setErrorMessage('');
        setIsSubmitting(true);
        try {
            await createEmployee({
                memberId,
                password,
                memberName,
                memberPhoneNumber,
                departmentCode,
                positionCode: adminPosition.positionCode,
            });
            alert('관리자 계정이 생성되었습니다.');
            onSuccess();
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 400) {
                setErrorMessage(err.response.data?.message ?? '입력값을 확인해주세요.');
            } else {
                setErrorMessage('계정 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal onClick={onClose}>
            <Modal.Header>
                <Modal.Title>관리자 계정 생성</Modal.Title>
                <Modal.CloseBtn onClick={onClose} />
            </Modal.Header>
            <Modal.Content>
                <form onSubmit={handleSubmit}>
                    <FormGroup size="md">
                        <FormRow columns={1}>
                            <Input
                                label="아이디"
                                size="md"
                                color="indigo"
                                placeholder="아이디 입력"
                                value={memberId}
                                onChange={(e) => setMemberId(e.target.value)}
                                autoComplete="username"
                                required
                            />
                        </FormRow>

                        <FormRow columns={1}>
                            <Input
                                label="초기 비밀번호"
                                type="password"
                                size="md"
                                color="indigo"
                                placeholder="비밀번호 (4자 이상)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                required
                            />
                        </FormRow>

                        <FormRow columns={1}>
                            <Input
                                label="이름"
                                size="md"
                                color="indigo"
                                placeholder="이름 입력"
                                value={memberName}
                                onChange={(e) => setMemberName(e.target.value)}
                                autoComplete="name"
                                required
                            />
                        </FormRow>

                        <FormRow columns={1}>
                            <Input
                                label="연락처"
                                size="md"
                                color="indigo"
                                placeholder="010-0000-0000"
                                value={memberPhoneNumber}
                                onChange={(e) => setMemberPhoneNumber(e.target.value)}
                                autoComplete="tel"
                                required
                            />
                        </FormRow>

                        <FormRow columns={2} gap="md">
                            <Select
                                label="부서"
                                size="md"
                                color="indigo"
                                value={departmentCode}
                                onChange={(e) => setDepartmentCode(e.target.value)}
                                disabled={isOptionsLoading}
                                required
                            >
                                <option value="">부서 선택</option>
                                {departments.map((d) => (
                                    <option key={d.departmentCode} value={d.departmentCode}>
                                        {d.departmentName}
                                    </option>
                                ))}
                            </Select>

                            <Input
                                label="직책"
                                size="md"
                                color="indigo"
                                value={ADMIN_POSITION_NAME}
                                disabled
                                readOnly
                            />
                        </FormRow>
                    </FormGroup>

                    {errorMessage && <p style={{ color: '#ef4444', fontSize: 13, margin: '16px 0 0' }}>{errorMessage}</p>}

                    <div style={{ marginTop: 24, display: 'flex', gap: 8 }}>
                        <Button
                            type="button"
                            variant="outline"
                            color="indigo"
                            size="md"
                            onClick={onClose}
                        >
                            취소
                        </Button>
                        <Button
                            type="submit"
                            color="indigo"
                            size="md"
                            disabled={isSubmitting || isOptionsLoading || !adminPosition}
                        >
                            {isSubmitting ? '생성 중...' : '생성'}
                        </Button>
                    </div>
                </form>
            </Modal.Content>
        </Modal>
    );
};