import { connect } from "react-redux";
import Content from "../components/Content";

export default connect(
  (state, { $model, $globalActions, $globalSelectors }) => {
    const { pageStatus } = $model.selectors.getState(state);
    return { pageStatus };
  },
  (dispatch, { $model, $globalActions, $globalSelectors }) => {
    return {
      addVoucher() {
        // document.documentElement.style.setProperty({ "--theme-color": "red" });
        dispatch($model.actions.setState({ pageStatus: "cccccc" }));
        dispatch($globalActions.env.changeTheme({ theme: "C" }));
      },
      goTo() {
        dispatch($globalActions.navigate.goTo({ url: "/index/index/index" }));
      },
      goBack() {
        dispatch($globalActions.navigate.goBack());
      },
    };
  }
)(Content);
