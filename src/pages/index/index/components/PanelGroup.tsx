import React from 'react';
import { Row, Col, Statistic } from 'antd';
import {
  TeamOutlined,
  MessageOutlined,
  PayCircleOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import '../index.less';

/**
 * 数据为静态数据，根据已有逻辑写死，无意义数据
 */
export default () => {
  return (
    <>
      <Row gutter={16} className='card-panel-col'>
        <Col className='gutter-row' span={6}>
          <div className='card-panel'>
            <div className='card-panel-icon-wrapper icon-people'>
              <TeamOutlined className='card-panel-icon' />
            </div>
            <div className='card-panel-description'>
              <Statistic title='访客' value={0}></Statistic>
            </div>
          </div>
        </Col>
        <Col className='gutter-row' span={6}>
          <div className='card-panel'>
            <div className='card-panel-icon-wrapper icon-message'>
              <MessageOutlined className='card-panel-icon' />
            </div>
            <div className='card-panel-description'>
              <div className='card-panel-text'>消息</div>
              <div className='card-panel-num'>0</div>
            </div>
          </div>
        </Col>
        <Col className='gutter-row' span={6}>
          <div className='card-panel'>
            <div className='card-panel-icon-wrapper icon-money'>
              <PayCircleOutlined className='card-panel-icon' />
            </div>
            <div className='card-panel-description'>
              <div className='card-panel-text'>金额</div>
              <div className='card-panel-num'>0</div>
            </div>
          </div>
        </Col>
        <Col className='gutter-row' span={6}>
          <div className='card-panel'>
            <div className='card-panel-icon-wrapper icon-shopping'>
              <ShoppingCartOutlined className='card-panel-icon' />
            </div>
            <div className='card-panel-description'>
              <div className='card-panel-text'>订单</div>
              <div className='card-panel-num'>0</div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
