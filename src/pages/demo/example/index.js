import React, { Component } from "react";
import { BasePage } from "@/zero/core";
import model from "./index.model";
import "./index.less";

import ComponentsDemo from "./components/ComponentsDemo";
import PrintDemo from "./components/PrintDemo";
import Content from "./containers/Content";
import ModalDemo from "./containers/ModalDemo";
import NavigateDemo from "./containers/NavigateDemo";

import ImageCode from "./components/ImageCode";

@BasePage(model)
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      arr: [
        "https://seopic.699pic.com/photo/50046/5562.jpg_wh1200.jpg",
        "https://www.isd.gov.hk/chi/images/gallery_calendar.jpg",
        "https://www.isd.gov.hk/chi/images/gallery_yearbook.jpg",
        "https://www.isd.gov.hk/chi/images/gallery_exhibitions.jpg",
        "https://www.isd.gov.hk/chi/images/gallery_general.jpg",
      ],
    };
  }

  componentDidMount() {
    this.setState({
      url:
        "https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_1440w.jpg?source=172ae18b",
    });
  }

  onReload = () => {
    let { arr } = this.state;
    // const index = Math.floor(Math.random() * arr.length);
    const url = arr.shift();
    this.setState({
      url,
      arr,
    });
  };

  render() {
    const { $model, $globalActions, $globalSelectors } = this.props;
    return (
      <>
        <div>
          <ImageCode
            imageUrl={this.state.url}
            onReload={this.onReload}
            onMatch={() => {
              console.log("code is match");
            }}
            onError={() => {
              console.log("code is error");
            }}
          />
        </div>
        <ComponentsDemo />
        <NavigateDemo $globalActions={$globalActions} />
        <ModalDemo $model={$model} />
        <PrintDemo />
        <Content
          $model={$model}
          $globalActions={$globalActions}
          $globalSelectors={$globalSelectors}
        />
      </>
    );
  }
}
