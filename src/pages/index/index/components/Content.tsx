import React from "react";
import { ProCard } from "@ant-design/pro-components";
import PanelGroup from "./PanelGroup";
import Notice from "./Notice";
import { Collapse, Button, Row, Col, Space } from "antd";

const { Panel } = Collapse;
export default () => {
  return (
    <>
      <PanelGroup />
      <Notice />
      <Row gutter={[12, 12]}>
        <Col span={24}>2222</Col>
        <Col span={24}>44444</Col>
      </Row>
      <ProCard>
        <Collapse collapsible="disabled" bordered={true} defaultActiveKey={[1]}>
          <Panel
            showArrow={false}
            header={
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  color: "rgba(0, 0, 0, 0.88)",
                  // color: "rgb(22, 119, 255)",
                }}
              >
                常用流程
              </span>
            }
            key="1"
          >
            <Space size={"large"}>
              <Button>信用ad法萨芬的啊啊的份上</Button>
              <Button>搜房网二</Button>
              <Button>维吾尔</Button>
              <Button>阿斯顿发送到发送到</Button>
            </Space>
          </Panel>
          <Panel showArrow={false} header="日常流程" key="2">
            <p>常用流程</p>
          </Panel>
          <Panel showArrow={false} header="权限流程" key="3">
            <p>常用流程</p>
          </Panel>
        </Collapse>
      </ProCard>
    </>
  );
};
