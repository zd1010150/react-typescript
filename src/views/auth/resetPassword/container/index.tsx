import { Button } from 'antd';
import queryString from 'query-string';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from 'redux';
import { IantFormValidateResult } from '../../../../store/types';
import PasswordForm, { passwordFormStatus } from '../../createAccount/components/passwordForm';
import { resetPwd } from '../flow/actions'
import { IresetPasswordFormData } from '../flow/types'

export interface Iprops {
    resetPwdDispatch: (formData: IresetPasswordFormData, successMessage: string, cb: ()=> void)=>void
}

type IcreateAccountProps = Iprops  & InjectedIntlProps & RouteComponentProps<any>;

export class ResetPassword extends React.Component <IcreateAccountProps, {}> {
    
    private passwordForm:any;
    
    public render() {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <PasswordForm editStatus={passwordFormStatus.resetPassword} ref={c => this.passwordForm=c}/>
                <Button onClick={this.createNewAccount}>{formatMessage({ id: 'global.ui.button.save'})}</Button>
            </div>
        )
    }
    private createNewAccount = async() => {
        const { resetPwdDispatch, intl, history, location} = this.props;
        const params = queryString.parse(location.search);
        const getPromiseWrapper = (form: any ) => new Promise((resolve) => {
            form.validateFieldsAndScroll((err: any, values: object) => {
                resolve({
                    data: values,
                    validate: !err, 
                });
              });
        });
        getPromiseWrapper(this.passwordForm).then((passwordForm: IantFormValidateResult)=>{
            const {password_confirmation, password} = passwordForm.data;
            const validateResult = passwordForm.validate && (password === password_confirmation);
            const {email, token} = params; 
            if(validateResult){
                const postData: IresetPasswordFormData = {
                    email, 
                    password: passwordForm.data.password,
                    password_confirmation: passwordForm.data.password_confirmation,
                    token,
                }
                resetPwdDispatch(postData, intl.formatMessage({id: 'global.info.resetPasswordSuccess'}), ()=>{
                    history.replace('/auth/login')
                })
            }
        })
    }
}
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        resetPwdDispatch: (formData: IresetPasswordFormData, successMessage: string, cb: () => {}) => dispatch(resetPwd(formData, successMessage, cb))
    };
}
const ResetPasswordComponent= withRouter(connect(null, mapDispatchToProps)(injectIntl(ResetPassword)));
export default ResetPasswordComponent;