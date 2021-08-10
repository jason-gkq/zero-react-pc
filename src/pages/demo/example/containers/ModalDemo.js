import { connect } from "react-redux";
import ModalDemo from "../components/ModalDemo";

export default connect(
  (state, { $model }) => {
    const { isModalVisible } = $model.selectors.getState(state);
    return { isModalVisible };
  },
  (dispatch, { $model }) => {
    return {
      handleOk() {
        dispatch($model.actions.setState({ isModalVisible: false }));
      },
      handleCancel() {
        dispatch($model.actions.setState({ isModalVisible: false }));
      },
      showModal() {
        dispatch($model.actions.setState({ isModalVisible: true }));
      },
    };
  }
)(ModalDemo);
