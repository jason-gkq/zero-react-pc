import React, { useEffect, useReducer, Reducer } from 'react';
import { Row, Col, Card, List } from 'antd';
import { getUserProfile } from '../service';
import {
  UserOutlined,
  MobileOutlined,
  MailOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import '../index.less';
import ResetPwd from './ResetPwd';
interface IState {
  user: any;
  roleGroup: string;
  loading: boolean;
}

export default () => {
  const [state, setState] = useReducer<Reducer<IState, Partial<IState>>>(
    (state, newState) => ({ ...state, ...newState }),
    {
      user: null,
      roleGroup: '',
      loading: true,
    }
  );
  const { user, roleGroup, loading } = state;

  useEffect(() => {
    getUserProfile()
      .then((result) => {
        setState({
          user: result.data,
          roleGroup: result.roleGroup,
          loading: false,
        });
      })
      .catch((e) => {
        setState({
          loading: false,
        });
      });
  }, []);

  const dataSource = [
    {
      title: '用户名称',
      description: user?.userName,
      avatar: <UserOutlined />,
    },
    {
      title: '手机号码',
      description: user?.phonenumber,
      avatar: <MobileOutlined />,
    },
    {
      title: '用户邮箱',
      description: user?.email,
      avatar: <MailOutlined />,
    },
    {
      title: '所属角色',
      description: roleGroup,
      avatar: <TeamOutlined />,
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card loading={loading} title='个人信息'>
            <List
              dataSource={dataSource}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta avatar={item.avatar} title={item.title} />
                  <div>{item.description}</div>
                </List.Item>
              )}
            ></List>
          </Card>
        </Col>
        <Col span={16}>
          <Card loading={loading} title='修改密码'>
            <ResetPwd />
          </Card>
        </Col>
      </Row>
    </>
  );
};
