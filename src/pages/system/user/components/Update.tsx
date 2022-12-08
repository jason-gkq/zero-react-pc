import React, { useEffect, useState } from "react";
import { getUser, addUser, updateUser, getConfigKey } from "../service";
import type { IDeptTreeData } from "../service/index.d";
import {
  Modal,
  Form,
  Input,
  TreeSelect,
  Row,
  Col,
  Select,
  message,
} from "antd";
import type { IUseSelectEnum } from "@/zero";

const { Option } = Select;

type IUpdateProps = {
  isModalVisible: boolean;
  setIsModalVisible: Function;
  userId?: number;
  deptTreeData: IDeptTreeData[];
  dictUserSex: IUseSelectEnum;
  dictNormalDisable: IUseSelectEnum;
};

export default (props: IUpdateProps) => {
  const {
    isModalVisible,
    setIsModalVisible,
    userId,
    deptTreeData,
    dictUserSex,
    dictNormalDisable,
  } = props;
  const [postChldrens, setPostChldrens] = useState<React.ReactNode[]>();
  const [roleChldrens, setRoleChldrens] = useState<React.ReactNode[]>([]);
  const [initPassword, setInitPassword] = useState<string>();
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((data) => {
        if (data.userId) {
          updateUser(Object.assign(data, { password: "" }))
            .then((response) => {
              message.success("修改成功");
              setIsModalVisible(true);
              form.resetFields();
            })
            .catch((e) => {
              message.error(e?.msg || "修改失败");
            });
        } else {
          addUser(Object.assign(data, { password: initPassword }))
            .then((response) => {
              message.success("新增成功");
              setIsModalVisible(true);
              form.resetFields();
            })
            .catch((e) => {
              message.error(e?.msg || "新增失败");
            });
        }
      })
      .catch((e) => {});
  };

  const handleCancel = () => {
    userId && form.resetFields();
    setIsModalVisible(false);
  };

  useEffect(() => {
    getConfigKey("sys.user.initPassword")
      .then(({ msg }) => {
        setInitPassword(msg);
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    const payload = userId || "";
    isModalVisible &&
      getUser(payload)
        .then(({ data, postIds, posts, roleIds, roles }) => {
          const postChldrens: React.ReactNode[] = [];
          posts &&
            posts.forEach((item) => {
              postChldrens.push(
                <Option key={item.postId}>{item.postName}</Option>
              );
            });
          const roleChldrens: React.ReactNode[] = [];
          roles &&
            roles.forEach((item) => {
              roleChldrens.push(
                <Option key={item.roleId}>{item.roleName}</Option>
              );
            });
          setRoleChldrens(roleChldrens);
          setPostChldrens(postChldrens);
          data &&
            form.setFieldsValue({
              userId: data.userId,
              deptId: data.deptId,
              nickName: data.nickName,
              phonenumber: data.phonenumber,
              email: data.email,
              userName: data.userName,
              sex: data.sex,
              status: data.status,
              postIds: postIds?.map(String),
              roleIds: roleIds?.map(String),
              remark: data.remark,
            });
        })
        .catch((e) => {
          const msg =
            e?.msg || userId
              ? "用户信息获取失败，请刷新页面重新操作"
              : "获取配置失败，请刷新重试";
          message.error(msg);
          setIsModalVisible(false);
        });
  }, [isModalVisible]);

  return (
    <>
      <Modal
        title={userId ? "更新用户信息" : "新增用户"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确定"
        width="750px"
      >
        <Form form={form}>
          <Form.Item name={`userId`} label={`用户ID`} hidden={true}>
            <Input placeholder="用户ID" />
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name={`nickName`}
                label={`用户昵称`}
                rules={[
                  {
                    required: true,
                    message: "请输入用户昵称!",
                  },
                ]}
              >
                <Input placeholder="请输入用户昵称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={`deptId`}
                label={`归属部门`}
                rules={[
                  {
                    required: true,
                    message: "请选择归属部门!",
                  },
                ]}
              >
                <TreeSelect
                  treeData={deptTreeData}
                  treeDefaultExpandAll
                  placeholder="请选择归属部门"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={`phonenumber`}
                label={`手机号码`}
                rules={[
                  {
                    required: true,
                    message: "请输入手机号码!",
                  },
                ]}
              >
                <Input placeholder="请输入手机号码" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={`email`}
                label={`邮箱`}
                rules={[
                  {
                    required: true,
                    message: "请输入邮箱!",
                  },
                  {
                    type: "email",
                    message: "请输入正确的邮箱!",
                  },
                ]}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={`userName`}
                label={`用户名称`}
                rules={[
                  {
                    required: true,
                    message: "请输入用户名称!",
                  },
                ]}
              >
                <Input placeholder="请输入用户名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={`sex`} label={`用户性别`}>
                <Select placeholder="请选择性别">
                  {dictUserSex.getOptions()}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={`status`}
                label={`状态`}
                rules={[
                  {
                    required: true,
                    message: "请选择状态!",
                  },
                ]}
              >
                <Select placeholder="请选择状态">
                  {dictNormalDisable.getOptions()}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={`postIds`} label={`岗位`}>
                <Select mode="multiple" placeholder="请选择岗位">
                  {postChldrens}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={`roleIds`}
                label={`角色`}
                rules={[
                  {
                    required: true,
                    message: "请选择角色!",
                  },
                ]}
              >
                <Select mode="multiple" placeholder="请选择角色">
                  {roleChldrens}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name={`remark`} label="备注">
                <Input.TextArea placeholder="请输入内容" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
