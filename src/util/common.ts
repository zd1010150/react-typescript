import * as _ from 'lodash';
import * as Enums from './EnumsManager';
import { getStore } from './localStorage';
/**
 * getAuthorization
 */
interface IloginUser {
    token_type: string,
    access_token: string,
    token_info: string,
}
export const getAuthorization = () => {
  const loginUser: string | null | undefined = getStore(Enums.LocalStorageKey);
  if (_.isEmpty(loginUser)) {
    return '';
  }
  const user: IloginUser | null | undefined | string= JSON.parse(loginUser || '');
  if (_.isEmpty(user.token_info)) {
    return '';
  }
  const { token_type, access_token } = user;
  return `${token_type} ${access_token}`;
};

