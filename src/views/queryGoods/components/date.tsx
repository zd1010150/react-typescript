// mport classNames from "classnames/bind";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { DateFilter } from "zero-design";
// import styles from "../index.less";


interface Iprops {
  startDate: string,
  endDate: string,
  setTimeRange: (from: string, to: string) => void,
}

type propTypes = Iprops & InjectedIntlProps;

class DateComponent extends React.Component<propTypes, {}> {
  
  public render() {
    const { startDate, endDate } = this.props;
    // const { locale} = intl;
    // const cx = classNames.bind(styles);
    return (
      <DateFilter
      onChange={this.selectDateRange}
      startDate={startDate}
      endDate={endDate}
      label="Online Date"
    />
    );
  }
  private selectDateRange = (date: any, dateString : string[]) => {
    this.props.setTimeRange(dateString[0], dateString[1])
  };
  
}
export default injectIntl(DateComponent);
