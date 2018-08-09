import { Button, Checkbox, Col, Icon, Row, Tooltip } from "antd";
import classNames from "classnames/bind";
import * as _ from "lodash";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Icategory } from "../../../store/global/types";
import styles from "../index.less";

interface Istate {
  isDisplayAll: boolean;
}
interface Iprops {
  categories: Icategory[];
  checkedCategoryIds: number[];
  filterBrandsByCategory: (categoryIds: number[]) => void;
  setSelectedCategoryBatch: (ids: number[], isAdd: boolean) => void;
  setCheckedCategoryIds: (ids: number[]) => void;
}

type propTypes = Iprops & InjectedIntlProps;

class CategoryComponent extends React.Component<propTypes, {}> {
  public state: Istate = {
    isDisplayAll: false
  };
  public render() {
    const { intl, categories } = this.props;
    const { locale, formatMessage } = intl;
    const cx = classNames.bind(styles);
    const field = locale === "zh" ? "name_zh" : "name_en";
    const data = categories.map(c => ({ id: c.id, name: c[field] }));
    const isDisplayAll = this.state.isDisplayAll;
    return (
      <div
        className={classNames(
          cx("category-brand-wrapper"),
          cx("category-wrapper")
        )}
      >
        <div className={cx("filter-label-col")}>
          <span className={cx("filter-label")}>
            {formatMessage({ id: "page.enquery.categories" })}
          </span>
        </div>

        {isDisplayAll ? (
          <div className={cx("filter-options-all-col")}>
            <div className={cx("filter-all-options-wrapper")}>
              <Checkbox.Group
                style={{ width: "100%" }}
                value={this.props.checkedCategoryIds.map(c=>`${c}`)}
                onChange={this.selectCategory}
              >
                <Row>
                  {data.map(d => (
                    <Col xl={6} key={d.id}>
                      <Tooltip title={d.name}>
                        <Checkbox
                          value={`${d.id}`}
                          className={classNames(
                            cx("category-checkbox"),
                            this.props.checkedCategoryIds.indexOf(
                              Number(d.id)
                            ) > -1
                              ? cx("category-checkbox-checked")
                              : ""
                          )}
                        >
                          {d.name}
                        </Checkbox>
                      </Tooltip>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </div>
            <div className={cx("filter-save-cancel")}>
              <Button
                type="primary"
                onClick={this.saveCategory}
                size="small"
                className={cx("save-btn")}
              >
                {formatMessage({ id: "global.ui.button.save" })}
              </Button>
              <Button size="small" onClick={this.cancelSelect}>
                {formatMessage({ id: "global.ui.button.cancel" })}
              </Button>
            </div>
          </div>
        ) : (
          <div className={cx("filter-options-first-col")}>
            <Checkbox.Group
              style={{ width: "100%" }}
              value={this.props.checkedCategoryIds.map(c => `${c}`)}
              onChange={this.selectCategory}
            >
              <Row>
                {data.slice(0, 4).map(d => (
                  <Col xl={6} key={d.id}>
                    <Tooltip title={d.name}>
                      <Checkbox value={`${d.id}`}>{d.name}</Checkbox>
                    </Tooltip>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </div>
        )}

        <div className={cx("more-btn-col")}>
          <button className={cx("more-btn")} onClick={this.toggleDisplayAll}>
            {" "}
            {formatMessage({ id: "global.ui.button.more" })}{" "}
            <Icon type={isDisplayAll ? "up" : "down"} />
          </button>
        </div>
      </div>
    );
  }
  private selectCategory = (checkedValues: string[]) => {
    this.props.setCheckedCategoryIds(checkedValues.map(c => Number(c)));
    if (!_.isEmpty(checkedValues)) {
      this.setState({
        isDisplayAll: true
      });
    }
  };
  private saveCategory = () => {
    this.props.setSelectedCategoryBatch(this.props.checkedCategoryIds, true);
    this.props.filterBrandsByCategory(this.props.checkedCategoryIds);
    this.setState({
      isDisplayAll: false
    });
  };
  private toggleDisplayAll = () => {
    this.setState({
      isDisplayAll: !this.state.isDisplayAll
    });
  };
  private cancelSelect = () => {
    this.setState({
      isDisplayAll: false
    });
  };
}
export default injectIntl(CategoryComponent);
