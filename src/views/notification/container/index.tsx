


import { Col, Icon, Row} from 'antd';
import queryString from 'query-string';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { InotificationData } from 'store/global/types';

type Iprops = InotificationData & RouteComponentProps<any> & InjectedIntlProps;

class Notification extends React.Component<Iprops> {
  public state={
    backUrl: '',
    icon: 'info-circle',
    info: '',
    title: '',
  }
  public componentDidMount(){
    this.getParams(this.props)
  }
  public render() {
    const { formatMessage } = this.props.intl;
    return (
        <Row>
          <Col span={24}>
            <Icon type={this.state.icon}/>
            <h3> { formatMessage({id: `global.info.${this.state.title}`}) }</h3>
            <p>
            { formatMessage({id: `global.info.${this.state.info}`}) }
            </p>
            <Link to={this.state.backUrl}>{ formatMessage({id: `global.ui.button.goBack`}) }</Link>
          </Col>
        </Row>
    );
  }
  private getParams(props: Iprops) {
    const { location } = props;
    const pairs = queryString.parse(location.search);
    this.setState({
      ...pairs.data
    })
  }
}


export default withRouter(injectIntl(Notification));