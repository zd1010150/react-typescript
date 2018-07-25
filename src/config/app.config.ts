export const MAX_FETCH_TIMEOUT = 300 * 1000; // 超时时间为30s
export const UNAUTHENTICATION = { // Unauthentication rewrite url
    CODE: 401,
    LOGIN_URL: '/',
    REDIRECT_KEY: 'success_url',
};
export const SUCCESS_HTTP_CODE = [200, 201];