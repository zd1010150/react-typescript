import classNames from 'classnames/bind';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from "react-router";
import { withRouter } from 'react-router-dom';
import { NAV_URL_PAGE_MAPPING, UN_NAV_URL_PAGE_MAPPING} from "../../../config/app.config";
import * as styles from './index.less';

interface IpageTitleState{
    pageTitle: string
}

type PropsType = RouteComponentProps<{}> & IpageTitleState & InjectedIntlProps;
export const PageRouterTitleMapping = { ...NAV_URL_PAGE_MAPPING, ...UN_NAV_URL_PAGE_MAPPING };
class PageTitleComponent extends React.Component <PropsType, {}> {
   public state = {
        pageTitle: ''
    }
    public componentDidMount() {
       this.setPageTitle(this.props)
    }
    public componentWillReceiveProps(nextProps: PropsType) {
        if (nextProps.location !== this.props.location) {
        this.setPageTitle(nextProps)
        }
    }
    public render() {
        const cx = classNames.bind(styles);
        return (<div className={cx("page-title")}>{this.state.pageTitle}</div>)
    }
    private setPageTitle(props: PropsType){
        const pathName = props.location.pathname;
        const id =  PageRouterTitleMapping[pathName];
        this.setState({
            pageTitle: props.intl.formatMessage({id: id ? id:  'global.pageTitle.myDashboard'})
        });
    }

}

export default withRouter(injectIntl(PageTitleComponent));
