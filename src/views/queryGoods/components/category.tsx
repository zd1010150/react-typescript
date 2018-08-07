// mport classNames from "classnames/bind";
// import styles from "../index.less";
import { Button, Checkbox, Col, Row } from "antd";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Icategory } from "../../../store/global/types";
// import { CategoryFilter } from "zero-design";

// interface IcomponentCateory {
//   id: number;
//   name: string;
// }
interface Istate {
  pickedCategories: string[];
}
interface Iprops {
  categories: Icategory[];
  filterBrandsByCategory: (categoryId: number) => void;
  setSelectedCategoryBatch: (ids: number[], isAdd: boolean) => void;
}

type propTypes = Iprops & InjectedIntlProps;

class CategoryComponent extends React.Component<propTypes, {}> {
  public state: Istate = {
    pickedCategories: []
  };
  public render() {
    const { intl, categories } = this.props;
    const { locale, formatMessage } = intl;
    // const cx = classNames.bind(styles);
    const field = locale === "zh" ? "name_zh" : "name_en";
    const data = categories.map(c => ({ id: c.id, name: c[field] }));
    return (
      <div>
        <Checkbox.Group
          style={{ width: "100%" }}
          value={this.state.pickedCategories.map(c => `${c}`)}
          onChange={this.selectCategory}
        >
          <Row>
            {data.map(d => (
              <Col xl={3} sm={5} key={d.id}>
                <Checkbox value={`${d.id}`}>{d.name}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
        <Button type="primary" onClick={this.saveCategory}>
          {formatMessage({ id: "global.ui.button.save" })}
        </Button>
        <Button>{formatMessage({ id: "global.ui.button.cancel" })}</Button>
      </div>
    );
  }
  private selectCategory = (checkedValues: string[]) => {
    this.setState({ pickedCategories: checkedValues });
  };
  private saveCategory = () => {
    this.props.setSelectedCategoryBatch(
      this.state.pickedCategories.map(c => Number(c)),
      true
    );
    // this.props.filterBrandsByCategory(this.state.pickedCategories[0].id)
  };
}
export default injectIntl(CategoryComponent);
