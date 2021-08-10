import React from "react";
import { View, Text, Button } from "@/zero/components";
import ReactToPrint from "react-to-print";

/**
 * 打印功能demo
 *  https://github.com/gregnb/react-to-print
 * 打印组件必须基于 class
 */

class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ width: "80%", margin: "10px auto" }}>
        <View>这是打印内容</View>
        <View>
          <Text>column 1</Text>
          <Text>column 2</Text>
          <Text>column 3</Text>
        </View>
        <View>
          <Text>data 1</Text>
          <Text>data 2</Text>
          <Text>data 3</Text>
        </View>
      </View>
    );
  }
}

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ width: "30%", margin: "10px auto" }}>
        <ReactToPrint
          trigger={() => {
            return <Button type='primary'>打印</Button>;
          }}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={(el) => (this.componentRef = el)} />
      </View>
    );
  }
}
