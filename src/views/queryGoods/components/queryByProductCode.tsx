import {  Input } from 'antd';
import classNames from 'classnames/bind';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import styles from '../index.less';

interface Iprops{
    onSearch: (value: string) => void
}
type propTypes = Iprops & InjectedIntlProps;

class QueryByProductCode extends React.Component < propTypes, {}> {
    public render() {
      const { onSearch, intl} = this.props;
      const { formatMessage } = intl;
      const cx = classNames.bind(styles);
        return (
         
        <Input.Search
          placeholder={formatMessage({ id: 'page.enquery.codePlaceholder' })}
          // tslint:disable-next-line:jsx-no-lambda
          onSearch={value=>onSearch(value)}
          enterButton={true}
          className={classNames(cx('search-input'), 'enquery-search')}
        />
        )
        
    }
}
const QueryByProductCodeComponent= injectIntl(QueryByProductCode);
export default QueryByProductCodeComponent;