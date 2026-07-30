type TokenListener = (token: string | null) => void;

let currentAccessToken: string | null = null;
let listener: TokenListener | null = null;

export const getStoredAccessToken = (): string | null => currentAccessToken;

export const registerAccessTokenUpdater = (updater: TokenListener): void => {
    listener = updater;
};

export const updateAccessTokenFromOutside = (token: string | null): void => {
    currentAccessToken = token;
    listener?.(token);
};

export const syncStoredAccessToken = (token: string | null): void => {
    currentAccessToken = token;
};