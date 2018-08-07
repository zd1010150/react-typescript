import classNames from 'classnames/bind';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router";
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { LANGUAGE } from "../../config/app.config";
import { deRegisterLoginUser, fetchGlobalSettingAuth, toggleLanguage } from '../../store/global/actions';
import { IloginUser} from '../../store/global/types';
import { IApplicationState} from '../../store/types';
import {
    AccountMainContentComponent,
    Logo,
    PageTitle,
    TopPanel
} from '../page/index';
import * as styles from './index.less';

interface Iprops{
    locale: LANGUAGE;
    account: IloginUser;
    changeLanugage:  (language: LANGUAGE) => void,
    deRegisterLoginUserDispatch: () => void,
    fetchGlobalSettingAuthDispatch: ()=>void
}
const cx = classNames.bind(styles);
type propTypes = Iprops & RouteComponentProps<any>;
class AccountLayout extends React.Component<propTypes>{
    public componentDidMount() {
        this.props.fetchGlobalSettingAuthDispatch();
    }
    public render() {
        const { locale, account, changeLanugage, deRegisterLoginUserDispatch } = this.props;
        return (
            <div className="page-wrapper">
                <header className="page-header">
                    <div className="panel wrapper">
                        <TopPanel account={account} language={locale} onChange={changeLanugage} deRegisterLoginUserDispatch={deRegisterLoginUserDispatch} />
                    </div>
                </header>
                <div className={classNames("section",cx("nav-sections"))}>
                    <Logo language={locale}/>
                </div>
                <main id="maincontent" className={cx("page-main")}>
                    <PageTitle/>
                    <div className="columns">
                        <AccountMainContentComponent />
                    </div>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state: IApplicationState) =>  ({ locale: state.global.language, account: state.global.account });
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        changeLanugage: (language: LANGUAGE) => dispatch(toggleLanguage(language)),
        deRegisterLoginUserDispatch: () => dispatch(deRegisterLoginUser()),
        fetchGlobalSettingAuthDispatch: () => dispatch(fetchGlobalSettingAuth())
    };
}
// 此处一定要把withRouter注入到组件中，要不然本组件不知道路由发生了变化，就不会重新渲染
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountLayout));
