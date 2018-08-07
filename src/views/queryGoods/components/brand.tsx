// mport classNames from "classnames/bind";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { BrandFilter } from "zero-design";
import { Ibrand } from '../../../store/global/types';
// import styles from "../index.less";

interface IcomponentBrand{
    id: number,
    name: string,
    url: string,
}
interface Istate {
  pickedBrands: IcomponentBrand[]
}
interface Iprops {
  brands: Ibrand[];
  filterCategoryByBrand: (brandId: number) => void
  filterBrandsByEnglishName: (charactor: string) => void;
  filterBrandsByPinying: (charactor: string) => void;
  setSelectedBrandBatch: (ids: number[], isAdd: boolean) => void,
}

type propTypes = Iprops & InjectedIntlProps;

class BrandComponent extends React.Component<propTypes, {}> {
  public state: Istate= {
    pickedBrands : []
  }
  public render() {
    const { intl, brands} = this.props;
    const { locale} = intl;
    // const cx = classNames.bind(styles);
    const field = locale === "zh" ? "name_zh" : "name_en";
    return (
        <BrandFilter
          pickedBrands={this.state.pickedBrands}
          selectBrand={this.selectBrand}
          saveBrand={this.saveBrand}
          selectAlphabet={this.selectAlphabet}
          label="Brand"
          data={brands.map(b => ({ id: b.id, url: b.url, name: b[field]}))}
          saveBackground="green"
          cancelBackground="red"
        />
    );
  }
  private selectBrand = (e:any)=> {
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
      // this.props.filterCategoryByBrand(this.state.pickedBrands[0].id);
  }
  private selectAlphabet = (v: string) => {
    if(this.props.intl.locale ===  'zh'){
      this.props.filterBrandsByPinying(v);
    }else{
      this.props.filterBrandsByEnglishName(v);
    }
 };
  
}
export default injectIntl(BrandComponent);
