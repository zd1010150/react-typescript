import * as _ from 'lodash';
import { Dispatch} from 'redux';
import { setLoginUser } from 'store/global/actions';
import { IloginUser } from 'store/global/types'
import { post } from 'store/http/httpAction';
import {
    DEREGISTER_LOGIN_USER,
   //  LOGOUT_SUCCESS,
} from './actionType';
import { IloginFormData } from './types';
export const deRegisterLoginUser = () => ({
    type: DEREGISTER_LOGIN_USER,
});
// const logoutSuccess = json => ({
//     type: LOGOUT_SUCCESS,
//     payload: { json },
// });

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

// export const tryLogout = successMessage => dispatch => post('/admin/logout', {}, dispatch, { successMessage }).then(() => {
//    // dispatch(logoutSuccess());
// });
export const tryLogout ={};
