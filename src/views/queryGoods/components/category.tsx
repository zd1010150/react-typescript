// mport classNames from "classnames/bind";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Icategory } from 'store/global/types';
import { CategoryFilter } from "zero-design";
// import styles from "../index.less";

interface IcomponentCateory{
    id: number,
    name: string,
}
interface Iprops {
  categories: Icategory[];
  setSelectedCategoryBatch: (id: number[], isAdd: boolean) => void,
}
interface Istate {
    pickedCategories: IcomponentCateory[]
}
type propTypes = Iprops & InjectedIntlProps & Istate;

class CategoryComponent extends React.Component<propTypes, {}> {
  public state: Istate= {
    pickedCategories : []
  }
  public render() {
    const { intl, categories} = this.props;
    const { locale} = intl;
    // const cx = classNames.bind(styles);
    const field = locale === "zh" ? "name_zh" : "name";
    return (
        <CategoryFilter
        selectCategory={this.selectCategory}
        saveCategory={this.saveCategory}
        pickedCategories={this.state.pickedCategories}
        label="Category"
        data={categories.map(c => ({ id: c.id, name: c[field]}))}
        saveBackground="green"
        cancelBackground="red"
      />
    );
  }
  private selectCategory = (checkedValues: IcomponentCateory) => {
    this.setState({ pickedCategories: checkedValues });
  }
  private saveCategory = () => {
      this.props.setSelectedCategoryBatch(this.state.pickedCategories.map(c => c.id), true);
  }
  
}
export default injectIntl(CategoryComponent);
