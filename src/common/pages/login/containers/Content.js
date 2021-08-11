import { connect } from "react-redux";
import Content from "../components/Content";

export default connect(
  (state, { $model }) => {
    const { fDate, loginTitle } = $model.selectors.getState(state);
    return { fDate, loginTitle };
  },
  (dispatch, { $model, $globalActions }) => {
    return {
      onLoginAction() {
        dispatch($model.actions.requestSmsCode());
      },
    };
  }
)(Content);
