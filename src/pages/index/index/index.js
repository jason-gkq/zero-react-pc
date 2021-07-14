import React, { Component } from "react";
import { connect } from "react-redux";
import * as styles from "./index.less";
import { BasePage } from "@/common/core";
import model from "./index.model";

import { globalActions } from "@/common/redux";

@BasePage(model)
class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/* <PageContent/> */}
        <div className={styles.testContainer}>
          <div onClick={this.props.addVoucher} className={styles.containerDiv}>
            我是一个home
          </div>
          <div onClick={this.props.goTo} className={styles.containerDiv}>
            我是一个很多字div{" "}
          </div>
          <div className={styles.containerDiv}>我是一个更多字而且第三个div</div>
        </div>
      </div>
    );
  }
}
// export default Connect(Home);

export default connect(
  (state) => {
    return state;
  },
  (dispatch) => {
    return {
      addVoucher() {
        // store.dispatch(store.globalActions.test());
        // dispatch(model.action.changeName("dsfds"));
      },
      goTo() {
        dispatch(globalActions.navigate.goTo({ url: "/home/home1" }));
      },
    };
  }
)(Index);
