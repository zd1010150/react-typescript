
import {Button, Form, Icon, Input} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import classNames from 'classnames/bind';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { sendEmail } from '../flow/actions';
import { IsendEmailFormData } from '../flow/types';
import styles from '../index.less';

const cx = classNames.bind(styles);

interface IloginFormProps {
    sendEmailDispatch: (formData: IsendEmailFormData, successMessage: string, cb: ()=> void) => void
}

class ForgetPasswordForm extends React.Component <IloginFormProps & FormComponentProps & InjectedIntlProps & RouteComponentProps<any>> {
    public render() {
        const {getFieldDecorator} = this.props.form;
        const {formatMessage} = this.props.intl;
        return (
            <Form layout = "vertical" onSubmit = {this.handleSubmit} className = {cx('formWrapper')}>
                <div className = {cx('fieldsWrapper')}>
                    <Form.Item label = "email" className = {cx('formItem')}>
                        {getFieldDecorator('email', {
                            rules: [{required: true, message: 'Please input your email!'}],
                        })(<Input suffix = {<Icon type = "user"/>} placeholder = "Email"/>)}
                    </Form.Item>
                    <Form.Item className = {cx('formItem')}>
                        <Button type = "primary" htmlType = "submit" className = {cx('signInBtn')}>
                            {formatMessage({id: 'global.ui.button.signIn'})}
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        );
    }

    private handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const me = this;
        const {formatMessage} = this.props.intl;
        const { history } = this.props;
        this.props.form.validateFields((err: any, values: object) => {
            if (!err) {
                me.props.sendEmailDispatch(values as IsendEmailFormData, formatMessage({id: 'global.info.sendEmailSuccess'}), () => {
                    history.replace("/auth/login");
                });
            }
        });
    }
}



const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        sendEmailDispatch: (formData: IsendEmailFormData, successMessage: string, cb: () => {}) => dispatch(sendEmail(formData, successMessage, cb))
    };
}
const ForgetPasswordFormComponent = withRouter(connect(null, mapDispatchToProps)(injectIntl(ForgetPasswordForm)));
export default ForgetPasswordFormComponent;
