import * as _ from 'lodash';
import { Dispatch } from 'redux';
import { post } from '../../../../store/http/httpAction';

import {
    ICreateAccountForm
} from './types';

export const createNewAccount = (values: ICreateAccountForm, successMessage: string, cb: () => void) => (dispatch: Dispatch<any>): Promise<void> =>
    post('/distributor/distributor-users', values, dispatch, { successMessage }).then(({ data }) => {
        if (data) {
            debugger
            if (_.isFunction(cb)) {
                cb()
            }
        }
    });

