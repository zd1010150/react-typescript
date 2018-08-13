import * as _ from 'lodash';
import { Dispatch } from "redux";
import { post } from "../../../../store/http/httpAction";
import { IresetPasswordFormData } from "./types";



  export const resetPwd = (values: IresetPasswordFormData, successMessage: string, cb: () => void)=> (dispatch: Dispatch<any>): Promise<void> =>
  post('/distributor/password/reset', values, dispatch, { successMessage }).then(({ data }) => {
      if (data) {
          if (_.isFunction(cb)) {
              cb()
          }
      }
  });
