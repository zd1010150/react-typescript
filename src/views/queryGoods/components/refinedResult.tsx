// import classNames from "classnames/bind";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { RefineResult } from "zero-design";
import { Ibrand, Icategory } from '../../../store/global/types';
import { IrefineBytypes } from "../flow/types";
// import styles from "../index.less";
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
    const { intl, selectedCategories, selectedBrands, startDate, endDate } = this.props;
    const { formatMessage, locale } = intl;
    // const cx = classNames.bind(styles);
    const field = locale === 'zh' ? 'name_zh' : 'name_en';
    const categoryNames = selectedCategories.map( c => c[field])
    const brandNames = selectedBrands.map(c => c[field])
    return (
      <RefineResult
        label={formatMessage({ id: "page.enquery.refineBy" })}
        categoryLabel={formatMessage({ id: "page.enquery.categories" })}
        brandLabel={formatMessage({ id: "page.enquery.brands" })}
        dateLabel={formatMessage({ id: "page.enquery.onlineDate" })}
        categories={categoryNames}
        brands={brandNames}
        startDate={startDate}
        endDate={endDate}
        date={startDate && endDate ? startDate + " - " + endDate : undefined}
        removeFilter={this.removeFilter}
      />
    );
  }
  private removeFilter = (type: string) => {
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
