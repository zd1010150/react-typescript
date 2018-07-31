import * as _ from 'lodash';
import { localStorageKeys } from '../config/app.config'
import { IloginUser } from '../store/global/types';
import { getStore } from './localStorage';
/**
 * getAuthorization
 */

export const getAuthorization = () => {
  const loginUser: string | null | undefined = getStore(localStorageKeys.loginUser as string);
  if (_.isEmpty(loginUser)) {
    return '';
  }
  const user: IloginUser= JSON.parse(loginUser || '');
  if (_.isEmpty(user.token)) {
    return '';
  }
  const { token = '' } = user;
  return `${token}`;
};

