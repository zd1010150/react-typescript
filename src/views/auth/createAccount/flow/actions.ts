import * as _ from 'lodash';
import { Dispatch } from 'redux';
import { post } from '../../../../store/http/httpAction';

import {
    ICreateAccountForm
} from './types';

export const createNewAccount = (values: ICreateAccountForm, cb: (data: any) => void) => (dispatch: Dispatch<any>): Promise<void> =>
    post('/distributor/distributor-users', values, dispatch, { needShowSuccessMsg: false }).then(({ data }) => {
        if (data) {
            if (_.isFunction(cb)) {
                cb(data)
            }
        }
    });

