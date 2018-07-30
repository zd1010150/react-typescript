/*tslint:disable:jsx-no-lambda*/
import { localStorageKeys } from 'config/app.config';
import * as _ from 'lodash';
import * as React from 'react';
import { RouteComponentProps, RouteProps } from "react-router";
import {Redirect, Route } from 'react-router-dom';
import { getStore} from "util/localStorage";

interface IpivateRoutProps{
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
}
type propTypes = RouteProps & IpivateRoutProps;

class PrivateRoute extends React.Component<propTypes, {}>{
  public render(){
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props : propTypes) =>
          this.hasLoggedIn() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/auth/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )
  }
  private hasLoggedIn = () => {
      const localLoginUser = JSON.parse(getStore(localStorageKeys.loginUser as string));
      return !_.isEmpty(localLoginUser);
  }
}
export default PrivateRoute;
