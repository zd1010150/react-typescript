
import { Form, Input} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import classNames from 'classnames/bind';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {  LANGUAGE } from '../../../../config/app.config';
import { getExistRule } from '../../../../util/validateMessagesUtil';
import styles from '../index.less';

const cx = classNames.bind(styles);

interface Iprops {
    captcha?: string,
    refresh: () => void
}
type propTypes = Iprops & FormComponentProps & InjectedIntlProps
class Captcha extends React.Component <propTypes> {
    public render() {
        const {getFieldDecorator} = this.props.form;
        const {formatMessage} = this.props.intl;
        const locale = this.props.intl.locale === 'zh' ? LANGUAGE.ZH : LANGUAGE.EN;
        return (
            <Form layout = "vertical" className = {cx('formWrapper')}>
                <div className = {cx('fieldsWrapper')}>
                <Form.Item label = {formatMessage({id: 'global.form.captcha'})} className = {cx('formItem')}>
                        {getFieldDecorator('captcha', {
                            rules: [getExistRule('required', 'captcha', locale, { required: true })],
                        })(<Input />)}
                         <div className="captacha-field">
                            <img src={this.props.captcha} alt="" onClick={this.props.refresh}/> {formatMessage({id: 'page.login.inputCaptch'})}
                         </div>
                    </Form.Item>
                </div>
            </Form>
        );
    } 

}


const CaptchaFormComponent = Form.create()(injectIntl(Captcha));
export default CaptchaFormComponent;
