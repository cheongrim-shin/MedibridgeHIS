import {useEffect, useState, type FormEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from './Signup.module.css';
import {getDepartments, getPositions, signup} from '../../features/member/api/member.api';
import type {Department, Position} from '../../features/member/api/member.types';

// 공용 컴포넌트
import {Input} from '../../components/Input';
import {Select} from '../../components/Select';
import {FormGroup} from '../../components/FormGroup';
import {FormRow} from '../../components/FormRow';
import {Button} from '../../components/ui/Button';

export const Signup = () => {
    const navigate = useNavigate();

    // 가입 폼 입력값
    const [memberId, setMemberId] = useState('');
    const [password, setPassword] = useState('');
    const [memberName, setMemberName] = useState('');
    const [departmentCode, setDepartmentCode] = useState('');
    const [positionCode, setPositionCode] = useState('');

    // 드롭다운 목록 (마운트 시 API로 채움)
    const [departments, setDepartments] = useState<Department[]>([]);
    const [positions, setPositions] = useState<Position[]>([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 마운트 시 부서/직책 목록 조회 (실패해도 폼 자체는 쓸 수 있게 개별 처리)
    useEffect(() => {
        getDepartments().then(setDepartments).catch(() => setErrorMessage('부서 목록을 불러오지 못했습니다.'));
        getPositions().then(setPositions).catch(() => setErrorMessage('직책 목록을 불러오지 못했습니다.'));
    }, []);

    // 회원가입 처리 핸들러
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setIsSubmitting(true);
        try {
            await signup({memberId, password, memberName, departmentCode, positionCode});
            alert('회원가입이 완료되었습니다. 로그인해주세요.');
            navigate('/', {replace: true});
        } catch (err) {
            // 서버가 400 + { message }로 검증 실패 사유를 내려줌 (아이디 중복 / 비밀번호 길이 / 잘못된 직책코드)
            if (axios.isAxiosError(err) && err.response?.status === 400) {
                setErrorMessage(err.response.data?.message ?? '입력값을 확인해주세요.');
            } else {
                setErrorMessage('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.signupContainer}>
            <div className={styles.signupCard}>
                <div className={styles.logoSection}>
                    <div className={styles.logoHeader}>
                        <h1 className={styles.logoTitle}>Medi<span>Bridge</span> HIS</h1>
                    </div>
                    <p className={styles.pageSubtitle}>회원가입</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <FormGroup size="lg">
                        <FormRow columns={1}>
                            <Input
                                label="아이디 (Staff ID)"
                                size="lg"
                                color="teal"
                                placeholder="아이디 입력"
                                value={memberId}
                                onChange={(e) => setMemberId(e.target.value)}
                                autoComplete="username"
                                required
                            />
                        </FormRow>

                        <FormRow columns={1}>
                            <Input
                                label="비밀번호 (Password)"
                                type="password"
                                size="lg"
                                color="teal"
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
                                size="lg"
                                color="teal"
                                placeholder="이름 입력"
                                value={memberName}
                                onChange={(e) => setMemberName(e.target.value)}
                                autoComplete="name"
                                required
                            />
                        </FormRow>

                        <FormRow columns={2} gap="md">
                            <Select
                                label="부서"
                                size="lg"
                                color="teal"
                                value={departmentCode}
                                onChange={(e) => setDepartmentCode(e.target.value)}
                                required
                            >
                                <option value="">부서 선택</option>
                                {departments.map((d) => (
                                    <option key={d.departmentCode} value={d.departmentCode}>
                                        {d.departmentName}
                                    </option>
                                ))}
                            </Select>

                            <Select
                                label="직책"
                                size="lg"
                                color="teal"
                                value={positionCode}
                                onChange={(e) => setPositionCode(e.target.value)}
                                required
                            >
                                <option value="">직책 선택</option>
                                {positions.map((p) => (
                                    <option key={p.positionCode} value={p.positionCode}>
                                        {p.positionName}
                                    </option>
                                ))}
                            </Select>
                        </FormRow>
                    </FormGroup>

                    {errorMessage && (
                        <p style={{color: '#e53e3e', fontSize: 14, margin: '16px 0 0'}}>
                            {errorMessage}
                        </p>
                    )}

                    <div style={{marginTop: 50}}>
                        <Button type="submit" color="teal" width="full" disabled={isSubmitting} size="lg">
                            {isSubmitting ? '가입 처리 중...' : '가입하기'}
                        </Button>
                    </div>
                </form>

                <div className={styles.footerText}>
                    © 2026 MediBridge Inc. All rights reserved.
                </div>
            </div>
        </div>
    );
};