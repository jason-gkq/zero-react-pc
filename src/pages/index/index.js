import React, { Component } from "react";
import { connect } from "react-redux";
import * as styles from "./index.less";
import { BasePage } from "@/zero/core";
import model from "./index.model";

import { globalActions } from "@/zero/redux";
import { Loading } from "@/zero/components";

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
            <Loading msg={"This is homePage"} />
          </div>
          <div onClick={this.props.goTo} className={styles.containerDiv}>
            go to demo
          </div>
          <div className={styles.containerDiv}>other</div>
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
        dispatch(globalActions.navigate.goTo({ url: "/backend/demo/example" }));
      },
    };
  }
)(Index);
