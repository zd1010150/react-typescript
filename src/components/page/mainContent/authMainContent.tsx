/*tslint:disable:ordered-imports*/
import * as React from 'react';
import * as _ from 'lodash';
import {Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from "react-router";
import { Redirect, withRouter } from 'react-router-dom';
import { GlobalActions} from 'src/store/global/types';
import { getStore} from "util/localStorage";
import { localStorageKeys } from 'config/app.config';
import { Login, Logout } from 'views/index';
// import { IApplicationState} from 'src/store/reducers';
import { Dispatch } from 'redux';
import { addError } from 'store/error/action';

interface ImainContenttProps{
    // account: IloginUser;
    addErrorDispatch: (error:string) => void
}

type PropsType = RouteComponentProps<{}> & InjectedIntlProps & ImainContenttProps;
class AuthMainContentComponent extends React.Component <PropsType,{}> {
    public render() {
        const hasLoggedIn = this.hasLoggedIn(this.props);
        debugger
        const page = (() => {
            if(hasLoggedIn){
                // this.props.addErrorDispatch(this.props.intl.formatMessage({id:'global.error.CANT_VISIT_LOGIN'}));
                return <Redirect to="/dashboard" />
            }
            return (
                <Switch>
                    <Route path="/auth/login" component={Login} />
                    <Route path="/auth/logout" component={Logout} />
                </Switch>
            )
        })();
        return (<div>{page}</div>);
    }

    private hasLoggedIn = (props: PropsType) => {
        // const { account } = props;
        const localLoginUser = JSON.parse(getStore(localStorageKeys.loginUser as string));
        if (_.isEmpty(localLoginUser)) {
            return false;
        }

        return true;
    }
}
// const mapStateToProps = (state: IApplicationState) =>  ({ account: state.global.account });
const mapDispatchToProps = (dispatch: Dispatch<GlobalActions>) => {
    return {
        addErrorDispatch: (error: string) => dispatch(addError(error))
    };
}
export default withRouter(connect(null , mapDispatchToProps)(injectIntl(AuthMainContentComponent)));