

import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ForgetPwdForm from '../components/form';
import { sendEmail } from '../flow/actions';
import { IsendEmailFormData } from '../flow/types';


interface IloginFormProps {
    sendEmailDispatch: (formData: IsendEmailFormData, successMessage: string, cb: ()=> void) => void
}

class ForgetPassword extends React.Component <IloginFormProps> {
    public render() {
        return (
            <div>
            <ForgetPwdForm sendEmailDispatch={this.props.sendEmailDispatch} />
            </div>
        );
    }

   
}



const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        sendEmailDispatch: (formData: IsendEmailFormData, successMessage: string, cb: () => {}) => dispatch(sendEmail(formData, successMessage, cb))
    };
}
const ForgetPasswordComponent = connect(null, mapDispatchToProps)(ForgetPassword);
export default ForgetPasswordComponent;
