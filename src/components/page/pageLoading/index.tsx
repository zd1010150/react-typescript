import { Spin } from 'antd';
import classNames from 'classnames/bind';
import * as React from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from 'store/types';
import styles from './index.less';

const cx = classNames.bind(styles);


interface Iprops{
  isShow: boolean
}
class PageLoading extends React.Component<Iprops,{}> {
  public render() {
    const {
      isShow,
    } = this.props;
    return (
      <div className={classNames(isShow ? cx('page-loading') : cx('page-loading-hide'))} >
        <Spin className={cx('page-loading-spin')} />
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) =>  ({ isShow: state.ui.pageLoading.isShow });


export default connect(mapStateToProps)(PageLoading);


