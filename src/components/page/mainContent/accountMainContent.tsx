/*tslint:disable:ordered-imports*/
import * as React from 'react';
import * as _ from 'lodash';
import {Route, Switch} from 'react-router-dom';
import {AccountInfo, QueryGoods} from 'views/index';
import {Layout} from 'antd';
import { connect } from 'react-redux';
import { LeftNav } from 'components/page/index';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from "react-router";
import { Redirect, withRouter } from 'react-router-dom';
import { getStore} from "util/localStorage";
import { localStorageKeys } from 'config/app.config';
import { addError } from 'store/error/action';
import { GlobalActions} from 'src/store/global/types';
// import { IApplicationState} from 'src/store/reducers';
import { Dispatch } from 'redux';

const {Sider, Content} = Layout;
interface ImainContenttProps{
   // account: IloginUser;
    addErrorDispatch: (error:string) => void
}

type PropsType = RouteComponentProps<{}> & InjectedIntlProps & ImainContenttProps;
class AccountMainContentComponent extends React.Component <PropsType,{}> {
    public render() {
        const hasLoggedIn = this.hasLoggedIn(this.props);
        const page = (() => {
            if(!hasLoggedIn){
                // this.props.addErrorDispatch(this.props.intl.formatMessage({id:'global.error.CANT_VISIT_LOGIN'}));
                return <Redirect to="/auth/login" />
            }
            return (
                <Layout>
                    <Sider><LeftNav/></Sider>
                    <Content>
                        <Switch>
                            <Route path = "/dashboard" component = {AccountInfo}/>
                            <Route path = "/enquiry" component = {QueryGoods}/>
                        </Switch>
                    </Content>
                </Layout>
            )
        })();
        return (<div>{page}</div>);
    }

    private hasLoggedIn = (props: PropsType) => {
       //  const { account } = props;
        const localLoginUser =  JSON.parse(getStore(localStorageKeys.loginUser as string));
        if (_.isEmpty(localLoginUser)) {
            return false;
        }
        return true;
        // return !_.isEmpty(account);
    }
}
// const mapStateToProps = (state: IApplicationState) =>  ({ account: state.global.account });
const mapDispatchToProps = (dispatch: Dispatch<GlobalActions>) => {
    return {
        addErrorDispatch: (error: string) => dispatch(addError(error))
    };
}
export default withRouter(connect(null, mapDispatchToProps)(injectIntl(AccountMainContentComponent)));