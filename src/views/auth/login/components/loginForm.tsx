
import {Button, Form, Input, notification } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import classNames from 'classnames/bind';
import { LANGUAGE} from 'config/app.config'
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { getExistRule } from 'util/validateMessagesUtil';
import { IloginFormData } from '../../../../store/global/types';
import styles from '../index.less';

const cx = classNames.bind(styles);

interface IloginFormProps {
    login: (formData: IloginFormData,  cb: (data: any)=> void) => void,
    
}
interface IloginFormState { 
    captcha: string,
}
type propTypes = IloginFormProps & FormComponentProps & InjectedIntlProps & RouteComponentProps<any>
class LoginForm extends React.Component <propTypes> {
    public state: IloginFormState = {
        captcha: ''
    }
    
    public render() {
        const {getFieldDecorator} = this.props.form;
        const {formatMessage, locale} = this.props.intl;
        const tlocale = locale === 'zh' ? LANGUAGE.ZH : LANGUAGE.EN;
        const captchEl = this.state.captcha.length > 0 ? (
            <Form.Item label = {formatMessage({id: 'global.form.captcha'})} className = {cx('formItem')}>
                        {getFieldDecorator('captcha', {
                            rules: [getExistRule('required', 'captcha', tlocale, { required: true })],
                        })(<Input />)}
                         <div className="captacha-field"><img src={this.state.captcha} alt="" onClick={this.clickRefresh}/> {formatMessage({id: 'page.login.inputCaptch'})}</div>
                    </Form.Item>
        ): '';
        return (
            <Form layout = "vertical" onSubmit = {this.handleSubmit} className = {cx('formWrapper')}>
                <div>
                    <Form.Item label = {formatMessage({id: 'global.form.email'})} className = {cx('formItem')}>
                        {getFieldDecorator('email', {
                            rules: [getExistRule('required', 'email', tlocale, { required: true })],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label = {formatMessage({id: 'global.form.password'})} className = {cx('formItem')}>
                        {getFieldDecorator('password', {
                            rules: [getExistRule('required', 'password', tlocale, { required: true })],
                        })(<Input type = "password"/>)}
                         <Link to='/auth/forgetPassword' className={cx("foget-pwd-link")}>{formatMessage({id: 'page.login.forgetPassword'})}</Link>
                    </Form.Item>
                    {
                        captchEl
                    }
                    <Form.Item className = {cx('formItem')}>
                        <Button type = "primary" htmlType = "submit" className = { classNames('magento-btn-big',cx('signInBtn'))}>
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
                me.props.login(values as IloginFormData, (data) => {
                    if(data.captcha){
                        me.setState({
                            captcha: data.captcha
                        })
                    }else{
                        notification.success({ 
                            description: '',
                            message: formatMessage({id: 'global.info.loginSuccess'})
                        });    
                    history.replace("/dashboard");    
                    }
                });
            }
        });
    }
    private clickRefresh = ()=> {
        const {login, form, } = this.props;
        login(form.getFieldsValue() as IloginFormData, (data) => {
            this.setState({
                captcha: data.captcha
            })
        });
    }
}


const LoginFormComponent = withRouter(Form.create()(injectIntl(LoginForm)));
export default LoginFormComponent;
