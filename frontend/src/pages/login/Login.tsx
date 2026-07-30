// src/pages/login/Login.tsx

import {useEffect, useState, type FormEvent} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from './Login.module.css';
import {useAuth} from '../../features/auth/context/useAuth.ts';
import {getRedirectPathAfterLogin} from '../../features/auth/utils/role.mapping.ts';

// 회원가입 화면과 동일한 공용 컴포넌트로 통일
import {Input} from '../../components/Input';
import {FormGroup} from '../../components/FormGroup';
import {FormRow} from '../../components/FormRow';
import {Button} from '../../components/ui/Button';

export const Login = () => {
    const navigate = useNavigate();
    const {login, isAuthenticated, isInitializing, user} = useAuth();

    const [memberId, setMemberId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 이미 로그인된 상태면(새로고침 시 reissue로 복구된 경우 포함) 폼 볼 필요 없이 바로 이동
    useEffect(() => {
        if (!isInitializing && isAuthenticated && user) {
            navigate(getRedirectPathAfterLogin(user.roles), {replace: true});
        }
    }, [isInitializing, isAuthenticated, user, navigate]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setIsSubmitting(true);
        try {
            await login(memberId, password);
            // 로그인 성공 후 이동은 위 useEffect가 user 갱신을 감지해서 처리함
        } catch {
            setErrorMessage('사번 또는 비밀번호가 올바르지 않습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <div className={styles.loginFormColumn}>
                    <div className={styles.logoSection}>
                        <div className={styles.logoHeader}>
                            <h1 className={styles.logoTitle}>Medi<span>Bridge</span> HIS</h1>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <FormGroup size="lg">
                            <FormRow columns={1}>
                                <Input
                                    label="사번 (Staff ID)"
                                    size="lg"
                                    color="teal"
                                    placeholder="사번 입력"
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
                                    placeholder="비밀번호 입력"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                />
                            </FormRow>
                        </FormGroup>

                        {errorMessage && (
                            <p style={{color: '#e53e3e', fontSize: 14, margin: '16px 0 0'}}>
                                {errorMessage}
                            </p>
                        )}

                        <div style={{marginTop: 50}}>
                            <Button type="submit" color="teal" width="full" disabled={isSubmitting} size="lg">
                                {isSubmitting ? '로그인 중...' : '로그인'}
                            </Button>
                        </div>

                        <p style={{textAlign: 'center', fontSize: 13, color: '#64748b', marginTop: 16}}>
                            계정이 없으신가요?{' '}
                            <Link to="/signup" style={{color: '#0d9488', fontWeight: 600}}>
                                회원가입
                            </Link>
                        </p>
                    </form>

                    <div className={styles.footerText}>
                        © 2026 MediBridge Inc. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
};