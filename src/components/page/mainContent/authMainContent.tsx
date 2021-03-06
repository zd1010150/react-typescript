/*tslint:disable:ordered-imports*/
import * as React from 'react';
import { Switch } from 'react-router';
import { Login, Logout, CreateNewAccount, ForgetPassword, ResetPassword } from '../../../views/index';
import { PublicRoute } from '../../ui/index'
class AuthMainContentComponent extends React.Component <{}> {
    public render() {
      return (
                <Switch>
                    <PublicRoute path="/auth/login" component={Login} />
                    <PublicRoute path="/auth/logout" component={Logout} />
                    <PublicRoute path="/auth/createNewAccount" component={CreateNewAccount} />
                    <PublicRoute path="/auth/forgetPassword" component={ForgetPassword}/>
                    <PublicRoute path="/auth/resetPassword" component={ResetPassword}/>
                    <PublicRoute path="/auth/notification" component={ResetPassword}/>
                </Switch>
            )
    }
}
export default AuthMainContentComponent;