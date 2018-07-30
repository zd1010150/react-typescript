import * as _ from 'lodash';
import { ActionCreator } from 'redux';
import { Dispatch} from 'redux';
import { post } from 'store/http/httpAction';
import { LANGUAGE} from "../../config/app.config";
import {
    DEREGISTER_LOGIN_USER,
    SET_LOGIN_USER,
    TOGGLE_LANGUAGE
} from './actionTypes';
import {
    IaccountAction,
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
export const login = (values: IloginFormData, successMessage: string, cb:()=>void) => (dispatch: Dispatch<any>):  Promise<void> =>
        post('/distributor/login', values, dispatch, { successMessage }).then(({data}) => {
        debugger
        if (data && data.token && data.user) {
            const loginUser: IloginUser = {
                email: data.user.emial,
                firstName: data.user.first_name,
                lastName: data.user.last_name,
                token: data.token,
                userId: data.user.id,
            };
           dispatch(setLoginUser(loginUser));
           if(_.isFunction(cb)){
               cb()
           }
        }
    });


