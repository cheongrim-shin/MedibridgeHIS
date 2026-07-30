import axios, {type InternalAxiosRequestConfig} from 'axios';
import {reissue} from './api/auth.api.ts';
import {getStoredAccessToken, updateAccessTokenFromOutside} from './context/tokenStore.ts';

interface RetryableConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

axios.interceptors.request.use((config) => {
    const token = getStoredAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let isReissuing = false;
let waiters: Array<(token: string | null) => void> = [];

axios.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config as RetryableConfig | undefined;
        const is401 = error.response?.status === 401;
        const isReissueCallItself = originalRequest?.url?.includes('/api/auth/reissue');
        const alreadyRetried = originalRequest?._retry;

        if (!is401 || !originalRequest || isReissueCallItself || alreadyRetried) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (isReissuing) {
            return new Promise((resolve, reject) => {
                waiters.push((token) => {
                    if (token) {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(axios(originalRequest));
                    } else {
                        reject(error);
                    }
                });
            });
        }

        isReissuing = true;
        try {
            const {accessToken} = await reissue();
            updateAccessTokenFromOutside(accessToken);
            waiters.forEach((resolveWaiter) => resolveWaiter(accessToken));
            waiters = [];
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
        } catch (reissueError) {
            updateAccessTokenFromOutside(null);
            waiters.forEach((resolveWaiter) => resolveWaiter(null));
            waiters = [];
            window.location.href = '/';
            return Promise.reject(reissueError);
        } finally {
            isReissuing = false;
        }
    }
);