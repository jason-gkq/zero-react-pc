import { connect } from "react-redux";
import ForgetPwd from "../components/ForgetPwd";

export default connect(
  (state, { $model }) => {
    const {
      fDate,
      loginTitle,
      isForgetPwd,
      codeDesc,
      codeDisabled,
    } = $model.selectors.getState(state);
    return { fDate, loginTitle, isForgetPwd, codeDesc, codeDisabled };
  },
  (dispatch, { $model, $globalActions }) => {
    return {
      onLoginAction() {
        // dispatch($model.actions.requestSmsCode());
      },
      backLoginAction() {
        dispatch($model.actions.setState({ isForgetPwd: false }));
      },
      getCodeAction() {
        dispatch($model.actions.getCode());
      },
    };
  }
)(ForgetPwd);
