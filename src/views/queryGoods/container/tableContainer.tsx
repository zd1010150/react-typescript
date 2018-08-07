import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IApplicationState, IpaginationParams } from "../../../store/types";
import GoodsTable from "../components/table";

import { addToCart, getGoodsData } from "../flow/actions";
import { getAllGoodsDetail } from "../flow/reselect";
import {
  IproductInCart,
  IproductQuery,
  IproductQueryFormData
} from "../flow/types";
interface IstateProps {
  goodsQuery: IproductQuery;
  goodsPagination: IpaginationParams;
  goods: IproductInCart[];
}
interface IdispatchProps {
  getGoodsDataDispatch: (values: IproductQueryFormData) => void;
  addToCartDispatch: (product: IproductInCart) => void;
}
type propsTypes = IstateProps & IdispatchProps;

class TableContainer extends React.Component<propsTypes, {}> {
  public render() {
    return (
      <div>
        <GoodsTable
          goods={this.props.goods}
          goodsQuery={this.props.goodsQuery}
          goodsPagination={this.props.goodsPagination}
          getGoodsData={this.props.getGoodsDataDispatch}
          addToCart={this.props.addToCartDispatch}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  goods: getAllGoodsDetail(state),
  goodsPagination: state.enquery.goodsPagination,
  goodsQuery: state.enquery.goodsQuery
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    addToCartDispatch: (product: IproductInCart) =>
      dispatch(addToCart(product)),
    getGoodsDataDispatch: (values: IproductQueryFormData) =>
      dispatch(getGoodsData(values))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContainer);
