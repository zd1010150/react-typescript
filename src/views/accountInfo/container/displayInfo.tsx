
import { Col, Row } from 'antd';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { IApplicationState } from '../../../store/types';
import { getDetail } from '../flow/actions';
import { CHANGE_PWD, EDIT_INFO } from '../flow/pageActions';
import { IaccountInfo } from '../flow/types';

export interface Iprops {
    accountInfo: IaccountInfo,
    getDetailDispatch: () => void
}

type propType = Iprops  & InjectedIntlProps;

export class DispalyInfo extends React.Component <propType, {}> {
    
    public componentDidMount(){
        this.props.getDetailDispatch()
    }
    public render() {
        const { formatMessage } = this.props.intl;
        const {accountInfo} = this.props;
        return (
            <div>
                <h3 className="section-title first-section-title">{ formatMessage({ id: 'page.accountInfo.accountInformation'}) }</h3>
                <Row className="one-row" gutter={20}>
                    <Col span={3} className="text-left"> { formatMessage({id: 'global.form.lastName'})}: </Col>
                    <Col span={21} className="font-bold">{ accountInfo.last_name}</Col>
                    
                </Row>
                <Row className="one-row" gutter={20}>
                    <Col span={3} className="text-left"> { formatMessage({id: 'global.form.firstName'})}: </Col>
                    <Col span={21} className="font-bold">{ accountInfo.first_name}</Col>
                </Row>
                <Row className="one-row" gutter={20}>
                    <Col span={3} className="text-left"> { formatMessage({id: 'global.form.phone'})} :</Col>
                    <Col span={21} className="font-bold">{ accountInfo.phone}</Col>
                    
                </Row>
                <Row className="one-row" gutter={20}>
                    <Col span={3} className="text-left"> { formatMessage({id: 'global.form.contactEmail'})} :</Col>
                    <Col span={21} className="font-bold">{ accountInfo.contact_email}</Col>
                    
                </Row>
                <Row className="one-row" gutter={20}>
                    <Col span={3} className="text-left"> { formatMessage({id: 'global.form.abn'})}: </Col>
                    <Col span={21} className="font-bold">{ accountInfo.abn || ''}</Col>
                    
                </Row>
                <Row className="one-row" gutter={20}>
                    <Col span={3} className="text-left"> { formatMessage({id: 'global.form.position'})}: </Col>
                    <Col span={21} className="font-bold">{ accountInfo.position_name}</Col>
                </Row>
                <Row className="one-row" gutter={20}>
                    <Col span={3} className="text-left"> { formatMessage({id: 'global.form.loginEmail'})}: </Col>
                    <Col span={21} className="font-bold">{ accountInfo.email}</Col>
                </Row>
                <Row className="mt-xlg">
                    <Col span={24} >
                        <Link to={`/dashboard?action=${EDIT_INFO }`} className="pr-lg">{ formatMessage({ id: 'global.ui.button.edit'}) }</Link> | 
                        <Link to={`/dashboard?action=${CHANGE_PWD }`} className="pl-lg">{ formatMessage({ id: 'global.ui.button.changePwd'}) }</Link>
                    </Col>
                </Row>
            </div>
        )
    }
   
}
const mapStateToProps = (state: IApplicationState) =>  ({ accountInfo: state.accountInfo.account });
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getDetailDispatch: () => dispatch(getDetail())
    };
}
const EditAccountComponent= connect(mapStateToProps, mapDispatchToProps)(injectIntl(DispalyInfo));
export default EditAccountComponent;