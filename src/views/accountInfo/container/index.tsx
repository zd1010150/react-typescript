

import * as _ from 'lodash';
import queryString from 'query-string';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { CHANGE_PWD, EDIT_INFO} from '../flow/pageActions';
import ChangePwd from './changePwd';
import DisplayInfo from './displayInfo';
import EditAccount from './editAccount';

type Iprops = RouteComponentProps<any>;

class DashboardView extends React.Component<Iprops> {
  
  public render() {
    return (<div className="edit-container-wrapper">{this.getView(this.props)}</div>);
  }
  private getView(props: Iprops) {
    const { location } = props;
    const pairs = queryString.parse(location.search);
    if (_.isEmpty(pairs.action)) { return <DisplayInfo />; }
    switch (pairs.action) {
      case EDIT_INFO:
        return <EditAccount />;
      case CHANGE_PWD:
        return <ChangePwd />;
      default:
        return <DisplayInfo />;
    }
  }
}


export default withRouter(DashboardView);
