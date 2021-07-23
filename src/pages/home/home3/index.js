import React, { Component } from "react";
import { connect } from "react-redux";

import { BasePage } from "@/common/core";
import model from "./index.model";

import { globalActions } from "@/common/redux";
import { Button } from "@/common/components";
import "./index.less";
@BasePage(model)
class Home extends Component {
  constructor(props) {
    super(props);
    // console.log("home3-props", props);
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <Button type='primary'>4444s</Button>
        <div className='test-container'>
          <div onClick={this.props.addVoucher} className='container-div'>
            我是一个home3
          </div>
          <div onClick={this.props.goTo} className='container-div'>
            我是一个很多字div{" "}
          </div>
          <div
            onClick={() => {
              dispatch(globalActions.navigate.goBack());
            }}
            className='container-div'
          >
            我是一个更多字而且第三个div
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return state;
  },
  (dispatch) => {
    return {
      addVoucher() {
        dispatch(model.action.changeName("dsfds"));
      },
      goTo() {
        dispatch(globalActions.navigate.goTo({ url: "/home/home1/index" }));
      },
    };
  }
)(Home);
