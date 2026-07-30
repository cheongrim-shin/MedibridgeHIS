import type {MouseEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/useAuth.ts';

export const useLogoutHandler = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();

    return async (e: MouseEvent) => {
        e.preventDefault();
        await logout();
        navigate('/', {replace: true});
    };
};