import React, { useEffect, useState, useCallback } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  InputNumber,
  TreeSelect,
  message,
} from "antd";
import {
  useSelectEnum,
  useEnv,
  useMergeState,
  NiceModal,
  useNiceModal,
} from "@/zero";
import type { IResQueryMenuList } from "../service/index.d";
import { addMenu, updateMenu } from "../service/index";
import { SYS_SHOW_HIDE } from "@/common/enum/system";

const dictShowHide = useSelectEnum(SYS_SHOW_HIDE);

export const MODAL_ID = "system-menu-modal";
const { Option } = Select;

export default NiceModal.create(
  MODAL_ID,
  ({
    modalInfo,
    menuOptions,
    tag,
  }: {
    modalInfo: IResQueryMenuList;
    menuOptions: IResQueryMenuList[];
    tag: string;
  }) => {
    const [form] = Form.useForm();
    const modal = useNiceModal(MODAL_ID);
    const { routes } = useEnv();
    const [state, setState] = useMergeState({
      parentId: modalInfo.parentId,
      menuTreeData: [],
      componentList: [],
      routeList: [],
    });
    const { menuTreeData, parentId, componentList, routeList } = state;
    const [menuType, setMenuType] = useState<string>(modalInfo.menuType || "M");
    const dictComponentList = useSelectEnum(componentList);
    const tempObj: any = {};
    const dictRouteList = useSelectEnum(
      [...componentList, ...routeList].filter((item: any) => {
        return tempObj[item.routes] ? false : (tempObj[item.routes] = true);
      }),
      "routes",
      "label"
    );
    const validateUserTrim = (rule: any, value: any, label?: string) => {
      if (!value || !value.trim()) {
        return Promise.reject(`请填写有效的${label}`);
      }
      return Promise.resolve();
    };
    useEffect(() => {
      const getRouters = (data: any[], prefix = "") => {
        let res: any[] = [];
        for (let i = 0; i < data.length; i++) {
          const { path, name, children, component } = data[i];
          // 获取树形结构的path路径，用于获取component
          const newprefix = prefix ? `${prefix}/${path}` : path;
          if (children && Array.isArray(children) && children.length > 0) {
            res = res.concat(getRouters(children, newprefix));
          } else {
            const newElement = component ? component : newprefix;
            name &&
              res.push({
                value: newElement,
                routes: `/${newElement}`,
                label: name,
              });
          }
        }
        return res;
      };
      setState({ componentList: getRouters(routes) });
    }, [JSON.stringify(routes)]);

    useEffect(() => {
      const res: any[] = [];
      const getMenuTreeData = (
        menuOptions: IResQueryMenuList[],
        pIds: number[],
        prefix = ""
      ) => {
        if (!menuOptions) return;
        return menuOptions.reduce((list: any, item: IResQueryMenuList) => {
          const newprefix = prefix ? `${prefix}/${item.path}` : item.path;
          if (item.menuType == "F") {
            return list;
          }
          if (Reflect.has(item, "children")) {
            list.push({
              key: item.menuId,
              value: item.menuId,
              title: item.menuName,
              parentIds: pIds,
              children: getMenuTreeData(
                (item as any).children,
                [...pIds, item.menuId],
                newprefix
              ),
            });
          } else {
            res.push({
              routes: `/${newprefix}`,
              label: item.menuName,
            });
            list.push({
              key: item.menuId,
              value: item.menuId,
              title: item.menuName,
              parentIds: pIds,
            });
          }
          return list;
        }, []);
      };

      const menu = {
        key: 0,
        value: 0,
        title: "主类目",
        parentIds: [],
        children: [],
      };
      menu.children = getMenuTreeData(menuOptions, []);
      setState({
        menuTreeData: [menu],
        routeList: res,
      });
    }, [JSON.stringify(menuOptions)]);

    const handleSubmit = useCallback(() => {
      form
        .validateFields()
        .then((data) => {
          const formValues = {
            ...modalInfo,
            ...data,
            menuName: data.menuName && data.menuName.trim(),
            path: data.path && data.path.trim(),
            perms: data.perms && data.perms.trim(),
          };
          if (tag === "add") {
            addMenu(formValues)
              .then((response) => {
                message.success("新增成功");
                modal.resolve({ ...modalInfo, ...form.getFieldsValue() });
                modal.hide();
              })
              .catch((e) => {
                message.error(e?.msg || "新增失败");
              });
          } else if (tag === "update") {
            updateMenu(formValues)
              .then((response) => {
                message.success("修改成功");
                modal.resolve({ ...modalInfo, ...form.getFieldsValue() });
                modal.hide();
              })
              .catch((e) => {
                message.error(e?.msg || "修改失败");
              });
          }
        })
        .catch((e) => {});
    }, [JSON.stringify(modalInfo), form]);

    const onChange = (parentId: number) => {
      setState({
        parentId,
      });
    };
    return (
      <NiceModal
        id={MODAL_ID}
        title={tag === "update" ? "修改菜单" : "添加菜单"}
        okText="确定"
        cancelText="取消"
        onOk={handleSubmit}
        width="750px"
      >
        <Form
          onValuesChange={(changedValues, allValues) => {
            if (changedValues.component || changedValues.menuType) {
              if (allValues.menuType === "C" && allValues.component) {
                form.setFieldValue(
                  "perms",
                  allValues.component.replaceAll("/", ":")
                );
              } else {
                form.setFieldValue("perms", null);
              }
            }
          }}
          form={form}
          initialValues={modalInfo}
          labelAlign={"left"}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name={`parentId`} label={`上级菜单`}>
                <TreeSelect
                  showSearch
                  style={{ width: "100%" }}
                  value={parentId}
                  dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  placeholder="请选择上级菜单"
                  allowClear
                  treeDefaultExpandAll
                  onChange={onChange}
                  treeData={menuTreeData}
                ></TreeSelect>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name={`menuType`} label={`菜单类型`}>
                <Select placeholder="请选择" onChange={setMenuType}>
                  <Option key={"M"} value="M">
                    目录
                  </Option>
                  <Option key={"C"} vallue="C">
                    菜单
                  </Option>
                  <Option key={"F"} value="F">
                    操作
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={`menuName`}
                label={`菜单名称`}
                rules={[
                  {
                    required: true,
                    message: "菜单名称不能为空",
                  },
                  {
                    max: 8,
                    message: "菜单名称不能超过8个字",
                  },
                  {
                    validator: (rule: any, value: any, callback: Function) =>
                      validateUserTrim(rule, value, "菜单名称"),
                  },
                ]}
              >
                <Input placeholder="请输入菜单名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={`orderNum`}
                label={`显示排序`}
                rules={[
                  {
                    required: true,
                    message: "菜单顺序不能为空!",
                  },
                ]}
              >
                <InputNumber min={0} defaultChecked />
              </Form.Item>
            </Col>
            {["M", "C"].includes(menuType) && (
              <Col span={12}>
                <Form.Item
                  name={`icon`}
                  label={`菜单图标`}
                  extra={
                    <span>
                      打开
                      <a
                        href="https://ant.design/components/icon-cn/"
                        target="_blank"
                      >
                        图标
                      </a>
                      页面复制图标名称填入
                    </span>
                  }
                  rules={[
                    {
                      max: 50,
                      message: "菜单图标不能超过50个字",
                    },
                    {
                      pattern: /^\w+$/,
                      message: "菜单图标只能为字符数字和下划线组成",
                    },
                  ]}
                >
                  <Input placeholder="请输入菜单图标" />
                </Form.Item>
              </Col>
            )}
            {["M", "C"].includes(menuType) && (
              <Col span={12}>
                <Form.Item
                  name={`visible`}
                  label={`菜单状态`}
                  initialValue="0"
                  rules={[
                    {
                      required: true,
                      message: "菜单状态不能为空!",
                    },
                  ]}
                >
                  <Select placeholder="请选择">
                    {dictShowHide.getOptions()}
                  </Select>
                </Form.Item>
              </Col>
            )}
            {["M", "C"].includes(menuType) && (
              <Col span={12}>
                <Form.Item
                  name={`path`}
                  label={`路由地址`}
                  rules={[
                    {
                      required: true,
                      message: "路由地址不能为空!",
                    },
                    {
                      max: 15,
                      message: "路由地址不能超过15个字",
                    },
                    {
                      pattern: /^\w+$/, // ^[A-Za-z0-9]+$  ^\w+$
                      message: "菜单图标只能为字符数字和下划线组成",
                    },
                  ]}
                >
                  <Input placeholder="请输入路由地址" />
                </Form.Item>
              </Col>
            )}
            {["M", "C"].includes(menuType) && (
              <Col span={12}>
                <Form.Item
                  name={`component`}
                  label={`页面`}
                  rules={[
                    {
                      required: menuType === "C",
                      message: "请选择菜单落地页面!",
                    },
                  ]}
                >
                  <Select placeholder="请选择组件路径">
                    {dictComponentList && dictComponentList.getOptions()}
                  </Select>
                </Form.Item>
              </Col>
            )}
            {["M"].includes(menuType) && (
              <Col span={12}>
                <Form.Item name={`redirect`} label={`重定向地址`}>
                  <Select placeholder="请选择重定向地址">
                    {dictRouteList && dictRouteList.getOptions()}
                  </Select>
                </Form.Item>
              </Col>
            )}
            {["C", "F"].includes(menuType) && (
              <Col span={12}>
                <Form.Item
                  name={`perms`}
                  label={`权限标识`}
                  rules={[
                    {
                      max: 50,
                      message: "权限标识不能超过50个字",
                    },
                  ]}
                >
                  <Input maxLength={50} placeholder="请输入权限标识" />
                </Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </NiceModal>
    );
  }
);
