import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Ibrand, Icategory } from "../../../store/global/types";
import { IApplicationState } from "../../../store/types";
import Brand from "../components/brand";
import Cart from "../components/cart";
import Category from "../components/category";
import Date from "../components/date";
import QueryByCode from "../components/queryByProductCode";
import RefineBy from "../components/refinedResult";
import {
  deleteFromCart,
  deleteRefineBy,
  filterBrandsByCategory,
  filterBrandsByEnglishName,
  filterBrandsByPinying,
  filterCategoryByBrand,
  modifyQuantityInCart,
  setSearchKey,
  setSelectedBrandBatch,
  setSelectedCategoryBatch,
  setTimeRange
} from "../flow/actions";
import {
  getSelectedBrandDetail,
  getSelectedCategoryDetail
} from "../flow/reselect";
import { IproductInCart, IrefineBytypes } from "../flow/types";

interface IdispatchProps {
  filterBrandsByCategoryDispatch: (categoryId: number) => void;
  filterCategoryByBrandDispatch: (brandId: number) => void;
  filterBrandsByEnglishNameDispatch: (charactor: string) => void;
  filterBrandsByPinyingDispatch: (charactor: string) => void;
  setSelectedBrandBatchDispatch: (ids: number[], isAdd: boolean) => void;
  setSelectedCategoryBatchDispatch: (ids: number[], isAdd: boolean) => void;
  setSearchKeyDispatch: (searchKey: string) => void;
  setTimeRangeDispatch: (from: string, to: string) => void;
  deleteFromCartDispatch: (id: number) => void;
  modifyQuantityInCartDispatch: (id: number, quantity: number) => void;
  deleteRefineByDispatch: (deleteType: IrefineBytypes) => void;
}
interface IstateProps {
  availableBrands: Ibrand[];
  availableCategories: Icategory[];
  selectedBrands: Ibrand[];
  goodsIncart: IproductInCart[];
  selectedCategoies: Icategory[];
  startDate: string;
  endDate: string;
}
type propTypes = IdispatchProps & IstateProps;
class QueryContainer extends React.Component<propTypes, {}> {
  public render() {
    // debugger
    return (
      <div>
        <div>
          <QueryByCode onSearch={this.props.setSearchKeyDispatch} />
          <Cart
            goods={this.props.goodsIncart}
            deleteFromCart={this.props.deleteFromCartDispatch}
            modifyQuantityInCart={this.props.modifyQuantityInCartDispatch}
          />
        </div>
        <RefineBy
          deleteRefineBy={this.props.deleteRefineByDispatch}
          selectedCategories={this.props.selectedCategoies}
          selectedBrands={this.props.selectedBrands}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
        />
        <Category
          categories={this.props.availableCategories}
          setSelectedCategoryBatch={this.props.setSelectedCategoryBatchDispatch}
          filterBrandsByCategory={this.props.filterBrandsByCategoryDispatch}
        />
        <Brand
          brands={this.props.availableBrands}
          filterCategoryByBrand={this.props.filterCategoryByBrandDispatch}
          setSelectedBrandBatch={this.props.setSelectedBrandBatchDispatch}
          filterBrandsByEnglishName={
            this.props.filterBrandsByEnglishNameDispatch
          }
          filterBrandsByPinying={this.props.filterBrandsByPinyingDispatch}
        />
        <Date
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          setTimeRange={this.props.setTimeRangeDispatch}
        />
      </div>
    );
  }
}
const mapStateToProps = (state: IApplicationState) => ({
  availableBrands: state.enquery.brands,
  availableCategories: state.enquery.categories,
  endDate: state.enquery.goodsQuery.timerange.to,
  goodsIncart: state.enquery.cart,
  selectedBrands: getSelectedBrandDetail(state),
  selectedCategoies: getSelectedCategoryDetail(state),
  startDate: state.enquery.goodsQuery.timerange.from
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    deleteFromCartDispatch: (id: number) => dispatch(deleteFromCart(id)),
    deleteRefineByDispatch: (deleteType: IrefineBytypes) =>
      dispatch(deleteRefineBy(deleteType)),
    filterBrandsByCategoryDispatch: (categoryId: number) =>
      dispatch(filterBrandsByCategory(categoryId)),
    filterBrandsByEnglishNameDispatch: (charactor: string) =>
      dispatch(filterBrandsByEnglishName(charactor)),
    filterBrandsByPinyingDispatch: (charactor: string) =>
      dispatch(filterBrandsByPinying(charactor)),
    filterCategoryByBrandDispatch: (brandId: number) =>
      dispatch(filterCategoryByBrand(brandId)),
    modifyQuantityInCartDispatch: (id: number, quantity: number) =>
      dispatch(modifyQuantityInCart(id, quantity)),
    setSearchKeyDispatch: (searchKey: string) =>
      dispatch(setSearchKey(searchKey)),
    setSelectedBrandBatchDispatch: (ids: number[], isAdd: boolean) =>
      dispatch(setSelectedBrandBatch(ids, isAdd)),
    setSelectedCategoryBatchDispatch: (ids: number[], isAdd: boolean) =>
      dispatch(setSelectedCategoryBatch(ids, isAdd)),
    setTimeRangeDispatch: (from: string, to: string) =>
      dispatch(setTimeRange(from, to))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryContainer);
