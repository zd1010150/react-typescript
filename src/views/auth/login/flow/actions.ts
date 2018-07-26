
// import * as _ from 'lodash';
// import { fetchLoginUserDetail } from 'src/store/global/actions';
// import { post } from 'src/store/http/httpAction';
import {
    DEREGISTER_LOGIN_USER,
   //  LOGOUT_SUCCESS,
} from './actionType';

export const deRegisterLoginUser = () => ({
    type: DEREGISTER_LOGIN_USER,
});
// const logoutSuccess = json => ({
//     type: LOGOUT_SUCCESS,
//     payload: { json },
// });

// export const tryLogin = (values, successMessage, cb) => dispatch => post('/admin/login', values, dispatch, { successMessage })
//     .then((json) => {
//         if (_.isFunction(cb)) {
//             cb();
//         }
//         if (json) {
//            // dispatch(fetchLoginUserDetail());
//         }
//     });

// export const tryLogout = successMessage => dispatch => post('/admin/logout', {}, dispatch, { successMessage }).then(() => {
//    // dispatch(logoutSuccess());
// });
export const tryLogout ={};
