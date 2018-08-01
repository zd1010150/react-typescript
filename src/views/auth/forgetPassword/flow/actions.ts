import * as _ from 'lodash';
import { Dispatch } from "redux";
import { post } from "store/http/httpAction";
import { IsendEmailFormData } from "./types";





  export const sendEmail = (values: IsendEmailFormData, successMessage: string, cb: () => void)=> (dispatch: Dispatch<any>): Promise<void> =>
  post('/distributor/password/email', values, dispatch, { successMessage }).then(({ data }) => {
      if (data) {
         if (_.isFunction(cb)) {
              cb()
          }
      }
  });
