import { Button } from 'antd';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from 'redux';
import { IantFormValidateResult, IApplicationState } from 'store/types';
import PasswordForm, { passwordFormStatus } from 'views/auth/createAccount/components/passwordForm';
import { sendEmail } from '../flow/actions'
import { IsendEmailFormData } from '../flow/types'


export interface Iprops {
    sendEmailDispatch: (formData: IresetPwdFormData, successMessage: string, cb: ()=> void)=>void
}

type IcreateAccountProps = Iprops  & InjectedIntlProps & RouteComponentProps<any>;

export class EditAccount extends React.Component <IcreateAccountProps, {}> {
    
    private passwordForm:any;
    
    public render() {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <h3 className="section-title">{ formatMessage({ id: 'page.accountInfo.changePwd'}) }</h3>
                <PasswordForm editStatus={passwordFormStatus.modifyPassword} ref={c => this.passwordForm=c}/>
                <Button onClick={this.createNewAccount}>{formatMessage({ id: 'global.ui.button.createNewAccount'})}</Button>
            </div>
        )
    }
    private createNewAccount = async() => {
        const { updatePwdDispatch, intl, history} = this.props;
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
            if(validateResult){
                const postData: IsendEmailFormData = {
                    old_password: passwordForm.data.old_password,
                    password: passwordForm.data.password
                }
                updatePwdDispatch(postData, intl.formatMessage({id: 'global.info.createNewAccountSuccess'}), ()=>{
                    history.replace('/auth/login')
                })
            }
        })
    }
}
const mapStateToProps = (state: IApplicationState) =>  ({ positions: state.global.settings.positions });
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        sendEmailDispatch: (formData: IsendEmailFormData, successMessage: string, cb: () => {}) => dispatch(sendEmail(formData, successMessage, cb))
    };
}
const EditAccountComponent= withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(EditAccount)));
export default EditAccountComponent;