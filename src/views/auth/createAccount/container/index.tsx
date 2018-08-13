import { Button, Col, notification, Row } from "antd";
import classNames from "classnames/bind";
import * as _ from 'lodash';
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { Iposition } from "../../../../store/global/types";
import {
  IantFormValidateResult,
  IApplicationState
} from "../../../../store/types";
import Captcha from "../components/captcha";
import CompanyInforForm from "../components/companyInfoForm";
import ContactPersonForm from "../components/contactPersonForm";
import PasswordForm, { passwordFormStatus } from "../components/passwordForm";
import SignInfoForm from "../components/signInfoForm";
import { createNewAccount } from "../flow/actions";
import { ICreateAccountForm } from "../flow/types";
import styles from "../index.less";

export interface Iprops {
  positions: Iposition[];
  createNewAccountDispatch: (
    formData: ICreateAccountForm,
    cb: (data:any) => void
  ) => void;
}
export interface Istate {
  captacha: string;
}

type IcreateAccountProps = Iprops &
  InjectedIntlProps &
  RouteComponentProps<any>;
export class CreateAccount extends React.Component<IcreateAccountProps, {}> {
  public state: Istate = {
    captacha: ""
  };
  private companyInfoForm: any;
  private contactPersonForm: any;
  private passwordForm: any;
  private signInForm: any;
  private captchaForm: any;

  public componentDidMount() {
      this.fetchCaptcha()
  }
  public render() {
    const { formatMessage } = this.props.intl;
    const cx = classNames.bind(styles);
    return (
      <Row>
        <Col span={12}>
          <h3 className={classNames("section-title", "first-section-title")}>
            {formatMessage({ id: "page.createAccount.companyInfo" })}
          </h3>
          <CompanyInforForm ref={c => (this.companyInfoForm = c)} />
          <h3 className="section-title">
            {formatMessage({ id: "page.createAccount.contactPerson" })}
          </h3>
          <ContactPersonForm
            positions={this.props.positions}
            ref={c => (this.contactPersonForm = c)}
          />
          <h3 className="section-title">
            {formatMessage({ id: "page.createAccount.signInformation" })}
          </h3>
          <SignInfoForm ref={c => (this.signInForm = c)} />
          <PasswordForm
            editStatus={passwordFormStatus.createNew}
            ref={c => (this.passwordForm = c)}
          />
          <Captcha ref={c => (this.captchaForm = c)} captcha={this.state.captacha} refresh={this.fetchCaptcha}/>
          <Button
            type="primary"
            className={classNames("magento-btn-big", cx("form-btn"))}
            onClick={this.createNewAccount}
          >
            {formatMessage({ id: "global.ui.button.createNewAccount" })}
          </Button>
        </Col>
      </Row>
    );
  }
  private createNewAccount = async () => {
    const { createNewAccountDispatch, intl, history } = this.props;
    const getPromiseWrapper = (form: any) =>
      new Promise(resolve => {
        form.validateFieldsAndScroll((err: any, values: object) => {
          resolve({
            data: values,
            validate: !err
          });
        });
      });
    Promise.all([
      getPromiseWrapper(this.companyInfoForm),
      getPromiseWrapper(this.contactPersonForm),
      getPromiseWrapper(this.signInForm),
      getPromiseWrapper(this.passwordForm),
      getPromiseWrapper(this.captchaForm)
    ]).then(
      ([companyInfoForm, contactPersonForm, signInfoForm, passwordForm, captchaForm]:[IantFormValidateResult,IantFormValidateResult,IantFormValidateResult,IantFormValidateResult,IantFormValidateResult]) => {
        const { password_confirmation, password } = passwordForm.data;
        const validateResult =
          companyInfoForm.validate &&
          contactPersonForm.validate &&
          signInfoForm.validate &&
          passwordForm.validate &&
          captchaForm.validate && 
          password === password_confirmation;
        if (validateResult) {
          const postData: any = {
            ...companyInfoForm.data,
            ...contactPersonForm.data,
            ...signInfoForm.data,
            ... captchaForm.data,
            password: passwordForm.data.password
          };
          createNewAccountDispatch(postData, (data: any) => {
              if(!_.isEmpty(data.captcha)){
                this.setState({
                    captacha: data.captcha
                })
              }else{
                notification.success({
                    description: "",
                    message: intl.formatMessage({
                      id: "global.info.createNewAccountSuccess"
                    })
                  });
                  history.replace("/auth/login");
              }
          });
        }
      }
    );
  };
  private fetchCaptcha = () => {
    const { createNewAccountDispatch } = this.props;
    const nullFormdata: ICreateAccountForm = {
      abn: "",
      captcha: "",
      company: "",
      contact_email: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      phone: "",
      position_id: -1,
      
    };
    createNewAccountDispatch(nullFormdata, (data:any) => {
        this.setState({
            captacha: data.captcha || ''
        });
    });
  };
}
const mapStateToProps = (state: IApplicationState) => ({
  positions: state.global.settings.positions
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    createNewAccountDispatch: (
      formData: ICreateAccountForm,
      cb: (data: any) => {}
    ) => dispatch(createNewAccount(formData, cb))
  };
};
const CreateAccountComponent = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectIntl(CreateAccount))
);
export default CreateAccountComponent;
