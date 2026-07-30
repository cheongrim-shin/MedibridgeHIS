/**
 * AuthProvider 컴포넌트만
 */

import {useCallback, useEffect, useMemo, useState, type ReactNode} from 'react';
import * as authApi from '../api/auth.api.ts';
import {decodeAccessToken} from '../utils/jwt.util.ts';
import {normalizeRoles} from '../utils/role.mapping.ts';
import {AuthContext, type AuthUser} from './useAuth.ts';
import {registerAccessTokenUpdater, syncStoredAccessToken} from './tokenStore.ts';


const buildUser = (token: string): AuthUser | null => {
    const payload = decodeAccessToken(token);
    if (!payload) {
        return null;
    }
    return {
        memberId: payload.sub,
        roles: normalizeRoles(payload.roles ?? []),
    };
};

export function AuthProvider({children}: { children: ReactNode }) {
    const [accessToken, setAccessTokenState] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);

    const user = useMemo(() => (accessToken ? buildUser(accessToken) : null), [accessToken]);

    const setAccessToken = useCallback((token: string | null) => {
        setAccessTokenState(token);
    }, []);

    const login = useCallback(async (memberId: string, password: string) => {
        const {accessToken: token} = await authApi.login({memberId, password});
        setAccessTokenState(token);
    }, []);

    const logout = useCallback(async () => {
        try {
            await authApi.logout();
        } catch {
            // 실패해도 무시 - 서버 쪽 refreshToken은 재발급 시도 시 어차피 걸러짐
        } finally {
            setAccessTokenState(null);
        }
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const {accessToken: token} = await authApi.reissue();
                setAccessTokenState(token);
            } catch {
                // 비로그인 상태로 시작 (정상 흐름)
            } finally {
                setIsInitializing(false);
            }
        })();
    }, []);

    useEffect(() => {
        registerAccessTokenUpdater((token) => {
            setAccessTokenState(token);
        });
    }, []);

    useEffect(() => {
        syncStoredAccessToken(accessToken);
    }, [accessToken]);


    const value = {
        accessToken,
        user,
        isAuthenticated: !!accessToken,
        isInitializing,
        login,
        logout,
        setAccessToken,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}