import { Button, Input, notification, Popover, Table, Tooltip } from "antd";
import { PaginationConfig} from 'antd/lib/pagination/Pagination'
import classNames from "classnames/bind";
import * as _ from "lodash";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import {biggerZeroInterger} from 'util/regex';
import styles from "../index.less";

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
interface Istate{
  quantity: object,
}
type propTypes = Iprops & InjectedIntlProps;
class GoodsTable extends React.Component<propTypes, {}> {
  public state: Istate ={
    quantity: {}
  }
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
    const cx = classNames.bind(styles);
    
    const wholeSealColumns = [1,2,3].map(index => {
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
        title: formatMessage({ id: "page.enquery.productCode" }),
        width: 100,
      },
      {
        key: locale === "zh" ? "brand.name_zh" : "brand.name",
        render: (t: string, record: Iproduct) => {
          const field = locale === "zh" ? "brand_zh" : "brand_en";
          const brandName = record[field];
          return <Tooltip title={brandName}><div className={cx('category-brand-td')}>{brandName}</div></Tooltip>;
        },
        sorter: true,
        title: formatMessage({ id: "page.enquery.brands" }),
        width: 100,
      },
      {
        key: "category",
        render: (t: string, record: Iproduct) => {
          const prop = locale === "zh" ? "name_zh" : "name_en";
          const categoryNames = (record.categories as Icategory[]).map((c:Icategory) => c[prop]).join(", ");
          return <Tooltip title={categoryNames}><div className={cx('category-names-td')}>{categoryNames}</div></Tooltip>;
        },
        title: formatMessage({ id: "page.enquery.category" }),
        width: 100,
      },
      {
        key: "online_time",
        render: (t: string, record: Iproduct) => {
          const time = record.online_time
          return <Tooltip title={time}><div className={cx('category-time-td')}>{time}</div></Tooltip>;
        },
        sorter: true,
        title: formatMessage({ id: "page.enquery.onlineDate" }),
        width: 120,
      },
      {
        key: locale === "zh" ? "name" : "name_en",
        render: (t: string, record: Iproduct) => {
          const name = record[locale === "zh" ? "product_name_zh" : "product_name_en"];
          const popoverContentEl = (
          <div className={cx('product-name-popover-wrapper')}>
            <img width="100" height="100" className={cx('product-image-popover')} src={record.img}/>
            <p className={cx('product-name-popover')}>{name}</p>
          </div>);
          return (
          <Popover placement="right" content={popoverContentEl}>
          <div className={cx('product-name-td')}>{name}</div>
        </Popover>)
        } ,
        sorter: true,
        title: formatMessage({ id: "page.enquery.productName" }),
        width: 150,
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
            <div className={cx('table-input-quantity-wrapper')} >
              <Input className={cx('table-input-quantity')} onBlur={this.setQuantity} data-id={record.id}/>
              <Button
                type="primary"
                size="small"
                className={cx('table-input-btn')} 
                data-id={ record.id }
                onClick={this.addGoodToCart}
              >
                {formatMessage({ id: "global.ui.button.addGoods" })}
              </Button>
            </div>
          );
        },
        title: formatMessage({ id: "page.enquery.enqueryQty" }),
        width: 150
      }
    ];
    const paginationConfig : PaginationConfig = {
      current: goodsPagination.page,
      defaultCurrent: goodsPagination.page,
      defaultPageSize: goodsPagination.per_page,
      pageSize: goodsPagination.per_page,
      position: "both",
      total: goodsPagination.total
    };
    return (
      <Table
        bordered={true}
        rowKey="id"
        size="small"
        className="enquiry-table"
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
    const product = this.props.goods.filter(good => good.id === productId)[0];

    const quantity = this.state.quantity[`${productId}`];
    if(quantity && _.isNumber(quantity) && Number(quantity) > 0){
      this.props.addToCart(Object.assign({},product,{product_id: product.id, quantity}));
    }else{
      notification.error({ 
        description: 'Input legal quantity, 输入正确的数量.',
        message: 'Error 错误',
      });
    }
    
  };
  private setQuantity = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputEl = e.target as HTMLInputElement;
    const value = inputEl.value
      if(value.length === 0){
        return
      }
      if(!biggerZeroInterger.test(value)) {
        notification.error({ 
          description: 'only input interger number, 只能输入大于0的正整数.',
          message: 'Error 错误',
        });
      }else{
        this.setState({
          quantity: Object.assign({}, this.state.quantity, { [`${inputEl.dataset.id}`]: Number(value)})
        })

      }
    
    
  }
}

export default injectIntl(GoodsTable);
