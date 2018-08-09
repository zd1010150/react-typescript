import * as _ from 'lodash';
import { ActionCreator } from 'redux';
import { Dispatch } from 'redux';
import { LANGUAGE } from "../../config/app.config";
import { get, post } from '../http/httpAction';
import {
    DEREGISTER_LOGIN_USER,
    SET_GLOBAL_SETTING,
    SET_LOGIN_USER,
    TOGGLE_LANGUAGE
} from './actionTypes';
import {
    IaccountAction,
    Iglobalsetting,
    IglobalsettingAction,
    IlanguageAction,
    IloginFormData,
    IloginUser,
} from './types';


// Type these action creators with `: ActionCreator<ActionTypeYouWantToPass>`.
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly.
export const deRegisterLoginUser = () => ({
    type: DEREGISTER_LOGIN_USER,
});

export const toggleLanguage: ActionCreator<IlanguageAction> = (language: LANGUAGE) => ({
    language,
    type: TOGGLE_LANGUAGE,
});

export const setLoginUser: ActionCreator<IaccountAction> = (
    account: IloginUser
) => ({
    account,
    type: SET_LOGIN_USER,
});
export const setGlobalSetting: ActionCreator<IglobalsettingAction> = (settings: Iglobalsetting) => ({
    settings,
    type: SET_GLOBAL_SETTING,
});
export const login = (values: IloginFormData, successMessage: string, cb: (data:any) => void) => (dispatch: Dispatch<any>): Promise<void> =>
    post('/distributor/login', values, dispatch, { successMessage }).then(({ data }) => {
        if (data && data.token && data.user) {
            const loginUser: IloginUser = {
                email: data.user.emial,
                firstName: data.user.first_name,
                lastName: data.user.last_name,
                token: data.token,
                userId: data.user.id,
            };
            dispatch(setLoginUser(loginUser));
            if (_.isFunction(cb)) {
                cb(data)
            }
        }else if(data && data.captcha){
            if (_.isFunction(cb)) {
                cb(data)
            }
        }
    });
export const fetchGlobalSettingAuth = () => (dispatch: Dispatch<any>): Promise<void> =>
    get('/distributor/global-settings-auth', {}, dispatch, ).then(({ data }) => {
        if (data) {
            dispatch(setGlobalSetting(data));
        }
    });
export const fetchGlobalSetting = () => (dispatch: Dispatch<any>): Promise<void> =>
get('/distributor/global-settings', {}, dispatch, ).then(({ data }) => {
    if (data) {
        dispatch(setGlobalSetting(data));
    }
});

