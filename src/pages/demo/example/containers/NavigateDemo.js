import { connect } from "react-redux";
import NavigateDemo from "../components/NavigateDemo";

export default connect(
  (state) => state,
  (dispatch, { $globalActions }) => {
    return {
      redirect() {
        dispatch($globalActions.navigate.redirect({ url: "/backend/index" }));
      },
      goTo() {
        dispatch($globalActions.navigate.goTo({ url: "/backend/index" }));
      },
      goBack() {
        dispatch($globalActions.navigate.goBack());
      },
    };
  }
)(NavigateDemo);
