/* tslint:disable:ordered-imports */
import { Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import classNames from 'classnames/bind';
import { login } from '../../../../store/global/actions';
import { IloginFormData } from '../../../../store/global/types';
import styles from '../index.less';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from "react-router";
import LoginForm from '../components/loginForm';
import {Link} from 'react-router-dom';


const cx = classNames.bind(styles);

interface IloginForm {
    login: (formData: IloginFormData, successMessage: string, cb: (data: any)=> void) => void
}
type propTypes = IloginForm & FormComponentProps & InjectedIntlProps & RouteComponentProps<any>;
class Login extends React.Component <propTypes> {
    public render() {
        const {formatMessage} = this.props.intl;
        return (
            <Row gutter={60}>
                <Col span={12} >
                    <section className="section">
                        <div className="section-header">
                            { formatMessage({id: 'page.login.registeredDistributor'})}
                        </div>
                        <div className="section-content">
                            <p>{formatMessage({id: 'page.login.signInPropt'})}</p>
                            <LoginForm login={this.props.login}/>
                        </div>
                    </section>
                </Col>
                <Col span={12}>
                    <section className="section">
                        <div className="section-header">
                            { formatMessage({id: 'page.login.newDistributer'})}
                        </div>
                        <div className="section-content">
                            <div className="mb-xlg">{formatMessage({id: 'page.login.newDistributerAdvantage'})}</div>
                            <Link to="/auth/createNewAccount" className = { classNames('a-btn','magento-btn-big',cx('create-link-btn'))}>
                                {formatMessage({id: 'page.login.createNewAccount'})}
                            </Link>
                        </div>
                    </section>
                </Col>
            </Row>

        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        login: (formData: IloginFormData, successMessage: string, cb: (data: any) => {}) => dispatch(login(formData, successMessage, cb))
    };
}
const LoginFormComponent = withRouter(connect(null, mapDispatchToProps)(injectIntl(Login)));
export default LoginFormComponent;
