import { combineReducers } from 'redux';
import { SET_ACCOUNT_IMFORMATION} from './actionTypes';
import { IaccountAction, IaccountInfo } from "./types"; 



const initAccount = {
  id: -1,
  // tslint:disable-next-line:object-literal-sort-keys
  company: '',
  abn: '',
  first_name: '',
  last_name: '',
  phone: '',
  contact_email: '',
  email: '',
  position_id: 1,
  position_name: '',
}
const account = (state: IaccountInfo = initAccount, action: IaccountAction) => {
  switch (action.type) {
    case SET_ACCOUNT_IMFORMATION:
      return action.account;
    default:
      return state;
  }
};

export default combineReducers({ account });
