
import { Button, Icon, Input, Modal, Popover } from "antd";
import classNames from "classnames/bind";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { IproductInCart } from "../flow/types";
import styles from "../index.less";

interface Iprops {
  goods: IproductInCart[];
  deleteFromCart: (id: number) => void;
  modifyQuantityInCart: (id: number, quantity: number) => void;
}

type propTypes = Iprops & InjectedIntlProps;

class DateComponent extends React.Component<propTypes, {}> {
  public render() {
    const { intl, goods } = this.props;
    const { locale } = intl;
    const cx = classNames.bind(styles);
    const nameField = locale === "zh" ? "product_name_zh" : "product_name_en";

    const cartEl = (
      <ol>
        {goods.map(g => (
          <li>
            <img className={cx("cart-good-img")} />
            <div>
              <p> {g[nameField]}</p>
              <p> product code: {g.code}</p>
              <p>
                qty:
                <Input
                  defaultValue={`${g.quantity}`}
                  onBlur={this.modifyQuantity}
                  data-id={g.id}
                />
              </p>
              <Icon type="delete" onClick={this.deleteGood} data-id={g.id} />
            </div>
          </li>
        ))}
      </ol>
    );
    return (
      <Popover content={cartEl}>
        <Button type="primary">
          <Icon type="pay-circle-o" />
          {goods.length}
        </Button>
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
}
export default injectIntl(DateComponent);
