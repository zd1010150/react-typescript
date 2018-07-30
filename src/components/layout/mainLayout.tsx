import classNames from 'classnames/bind';
import { AccountMainContentComponent, AuthMainContentComponent} from "components/page";
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router";
import {Route, Switch, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { deRegisterLoginUser, toggleLanguage } from 'src/store/global/actions';
import { GlobalActions, IloginUser} from 'src/store/global/types';
import { IApplicationState} from 'src/store/reducers';
import { LANGUAGE } from "../../config/app.config";
import {
    Logo,
    PageTitle,
    TopPanel
} from '../page/index';
import * as styles from './index.less';

interface ImainLayoutProps{
    locale: LANGUAGE;
    account: IloginUser;
    changeLanugage:  (language: LANGUAGE) => void,
    deRegisterLoginUserDispatch: () => void
}
const cx = classNames.bind(styles);
type propTypes = ImainLayoutProps & RouteComponentProps<any>;
const layout: React.SFC<propTypes>= ({locale, account, changeLanugage, deRegisterLoginUserDispatch}) => (
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
                <Switch>
                    <Route path = "/auth" component = {AuthMainContentComponent}/>
                    <Route path = "/" component = {AccountMainContentComponent}/>
                </Switch>
            </div>
        </main>
    </div>
);
const mapStateToProps = (state: IApplicationState) =>  ({ locale: state.global.language, account: state.global.account });
const mapDispatchToProps = (dispatch: Dispatch<GlobalActions>) => {
    return {
        changeLanugage: (language: LANGUAGE) => dispatch(toggleLanguage(language)),
        deRegisterLoginUserDispatch: () => dispatch(deRegisterLoginUser())
    };
}
// 此处一定要把withRouter注入到组件中，要不然本组件不知道路由发生了变化，就不会重新渲染
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(layout));
