
import { getStore, removeStore, setStore } from 'src/util/localStorage';
import { DEREGISTER_LOGIN_USER, LOGIN_SUCCESS, LOGINOROUT_FAILURE, LOGOUT_SUCCESS } from './actionType';
interface Iloginuser extends  Iaction{
    payload: any,
}

const initialState = getStore(localStorageKeys.loginUser as string)
    ? JSON.parse(getStore(localStorageKeys.loginUser as string))
    : {};

const loginUser = (state = initialState, action: Iloginuser) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            const { data: userData } = action.payload;
            setStore(localStorageKeys.loginUser, userData);
            return userData;
        case LOGOUT_SUCCESS:
        case LOGINOROUT_FAILURE:
        case DEREGISTER_LOGIN_USER:
            removeStore(localStorageKeys.loginUser);
            return {};
        default:
            return state;
    }
};

export default loginUser;
