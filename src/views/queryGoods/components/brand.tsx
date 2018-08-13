import { Button, Col, Icon, Row, Tooltip } from "antd";
import classNames from "classnames/bind";
import *  as _ from 'lodash';
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Ibrand } from "../../../store/global/types";
import styles from "../index.less";

interface Istate {
  isDisplayAll: boolean;
}
interface Iprops {
  brands: Ibrand[];
  checkedBrandIds: number[];
  filterCategoryByBrand: (brandIds: number[]) => void;
  filterBrandsByEnglishName: (charactor: string) => void;
  filterBrandsByPinying: (charactor: string) => void;
  getAllBrands: () => void;
  setCheckedBrandIds: (ids: number[])=>void;
  setSelectedBrandBatch: (ids: number[], isAdd: boolean) => void;
  
}

type propTypes = Iprops & InjectedIntlProps;

class BrandComponent extends React.Component<propTypes, {}> {
  public state: Istate = {
    isDisplayAll: false,
  };
  public render() {
    const { intl, brands } = this.props;
    const { locale, formatMessage } = intl;
    const cx = classNames.bind(styles);
    const field = locale === "zh" ? "name_zh" : "name_en";
    const data = brands.map(c => ({ id: c.id, name: c[field], url: c.url }));
    const alphabets = (() => {
      const characters = [];
      for (let i = 0; i < 26; i++) {
        characters.push(String.fromCharCode(i + 65));
      }
      return characters;
    })();
   
    const isDisplayAll = this.state.isDisplayAll;
    return (
      <div className={cx("category-brand-wrapper")}>
        <div className={cx("filter-label-col")}>
          <span className={cx("filter-label")}>
            {formatMessage({ id: "page.enquery.brands" })}
          </span>
        </div>

        {isDisplayAll ? (
          <div className={cx("filter-options-all-col")}>
            <div className={cx("filter-brand-alphabet")}>
              <a
                href="#"
                key="all"
                className={cx("alphabet")}
                data-value="all"
                onClick={this.selectAlphabet}
              >
                All
              </a>
              {alphabets.map(i => (
                <a
                  href="#"
                  key={i}
                  className={cx("alphabet")}
                  data-value={i}
                  onClick={this.selectAlphabet}
                >
                  {i}
                </a>
              ))}
              <a
                href="#"
                key="09"
                className={cx("alphabet")}
                data-value="0-9"
                onClick={this.selectAlphabet}
              >
                0-9
              </a>
            </div>
            <div className={cx("filter-all-options-wrapper")}>
              <Row gutter={5}>
                {data.map(d => (
                  <Col xl={3} key={d.id}>
                    <label
                      className={
                        this.props.checkedBrandIds.indexOf(d.id) > -1
                          ? cx("brand-selected")
                          : cx("brand-unselected")
                      }
                    >
                      <input
                        type="checkbox"
                        id={`brand-${d.id}`}
                        value={d.id}
                        className={cx("brand-img-checkbox")}
                        onChange={this.selectBrand}
                      />

                      <img
                        className={cx("brand-img")}
                        src={
                          d.url 
                        }
                        alt=""
                      />
                      <Tooltip title={d.name}>
                        <span className={cx("brand-title")}>{d.name}</span>
                      </Tooltip>
                    </label>
                  </Col>
                ))}
              </Row>
            </div>
            <div className={cx("filter-save-cancel")}>
              <Button
                type="primary"
                onClick={this.saveBrand}
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
            <Row>
              {data.slice(0, 8).map(d => (
                <Col xl={3} key={d.id}>
                  <label
                    className={
                      this.props.checkedBrandIds.indexOf(d.id) > -1
                        ? cx("brand-selected")
                        : cx("brand-unselected")
                    }
                  >
                    <input
                      type="checkbox"
                      id={`brand-${d.id}`}
                      value={d.id}
                      className={cx("brand-img-checkbox")}
                      onChange={this.selectBrand}
                    />

                    <img
                      className={cx("brand-img")}
                      src={
                        d.url
                      }
                      alt=""
                    />
                    <Tooltip title={d.name}>
                      <span className={cx("brand-title")}>{d.name}</span>
                    </Tooltip>
                  </label>
                </Col>
              ))}
            </Row>
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
  private selectBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const brandId = Number(JSON.parse(e.target.value));
    let newPickedBrandIds: number[] = [];
    if (isChecked) {
      if (!this.props.checkedBrandIds.find(id => id === brandId)) {
        newPickedBrandIds = [...this.props.checkedBrandIds, brandId];
      }
    } else {
      newPickedBrandIds = this.props.checkedBrandIds.filter(
        id => id !== brandId
      );
    }
    this.props.setCheckedBrandIds(newPickedBrandIds)
    if(!_.isEmpty(newPickedBrandIds)){
      this.setState({
        isDisplayAll: true
      })
    }
  };
  private saveBrand = () => {
    this.props.setSelectedBrandBatch(this.props.checkedBrandIds, true);
    this.props.filterCategoryByBrand(this.props.checkedBrandIds);
    this.setState({
      isDisplayAll: false
    });
  };
  private selectAlphabet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const aEl = e.target as HTMLAnchorElement;
    const v = `${aEl.dataset.value}`;
    window.console.log("Vvvvv", v);
    if(v === "0-9"){
      this.props.filterBrandsByEnglishName(v);
    } else if( v === "all") {
      this.props.getAllBrands();
    }else if(this.props.intl.locale ===  'zh'){
      this.props.filterBrandsByPinying(v);
    }else {
      this.props.filterBrandsByEnglishName(v);
    }
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
  }
}
export default injectIntl(BrandComponent);
