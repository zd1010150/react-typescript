import { Button, Input, Table } from "antd";
import * as _ from "lodash";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Icategory } from '../../../store/global/types';
import { IpaginationParams } from "../../../store/types";
import {
  Iproduct,
  IproductInCart,
  IproductQuery,
  IproductQueryFormData,
} from "../flow/types";
interface Iprops {
  goodsQuery: IproductQuery;
  goodsPagination: IpaginationParams;
  getGoodsData: (values: IproductQueryFormData) => void;
  addToCart: (product: IproductInCart) =>void;
  goods: Iproduct[];
}

type propTypes = Iprops & InjectedIntlProps;
class GoodsTable extends React.Component<propTypes, {}> {
  private temper: object = {};
  public componentDidMount() {
   this.fetchData(this.props);
  }
  public componentDidUpdate(prevProps: propTypes) {
    if (
      !(
        _.isEqual(prevProps.goodsQuery, this.props.goodsQuery)
      )
    ) {
      this.fetchData(this.props);
    }
  }

  public render() {
    const { intl, goods, goodsPagination } = this.props;
    const { formatMessage, locale } = intl;
    const wholeSealColumns = [1, 2, 3].map(index => {
      return {
        key: `wholesale${index}`,
        render: (t: string, record: IproductInCart) => {
          const wholesale = record.wholesale_pallet.filter(
            w => w.index === index
          );
          if (!_.isEmpty(wholesale)) {
            return wholesale[0].price;
          } else {
            return "";
          }
        },
        title: formatMessage({ id: "page.enquery.wholesale" }, { index })
      };
    });
    const columns = [
      {
        dataIndex: "code",
        key: "productCode",
        title: formatMessage({ id: "page.enquery.productCode" })
      },
      {
        dataIndex: locale === "zh" ? "brand_zh" : "brand_en",
        key: locale === "zh" ? "brand.name_zh" : "brand.name",
        sorter: true,
        title: formatMessage({ id: "page.enquery.brands" })
      },
      {
        key: "category",
        render: (t: string, record: Iproduct) => {
          const prop = locale === "zh" ? "name_zh" : "name_en";
          return (record.categories as Icategory[]).map((c:Icategory) => c[prop]).join(", ");
        },
        title: formatMessage({ id: "page.enquery.category" })
      },
      {
        dataIndex: "onlineDate",
        key: "online_time",
        title: formatMessage({ id: "page.enquery.onlineDate" })
      },
      {
        dataIndex: locale === "zh" ? "product_name_zh" : "product_name_en",
        key: locale === "zh" ? "name" : "name_en",
        title: formatMessage({ id: "page.enquery.productName" })
      },
      ...wholeSealColumns,
      {
        dataIndex: "qty_per_pallet",
        key: "qtyPallet",
        title: formatMessage({ id: "page.enquery.qtyPallet" })
      },
      {
        key: "enqueryQty",
        render: (t: string, record: Iproduct) => {
          return (
            <div>
              <Input ref={c => (this.temper[record.id] = c)} />
              <Button
                type="primary"
                data-id={ record.id }
                data-record = { JSON.stringify(record)}
                onClick={this.addGoodToCart}
              >
                {formatMessage({ id: "global.ui.button.addGoods" })}
              </Button>
            </div>
          );
        },
        title: formatMessage({ id: "page.enquery.enqueryQty" })
      }
    ];
    const paginationConfig = {
      current: goodsPagination.page,
      defaultCurrent: goodsPagination.page,
      defaultPageSize: goodsPagination.per_page,
      pageSize: goodsPagination.per_page,
      total: goodsPagination.total
    };
    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={goods}
        pagination={paginationConfig}
        onChange={this.handleChange}
      />
    );
  }

  private handleChange = (pagination: any, filters: any, sorter: any) => {
    const { getGoodsData, goodsQuery } = this.props;
    const innerSortedBy = _.isEmpty(sorter.order)
      ? ""
      : sorter.order === "descend"
        ? "desc"
        : "asc";
    getGoodsData({
      orderBy: sorter.columnKey || '',
      page: pagination.current as number,
      per_page: pagination.pageSize as number,
      sortedBy: innerSortedBy|| '',
      ...goodsQuery
    });
  };
  private fetchData = (props: propTypes) => {
    const { getGoodsData, goodsQuery, goodsPagination } = props;
    getGoodsData({
      ...goodsQuery,
      ...goodsPagination
    });
  };
  private addGoodToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btnEl = e.target as HTMLButtonElement;
    const productId = Number(btnEl.dataset.id);
    const product = JSON.parse(btnEl.dataset.product|| '') as Iproduct;
    const quantity = this.temper[productId].value;
    this.props.addToCart(Object.assign({},product,{product_id: product.id, quantity}));
  };
}

export default injectIntl(GoodsTable);
