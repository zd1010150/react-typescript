
import { Form, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import classNames from 'classnames/bind';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { formStatus } from 'store/types';
import {IaccountInfo} from 'views/accountInfo/flow/types';
import { FORM_LAYOUT_CONFIG, LANGUAGE } from '../../../../config/app.config';
import { Iposition } from '../../../../store/global/types';
import { getExistRule, validator } from '../../../../util/validateMessagesUtil';
import styles from '../index.less';


const cx = classNames.bind(styles);


interface IProps {
    editStatus?: formStatus,
    editObject?: IaccountInfo,
    positions: Iposition[]
}
type propsTypes = IProps & FormComponentProps & InjectedIntlProps;




class ContactPersonForm extends React.Component<propsTypes> {
   
    public render() {
        const { editObject } = this.props;
        const { intl, positions } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { formatMessage } = intl;
        const locale = intl.locale === 'zh' ? LANGUAGE.ZH : LANGUAGE.EN;
        const isEdting = this.props.editStatus === formStatus.edit; // editing then disabled the input 
        const isRequired = !isEdting;
        const positionDefaultId = (positions[0] && positions[0].id) || '';
        const positionRule = isRequired ? [getExistRule('required', 'position', locale, { required: true })]: [];
        return (
            <Form layout="vertical" className={cx('formWrapper')}>
                <div className={cx('fieldsWrapper')}>
                    <Form.Item  {...FORM_LAYOUT_CONFIG} label={formatMessage({ id: 'global.form.lastName' })} className={cx('formItem')}>
                        {getFieldDecorator('last_name', {
                            initialValue: isEdting? (editObject ? editObject.last_name : '') : '',
                            rules: [
                                isRequired ? getExistRule('required', 'lastName', locale, { required: true }) : {},
                            ],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item  {...FORM_LAYOUT_CONFIG} label={formatMessage({ id: 'global.form.firstName' })} className={cx('formItem')}>
                        {getFieldDecorator('first_name', {
                            initialValue: isEdting? (editObject ? editObject.first_name : '') : '',
                            rules: [
                                isRequired ? getExistRule('required', 'firstName', locale, { required: true }) : {},
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item
                        {...FORM_LAYOUT_CONFIG}
                        label={formatMessage({ id: 'global.form.phone' })}
                        className={cx('formItem')}
                    >
                        {
                            getFieldDecorator('phone', {
                                initialValue: isEdting? (editObject ? editObject.phone : '') : '',
                                rules: [
                                    isRequired ? getExistRule('required', 'phone', locale, { required: true }): {},
                                    {
                                        validator: validator.phone(locale),
                                    }],
                            })(<Input />)}
                    </Form.Item>
                    <Form.Item
                        {...FORM_LAYOUT_CONFIG}
                        label={formatMessage({ id: 'global.form.contactEmail' })}
                        className={cx('formItem')}
                    >
                        {
                            getFieldDecorator('contact_email', {
                                initialValue: isEdting? (editObject ? editObject.contact_email : '') : '',
                                rules: [
                                    isRequired ? getExistRule('required', 'contactEmail', locale, { required: true }) : {},
                                    getExistRule('email', 'contactEmail', locale),
                                ],
                            })(<Input />)}
                    </Form.Item>
                    <Form.Item  {...FORM_LAYOUT_CONFIG} label={formatMessage({ id: 'global.form.position' })} className={cx('formItem')}>
                        {
                            getFieldDecorator('position_id', {
                                initialValue: isEdting? (editObject ? editObject.position_id : positionDefaultId) : positionDefaultId,
                                rules: positionRule
                            })(<Select>
                                {positions.map(item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)}
                            </Select>)
                        }
                    </Form.Item>
                </div>
            </Form>
        );
    }

}


const ContactPersonFormComponent = Form.create()(injectIntl(ContactPersonForm));
export default ContactPersonFormComponent;
