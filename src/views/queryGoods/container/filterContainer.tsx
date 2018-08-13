import { Col, Row } from "antd";
import classNames from "classnames/bind";
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
  enqueryGoods,
  filterBrandsByCategory,
  filterBrandsByEnglishName,
  filterBrandsByPinying,
  filterCategoryByBrand,
  getAllBrands,
  modifyQuantityInCart,
  setCheckedBrandIds,
  setCheckedCategoryIds,
  setSearchKey,
  setSelectedBrandBatch,
  setSelectedCategoryBatch,
  setTimeRange
} from "../flow/actions";
import {
  getSelectedBrandDetail,
  getSelectedCategoryDetail
} from "../flow/reselect";
import { IproductInCart, IproductToPost, IrefineBytypes } from "../flow/types";
import styles from "../index.less";

interface IdispatchProps {
  filterBrandsByCategoryDispatch: (categoryId: number[]) => void;
  filterCategoryByBrandDispatch: (brandId: number[]) => void;
  filterBrandsByEnglishNameDispatch: (charactor: string) => void;
  filterBrandsByPinyingDispatch: (charactor: string) => void;
  getAllBrandsDispatch: () => void;
  setCheckedBrandIdsDispatch: (ids: number[]) => void;
  setCheckedCategoryIdsDispatch: (ids: number[]) => void;
  setSelectedBrandBatchDispatch: (ids: number[], isAdd: boolean) => void;
  setSelectedCategoryBatchDispatch: (ids: number[], isAdd: boolean) => void;
  setSearchKeyDispatch: (searchKey: string) => void;
  setTimeRangeDispatch: (from: string, to: string) => void;
  deleteFromCartDispatch: (id: number) => void;
  modifyQuantityInCartDispatch: (id: number, quantity: number) => void;
  deleteRefineByDispatch: (deleteType: IrefineBytypes) => void;
  enqueryGoodsDispatch: (
    values: { items: IproductToPost[] },
    cb: () => void
  ) => void;
}
interface IstateProps {
  availableBrands: Ibrand[];
  availableCategories: Icategory[];
  selectedBrands: Ibrand[];
  goodsIncart: IproductInCart[];
  selectedCategoies: Icategory[];
  startDate: string;
  endDate: string;
  checkedBrandIds: number[];
  checkedCategoryIds: number[];
}
type propTypes = IdispatchProps & IstateProps;
class QueryContainer extends React.Component<propTypes, {}> {
  public render() {
    const cx = classNames.bind(styles);
    return (
      <div>
        <Row key="search-code">
          <Col
            key="search-code-input"
            span={18}
            className={cx("search-key-col")}
          >
            <QueryByCode onSearch={this.props.setSearchKeyDispatch} />
          </Col>
          <Col key="cart" span={6} className={cx("cart-col")}>
            <Cart
              goods={this.props.goodsIncart}
              deleteFromCart={this.props.deleteFromCartDispatch}
              modifyQuantityInCart={this.props.modifyQuantityInCartDispatch}
              enqueryGoods={this.props.enqueryGoodsDispatch}
            />
          </Col>
        </Row>
        <Row key="refine-result">
          <Col span={24} className={cx("refine-result-col")}>
            <RefineBy
              deleteRefineBy={this.props.deleteRefineByDispatch}
              selectedCategories={this.props.selectedCategoies}
              selectedBrands={this.props.selectedBrands}
              startDate={this.props.startDate}
              endDate={this.props.endDate}
            />
          </Col>
        </Row>
        <div className={cx("filters-wrapper")}>
          <div className={cx("filter")}>
            <Category
              categories={this.props.availableCategories}
              setSelectedCategoryBatch={
                this.props.setSelectedCategoryBatchDispatch
              }
              filterBrandsByCategory={this.props.filterBrandsByCategoryDispatch}
              checkedCategoryIds={this.props.checkedCategoryIds}
              setCheckedCategoryIds={this.props.setCheckedCategoryIdsDispatch}
            />
          </div>
          <div className={cx("filter")}>
            <Brand
              brands={this.props.availableBrands}
              checkedBrandIds={this.props.checkedBrandIds}
              filterCategoryByBrand={this.props.filterCategoryByBrandDispatch}
              setCheckedBrandIds={this.props.setCheckedBrandIdsDispatch}
              setSelectedBrandBatch={this.props.setSelectedBrandBatchDispatch}
              filterBrandsByEnglishName={
                this.props.filterBrandsByEnglishNameDispatch
              }
              filterBrandsByPinying={this.props.filterBrandsByPinyingDispatch}
              getAllBrands={this.props.getAllBrandsDispatch}
            />
          </div>
          <div className={cx("filter")}>
            <Date
              startDate={this.props.startDate}
              endDate={this.props.endDate}
              setTimeRange={this.props.setTimeRangeDispatch}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: IApplicationState) => ({
  availableBrands: state.enquery.brands,
  availableCategories: state.enquery.categories,
  checkedBrandIds: state.enquery.checkedBrandIds,
  checkedCategoryIds: state.enquery.checkedCategoryIds,
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
    enqueryGoodsDispatch: (
      values: { items: IproductToPost[] },
      cb: () => void
    ) => dispatch(enqueryGoods(values, cb)),
    filterBrandsByCategoryDispatch: (categoryIds: number[]) =>
      dispatch(filterBrandsByCategory(categoryIds)),
    filterBrandsByEnglishNameDispatch: (charactor: string) =>
      dispatch(filterBrandsByEnglishName(charactor)),
    filterBrandsByPinyingDispatch: (charactor: string) =>
      dispatch(filterBrandsByPinying(charactor)),
    filterCategoryByBrandDispatch: (brandIds: number[]) =>
      dispatch(filterCategoryByBrand(brandIds)),
    getAllBrandsDispatch: () => dispatch(getAllBrands()),
    modifyQuantityInCartDispatch: (id: number, quantity: number) =>
      dispatch(modifyQuantityInCart(id, quantity)),
    setCheckedBrandIdsDispatch: (ids: number[]) =>
      dispatch(setCheckedBrandIds(ids)),
    setCheckedCategoryIdsDispatch: (ids: number[]) =>
      dispatch(setCheckedCategoryIds(ids)),
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
