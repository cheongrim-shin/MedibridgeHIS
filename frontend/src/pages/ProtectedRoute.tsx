import type {ReactNode} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../features/auth/context/useAuth.ts';
import {canAccessStaffRole} from '../features/auth/utils/role.mapping.ts';
import type {StaffRole} from '../pages/login/login.schema';

interface ProtectedRouteProps {
    requiredRole: StaffRole;
    children: ReactNode;
}

export const ProtectedRoute = ({requiredRole, children}: ProtectedRouteProps) => {
    const {isInitializing, isAuthenticated, user} = useAuth();
    const location = useLocation();

    if (isInitializing) {
        return <div style={{padding: 40, textAlign: 'center', color: '#64748b'}}>로그인 확인 중...</div>;
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/" replace state={{from: location}}/>;
    }

    if (!canAccessStaffRole(user.roles, requiredRole)) {
        return <Navigate to="/" replace/>;
    }

    return <>{children}</>;
};