import { Badge, Button, Icon, Input, Modal, Popover } from "antd";
import classNames from "classnames/bind";
import * as _ from "lodash";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { IproductInCart, IproductToPost } from "../flow/types";
import styles from "../index.less";

interface Iprops {
  goods: IproductInCart[];
  deleteFromCart: (id: number) => void;
  modifyQuantityInCart: (id: number, quantity: number) => void;
  enqueryGoods: (values: { items: IproductToPost[] }, cb: () => void) => void;
}

type propTypes = Iprops & InjectedIntlProps;

class DateComponent extends React.Component<propTypes, {}> {
  public render() {
    const { intl, goods } = this.props;
    const { locale, formatMessage } = intl;
    const cx = classNames.bind(styles);
    const nameField = locale === "zh" ? "product_name_zh" : "product_name_en";

    const cartEl = (
      <div>
        <ol className={cx("cart-goods-wrapper")}>
          {goods.map(g => (
            <li className={cx("cart-good-wrapper")}>
              <div className={cx("cart-good-img-wrapper")}>
                <img className={cx("cart-good-img")} src={g.img} />
              </div>

              <div className={cx("cart-good-detail")}>
                <p className={cx("cart-good-name")}> {g[nameField]}</p>
                <p className={cx("cart-good-product-code")}>
                  {" "}
                  {formatMessage({ id: "page.enquery.productCode" })}: {g.code}
                </p>
                <p className={cx("cart-good-quantity")}>
                  {formatMessage({ id: "page.enquery.quantity" })}:
                  <Input
                    defaultValue={`${g.quantity}`}
                    onBlur={this.modifyQuantity}
                    data-id={g.id}
                    size="small"
                    className={cx("cart-good-quantity-input")}
                  />
                  <Icon
                    className={cx("cart-good-delete-icon")}
                    type="delete"
                    onClick={this.deleteGood}
                    data-id={g.id}
                  />
                </p>
              </div>
            </li>
          ))}
        </ol>
        {_.isEmpty(this.props.goods) ? (
          ""
        ) : (
          <div className={cx("cart-operater-wrapper")}>
            <Button
              type="primary"
              className={cx("cart-good-enquery-btn")}
              size="small"
              onClick={this.enquiryGoods}
            >
              {formatMessage({ id: "page.enquery.enqueryGoods" })}
            </Button>
          </div>
        )}
      </div>
    );
    return (
      <Popover
        content={cartEl}
        title={formatMessage({ id: "page.enquery.enqueryGoods" })}
      >
        <span className={classNames('enquiry-cart', cx("cart-btn"))}>
          <Icon className={cx("cart-icon")} type="message" />
          <span className={cx("cart-icon-prompt")} > {formatMessage({ id: "page.enquery.enquiry" })} </span>
          <Badge className="cart-quantity" count={goods.length} showZero={true} overflowCount={99}/>
        </span>
      </Popover>
    );
  }
  private modifyQuantity = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputEl = e.target as HTMLInputElement;
    const quantity = inputEl.value;
    const id = inputEl.dataset.id;
    this.props.modifyQuantityInCart(Number(id), Number(quantity));
  };
  private deleteGood = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btnEl = e.target as HTMLButtonElement;
    const self = this;
    const id = btnEl.dataset.id;
    Modal.confirm({
      title: "Do you Want to delete these items?",
      onOk() {
        self.props.deleteFromCart(Number(id));
      }
    });
  };
  private enquiryGoods = () => {
    const { enqueryGoods, goods, intl } = this.props;
    const { formatMessage } = intl;
    const postData = {
      items: goods.map((g: IproductInCart) => ({
        product_id: g.product_id,
        quantity: g.quantity
      }))
    };
    enqueryGoods(postData, () => {
      Modal.info({
        content: (
          <div>{formatMessage({ id: "page.enquery.enqueryGoodsSuccess" })}</div>
        ),
        onOk() {
          window.location.href = window.location.href;
        },
        title: formatMessage({ id: "global.ui.dialog.info" })
      });
    });
  };
}
export default injectIntl(DateComponent);
