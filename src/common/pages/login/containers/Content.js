import { connect } from "react-redux";
import Content from "../components/Content";

export default connect(
  (state, { $model }) => {
    // const { pageStatus } = $model.selectors.getState(state);
    return {  };
  },
  (dispatch, { $model, $globalActions }) => {
    return {
      onLoginAction() {
        dispatch($model.actions.requestSmsCode())
      }
    };
  }
)(Content);
