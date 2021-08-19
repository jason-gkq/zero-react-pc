import { connect } from "react-redux";
import LoginContent from "../components/LoginContent";

export default connect(
  (state, { $model }) => {
    const { fDate, loginTitle, isForgetPwd } = $model.selectors.getState(state);
    return { fDate, loginTitle, isForgetPwd };
  },
  (dispatch, { $model, $globalActions }) => {
    return {
      onLoginAction(e) {       
        dispatch($model.actions.requestSmsCode(e));
      },
      showForgetAction() {
        dispatch($model.actions.setState({ isForgetPwd: true }));
      },
    };
  }
)(LoginContent);
