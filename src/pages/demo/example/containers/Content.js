import { connect } from "react-redux";
import Content from "../components/Content";

export default connect(
  (state, { $model, $globalActions, $globalSelectors }) => {
    const { pageStatus, systemName } = $model.selectors.getState(state);
    return { pageStatus, systemName };
  },
  (dispatch, { $model, $globalActions, $globalSelectors }) => {
    return {
      addVoucher() {
        dispatch($model.actions.getAuthData({ pageStatus: "success" }));
        // dispatch($globalActions.env.changeTheme({ theme: "C" }));
      },
      goTo() {
        dispatch($globalActions.navigate.goTo({ url: "/index" }));
      },
      goBack() {
        dispatch($globalActions.navigate.goBack());
      },
    };
  }
)(Content);
