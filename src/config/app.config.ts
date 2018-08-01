export const MAX_FETCH_TIMEOUT = 300 * 1000; // 超时时间为30s
export const UNAUTHENTICATION = { // Unauthentication rewrite url
    CODE: 401,
    LOGIN_URL: '/',
    REDIRECT_KEY: 'success_url',
};
export const SUCCESS_HTTP_CODE = [200, 201];
export interface Iaction{
    type: string | symbol
}
export const enum LANGUAGE {
    ZH = "zh",
    EN = "en"
}
export const enum localStorageKeys{
    loginUser='loginUser',
    language='language',
}
export const  NAV_URL_PAGE_MAPPING = {
    '/dashboard': 'global.pageTitle.myDashboard',
    '/enquiry': 'global.pageTitle.enquiry'
}
export const UN_NAV_URL_PAGE_MAPPING = {
    '/auth/createNewAccount': 'global.pageTitle.createNewAccount',
    '/auth/forgetPassword': 'global.pageTitle.forgetPassword',
    '/auth/login' : 'global.pageTitle.signIn',
    '/auth/resetPassword': 'global.pageTitle.resetPassword'
}
export const FORM_LAYOUT_CONFIG = {
    labelCol: {

      sm: { span: 6, offset: 2 },
      xs: { span: 24 },
    },
    wrapperCol: {
     sm: { span: 8 },
      xs: { span: 24 },
    },
  };
