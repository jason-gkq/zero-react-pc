import React, { Component } from "react";
import { connect } from "react-redux";

import { BasePage } from "@/common/core";
import model from "./index.model";

import { globalActions } from "@/common/redux";
import { Button } from "@/common/components";
import "./index.less";

import ReactToPrint from "react-to-print";

export class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <table>
        <thead>
          <th>column 1</th>
          <th>column 2</th>
          <th>column 3</th>
        </thead>
        <tbody>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

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
        <div>
          <ReactToPrint
            trigger={() => {
              // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
              // to the root node of the returned component as it will be overwritten.
              return <Button type='primary'>4444s</Button>;
            }}
            content={() => this.componentRef}
          />
          <ComponentToPrint ref={(el) => (this.componentRef = el)} />
        </div>
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
