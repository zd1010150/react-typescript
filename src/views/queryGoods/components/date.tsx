import classNames from "classnames/bind";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";

import { DatePicker } from "antd";
import * as Moment from "moment";
import styles from "../index.less";

interface Iprops {
  startDate: string;
  endDate: string;
  setTimeRange: (from: string, to: string) => void;
}

type propTypes = Iprops & InjectedIntlProps;

class DateComponent extends React.Component<propTypes, {}> {
  public render() {
    const { startDate, endDate, intl } = this.props;
    const { formatMessage } = intl;
    const cx = classNames.bind(styles);
    return (
      <div className={cx("category-brand-wrapper")}>
        <div className={cx("filter-label-col")}>
          <span className={cx("filter-label")}>
            {formatMessage({ id: "page.enquery.onlineDate" })}
          </span>
        </div>
        <div className={cx("filter-options-first-col")}>
          <DatePicker.RangePicker
            size="small"
            value={
              startDate && endDate ? [Moment(startDate), Moment(endDate)] : []
            }
            style={{ marginLeft: 5 }}
            onChange={this.selectDateRange}
          />
        </div>
      </div>
    );
  }
  private selectDateRange = (date: any, dateString: string[]) => {
    this.props.setTimeRange(dateString[0], dateString[1]);
  };
}
export default injectIntl(DateComponent);
