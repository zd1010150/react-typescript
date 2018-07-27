export const MAX_FETCH_TIMEOUT = 300 * 1000; // 超时时间为30s
export const UNAUTHENTICATION = { // Unauthentication rewrite url
    CODE: 401,
    LOGIN_URL: '/',
    REDIRECT_KEY: 'success_url',
};
export const SUCCESS_HTTP_CODE = [200, 201];
export interface Iaction{
    type: string
}
export const enum LANGUAGE {
    ZH = "zh",
    EN = "en"
}
export const enum localStorageKeys{
    loginUser='loginUser',
    language='language',
}
