import React, { Component } from "react";
import { connect } from "react-redux";
import * as styles from "./index.less";
import { BasePage } from "@/common/core";
import model from "./index.model";

import { globalActions } from "@/common/redux";
import { Modal } from "antd";
@BasePage(model)
class Home extends Component {
  constructor(props) {
    super(props);
    // console.log("home2-ownProps", props);
    this.state = {
      isModalVisible: false,
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  handleOk() {
    this.setState({
      isModalVisible: false,
    });
  }
  handleCancel() {
    this.setState({
      isModalVisible: false,
    });
  }
  showModal() {
    this.setState({
      isModalVisible: true,
    });
  }
  render() {
    const { dispatch, addVoucher, goTo } = this.props;
    const { isModalVisible } = this.state;
    return (
      <>
        <Modal
          title='Basic Modal'
          visible={isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <div>
          {/* <PageContent/> */}
          <div className={styles.testContainer}>
            <div onClick={this.showModal} className={styles.containerDiv}>
              我是一个home2
            </div>
            <div onClick={goTo} className={styles.containerDiv}>
              我是asdfasdfdiv{" "}
            </div>
            <div
              onClick={() => {
                dispatch(globalActions.navigate.goBack());
              }}
              className={styles.containerDiv}
            >
              我是一个更多字而且第三个div
            </div>
          </div>
        </div>
      </>
    );
  }
}
// export default Connect(Home);

export default connect(
  (state, ownProps) => {
    // console.log("home2-ownProps", state["Home2"], ownProps);
    return state;
  },
  (dispatch) => {
    return {
      addVoucher() {
        // store.dispatch(store.globalActions.test());
      },
      goTo() {
        dispatch(
          globalActions.navigate.goTo({ url: "/home/home3/index?a=1&b=3" })
        );
      },
    };
  }
)(Home);
