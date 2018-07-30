
import {Button, Form, Icon, Input} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import classNames from 'classnames/bind';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from "react-router";
import { NavLink } from 'react-router-dom';
import { IloginFormData } from 'store/global/types';
import styles from '../index.less';


const cx = classNames.bind(styles);

interface IloginFormProps {
    login: (formData: IloginFormData, successMessage: string, cb: ()=> void) => void
}

class LoginForm extends React.Component <IloginFormProps & FormComponentProps & InjectedIntlProps & RouteComponentProps<any>> {
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
                    <Form.Item label = "password" className = {cx('formItem')}>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(<Input suffix = {<Icon type = "lock"/>} type = "password" placeholder = "Password"/>)}
                    </Form.Item>
                    <Form.Item className = {cx('formItem')}>
                        <Button type = "primary" htmlType = "submit" className = {cx('signInBtn')}>
                            {formatMessage({id: 'global.ui.button.signIn'})}
                        </Button>
                        <NavLink to='/auth/forgetpassword'>{formatMessage({id: 'page.login.forgetPassword'})}</NavLink>
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
                me.props.login(values as IloginFormData, formatMessage({id: 'global.info.loginSuccess'}), () => {
                    history.replace("/dashboard");
                });
            }
        });
    }
}


const LoginFormComponent = withRouter(Form.create()(injectIntl(LoginForm)));
export default LoginFormComponent;
