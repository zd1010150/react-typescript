// mport classNames from "classnames/bind";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { DateFilter } from "zero-design";
import { Ibrand } from '../../../store/global/types';
// import styles from "../index.less";


interface Iprops {
  startDate: Ibrand[];
  setTimeRange: (from: string, to: string) => void,
}
interface Istate {
  startDate: string| undefined,
  endDate: string| undefined,
}
type propTypes = Iprops & InjectedIntlProps & Istate;

class DateComponent extends React.Component<propTypes, {}> {
  public state: Istate= {
    pickedBrands : []
  }
  public render() {
    const { intl, brands} = this.props;
    const { locale} = intl;
    // const cx = classNames.bind(styles);
    const field = locale === "zh" ? "name_zh" : "name_en";
    return (
      <DateFilter
      onChange={this.selectDateRange}
      startDate={this.state.startDate}
      endDate={this.state.endDate}
      label="Online Date"
    />
    );
  }
  private selectBrand = e => {
    window.console.log("brand:", JSON.parse(e.target.value));
    const brandObj:IcomponentBrand = JSON.parse(e.target.value);
    let newPickedBrands = [];
    if (
      this.state.pickedBrands.find(brand => brand.id === brandObj.id)
    ) {
      newPickedBrands = this.state.pickedBrands.filter(
        brand => brand.id !== brandObj.id
      );
    } else {
      newPickedBrands = [...this.state.pickedBrands, brandObj];
    }
    this.setState({
      pickedBrands: newPickedBrands
    });
  };
  private saveBrand = () => {
      this.props.setSelectedBrandBatch(this.state.pickedBrands.map(c => c.id), true);
  }
  private selectAlphabet = v => {
    window.console.log("alphabet", v);
  };
  
}
export default injectIntl(DateComponent);
