import React, { useEffect, useState, useReducer, Reducer } from "react";
import { Row, Col, Card, List } from "antd";
import UserAvatar from "./UserAvatar";
import UserInfo from "../containers/UserInfo";
import ResetPwd from "./ResetPwd";
import { getUserProfile } from "../service";
import { IUserInfoForm, IPwd } from "../service/index.d";
import {
  UserOutlined,
  MobileOutlined,
  MailOutlined,
  ApartmentOutlined,
  TeamOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "../index.less";

interface IState {
  user: any;
  postGroup: string;
  roleGroup: string;
}

export default () => {
  const [state, setState] = useReducer<Reducer<IState, Partial<IState>>>(
    (state, newState) => ({ ...state, ...newState }),
    {
      user: null,
      postGroup: "",
      roleGroup: "",
    }
  );
  const { user, postGroup, roleGroup } = state;
  const [activeTabKey, setActiveTabKey] = useState("userinfo");

  useEffect(() => {
    const getUser = async () => {
      const result = await getUserProfile();
      if (result) {
        setState({
          user: result.data,
          postGroup: result.postGroup,
          roleGroup: result.roleGroup,
        });
      }
    };
    getUser();
  }, []);

  const dataSource = [
    {
      title: "用户名称",
      description: user?.userName,
      avatar: <UserOutlined />,
    },
    {
      title: "手机号码",
      description: user?.phonenumber,
      avatar: <MobileOutlined />,
    },
    {
      title: "用户邮箱",
      description: user?.email,
      avatar: <MailOutlined />,
    },
    {
      title: "所属部门",
      description: user?.dept.deptName + "/" + postGroup,
      avatar: <ApartmentOutlined />,
    },
    {
      title: "所属角色",
      description: roleGroup,
      avatar: <TeamOutlined />,
    },
    {
      title: "创建日期",
      description: user?.createTime,
      avatar: <CalendarOutlined />,
    },
  ];

  const tabList = [
    {
      key: "userinfo",
      tab: "基本资料",
    },
    {
      key: "resetPwd",
      tab: "修改密码",
    },
  ];

  const userInfo: IUserInfoForm | null = user && {
    nickName: user.nickName,
    phonenumber: user.phonenumber,
    email: user.email,
    sex: user.sex,
  };

  const pwdInfo: IPwd | null = user && {
    oldPassword: user.oldPassword,
    newPassword: user.newPassword,
    confirmPassword: user.confirmPassword,
  };

  const contentList: any = {
    userinfo: <UserInfo user={userInfo} />,
    resetPwd: <ResetPwd user={pwdInfo} />,
  };

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <>
      <Row>
        <Col span={8}>
          <Card title='个人信息'>
            <div className='text-center'>
              <UserAvatar avatar={user?.avatar} />
            </div>
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
          <Card
            title='基本资料'
            tabList={tabList}
            activeTabKey={activeTabKey}
            onTabChange={(key) => {
              onTabChange(key);
            }}
          >
            {contentList[activeTabKey]}
          </Card>
        </Col>
      </Row>
    </>
  );
};
