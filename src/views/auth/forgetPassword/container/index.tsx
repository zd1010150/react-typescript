import { Col, Row } from "antd";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import ForgetPwdForm from "../components/form";
import { sendEmail } from "../flow/actions";
import { IsendEmailFormData } from "../flow/types";

interface IloginFormProps {
  sendEmailDispatch: (
    formData: IsendEmailFormData,
    successMessage: string,
    cb: () => void
  ) => void;
}

class ForgetPassword extends React.Component<
  IloginFormProps & InjectedIntlProps
> {
  public render() {
    const { formatMessage } = this.props.intl;
    return (
      <Row>
        <Col span={12}>
          <section className="section">
            <div className="section-content">
              <p>{formatMessage({ id: "global.info.resetPasswordTip" })}</p>
              <ForgetPwdForm sendEmailDispatch={this.props.sendEmailDispatch} />
            </div>
          </section>
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    sendEmailDispatch: (
      formData: IsendEmailFormData,
      successMessage: string,
      cb: () => {}
    ) => dispatch(sendEmail(formData, successMessage, cb))
  };
};
const ForgetPasswordComponent = connect(
  null,
  mapDispatchToProps
)(injectIntl(ForgetPassword));
export default ForgetPasswordComponent;
