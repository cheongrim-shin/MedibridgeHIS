/**
 * AuthContext 객체 + useAuth 훅 (컴포넌트 아닌 것들)
 */

import {createContext, useContext} from 'react';
import type {BackendRole} from '../utils/role.mapping.ts';

export interface AuthUser {
    memberId: string;
    roles: BackendRole[];
}

export interface AuthContextValue {
    accessToken: string | null;
    user: AuthUser | null;
    isAuthenticated: boolean;
    isInitializing: boolean;
    login: (memberId: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    setAccessToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.');
    }
    return ctx;
}