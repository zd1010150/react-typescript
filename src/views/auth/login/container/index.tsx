/* tslint:disable:ordered-imports */
import { Row, Col, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import classNames from 'classnames/bind';
import { login } from 'store/global/actions';
import { IloginFormData } from 'store/global/types';
import styles from '../index.less';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from "react-router";
import LoginForm from '../components/loginForm';


const cx = classNames.bind(styles);

interface IloginForm {
    login: (formData: IloginFormData, successMessage: string, cb: ()=> void) => void
}

class Login extends React.Component <IloginForm & FormComponentProps & InjectedIntlProps & RouteComponentProps<any>> {
    public render() {
        const {formatMessage} = this.props.intl;
        return (
            <Row>
                <Col span={12}>
                    <section>
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
                    <section>
                        <div className="section-header">
                            { formatMessage({id: 'page.login.newDistributer'})}
                        </div>
                        <div className="section-content">
                            <p>{formatMessage({id: 'page.login.newDistributerAdvantage'})}</p>
                            <Button type = "primary" htmlType = "submit" className = {cx('signInBtn')}>
                                {formatMessage({id: 'page.login.createNewAccount'})}
                            </Button>
                        </div>
                    </section>
                </Col>
            </Row>

        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        login: (formData: IloginFormData, successMessage: string, cb: () => {}) => dispatch(login(formData, successMessage, cb))
    };
}
const LoginFormComponent = withRouter(connect(null, mapDispatchToProps)(injectIntl(Login)));
export default LoginFormComponent;
