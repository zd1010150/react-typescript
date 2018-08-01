
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch, withRouter } from "react-router";
import { Dispatch } from 'redux';
import { AccountMainLayout, AuthMainLayout} from "./components/layout/index";
import { fetchGlobalSetting } from './store/global/actions';
interface Iprops{
  fetchGolbalSettingDispatch: () => void
}
class App extends React.Component <RouteComponentProps<any> & Iprops> {
  public componentDidMount(){
    this.props.fetchGolbalSettingDispatch();
  }
    public render() {
       return (
        <div className="App">
            <Switch>
                    <Route path = "/auth" component = {AuthMainLayout}/>
                    <Route path = "/" component = {AccountMainLayout}/>
            </Switch>
        </div>
            )
    }
}
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
      fetchGolbalSettingDispatch: () => dispatch(fetchGlobalSetting())
  };
}
export default withRouter(connect(null, mapDispatchToProps)(App));
