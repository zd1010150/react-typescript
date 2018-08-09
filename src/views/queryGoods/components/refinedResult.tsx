import { Icon, Popover } from "antd";
import classNames from "classnames/bind";
import * as _ from 'lodash';
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Ibrand, Icategory } from "../../../store/global/types";
import { IrefineBytypes } from "../flow/types";
import styles from "../index.less";
interface Iprops {
  selectedCategories: Icategory[];
  selectedBrands: Ibrand[];
  startDate: string;
  endDate: string;
  deleteRefineBy: (deleteType: IrefineBytypes) => void;
}
type propTypes = Iprops & InjectedIntlProps;

class RefineResultComponent extends React.Component<propTypes, {}> {
  public render() {
    const {
      intl,
      selectedCategories,
      selectedBrands,
      startDate,
      endDate
    } = this.props;
    const { formatMessage, locale } = intl;
    const cx = classNames.bind(styles);
    const field = locale === "zh" ? "name_zh" : "name_en";
    const categoryNames = selectedCategories.map(c => c[field]);
    const brandNames = selectedBrands.map(c => c[field]);
    const getFilter = (
      labelName: string,
      values: string[] = [],
      type: string
    ) => {
      if (values.length < 1) {
        return "";
      } else if (type !== "DATE") {
        if (values.length === 1) {
          return (
            <span className={cx("refine-result")}>
              {" "}
              {labelName} : {values[0]}{" "}
              <Icon type="close" onClick={this.removeFilter} data-type={type} />{" "}
            </span>
          );
        } else {
          const contentEl = (
            <span className={cx("refine-popover")}>{values.join(", ")}</span>
          );
          return (
            <Popover content={contentEl} placement="bottom">
              <span className={cx("refine-result")}>
                {" "}
                {labelName} : {values[0]}...{" "}
                <Icon
                  type="close"
                  onClick={this.removeFilter}
                  data-type={type}
                />{" "}
              </span>
            </Popover>
          );
        }
      } else if (type === "DATE" && values.length === 2 && !_.isEmpty(values[0]) && !_.isEmpty(values[1])) {
        return (
          <span className={cx("refine-result")}>
            {" "}
            {labelName} : {`${values[0]} - ${values[1]}`}{" "}
            <Icon type="close" onClick={this.removeFilter} data-type={type} />{" "}
          </span>
        );
      } else {
        return "";
      }
    };
    return (
      <div>
        <span className={cx("filter-label")}>
          {formatMessage({ id: "page.enquery.refineBy" })}
        </span>

        <span className={cx("refine-result-label")}>
          {getFilter(
            formatMessage({ id: "page.enquery.categories" }),
            categoryNames,
            "CATEGORY"
          )}
          {getFilter(
            formatMessage({ id: "page.enquery.brands" }),
            brandNames,
            "BRAND"
          )}
          {getFilter(
            formatMessage({ id: "page.enquery.onlineDate" }),
            [startDate, endDate],
            "DATE"
          )}
        </span>
      </div>
    );
  }
  private removeFilter = (e: React.MouseEvent<HTMLElement>) => {
    const iconEl = e.target as HTMLElement;
    const type = iconEl.dataset.type;
    const { deleteRefineBy } = this.props;
    switch (type) {
      case "CATEGORY":
        deleteRefineBy(IrefineBytypes.category);
        break;
      case "BRAND":
        deleteRefineBy(IrefineBytypes.brand);
        break;
      case "DATE":
        deleteRefineBy(IrefineBytypes.timeRange);
        break;
      default:
        break;
    }
  };
}
export default injectIntl(RefineResultComponent);
