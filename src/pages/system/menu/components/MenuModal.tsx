import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useCallback } from "react";
import { Form, Input, Select, InputNumber, TreeSelect, message } from "antd";
import { NiceModal, useNiceModal } from "@/src/zero/components";
import type { IResQueryMenuList, IMenuTreeData } from "../service/index.d";
import { addMenu, updateMenu } from "../service/index";

export const MODAL_ID = "system-menu-modal";
const { Option } = Select;

export default NiceModal.create(
  MODAL_ID,
  ({
    modalInfo,
    menuOptions,
    tag,
    dictShowHide,
    getDictData,
  }: {
    modalInfo: IResQueryMenuList;
    menuOptions: IResQueryMenuList[];
    tag: string;
    dictShowHide: any;
    getDictData: any;
  }) => {
    const [form] = Form.useForm();

    const modal = useNiceModal(MODAL_ID);
    const [menuTreeData, setMenuTreeData] = useState<IMenuTreeData[]>([]);
    const [parentId, setParentId] = useState<number>(modalInfo.parentId);
    const [menuType, setMenuType] = useState<string>(modalInfo.menuType || "M");

    useEffect(() => {
      getDictData();
    }, []);

    useEffect(() => {
      const getMenuTreeData = (
        menuOptions: IResQueryMenuList[],
        pIds: number[]
      ) => {
        if (!menuOptions) return;
        return menuOptions.reduce((list: any, item: IResQueryMenuList) => {
          if (Reflect.has(item, "children")) {
            list.push({
              key: item.menuId,
              value: item.menuId,
              title: item.menuName,
              parentIds: pIds,
              children: getMenuTreeData((item as any).children, [
                ...pIds,
                item.menuId,
              ]),
            });
          } else {
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
      setMenuTreeData([menu]);
    }, [menuOptions]);

    const handleSubmit = useCallback(() => {
      form
        .validateFields()
        .then(() => {
          const formValues = {
            ...modalInfo,
            ...form.getFieldsValue(),
          };
          Object.assign(formValues, {
            menuName: formValues.menuName && formValues.menuName.trim(),
            path: formValues.path && formValues.path.trim(),
            component: formValues.component && formValues.component.trim(),
            perms: formValues.perms && formValues.perms.trim(),
          });
          console.log(formValues);

          if (tag === "add") {
            addMenu(formValues)
              .then((response) => {
                if (response.code === 200) {
                  message.success("新增成功");
                  modal.resolve({ ...modalInfo, ...form.getFieldsValue() });
                  modal.hide();
                } else {
                  message.error(response?.msg || "新增失败");
                }
              })
              .catch((e) => {
                message.error(e?.msg || "新增失败");
              });
          } else if (tag === "update") {
            updateMenu(formValues)
              .then((response) => {
                if (response.code === 200) {
                  message.success("修改成功");
                  modal.resolve({ ...modalInfo, ...form.getFieldsValue() });
                  modal.hide();
                } else {
                  message.error(response?.msg || "修改失败");
                }
              })
              .catch((e) => {
                message.error(e?.msg || "修改失败");
              });
          }
        })
        .catch((e) => {});
    }, [modal, modalInfo, form]);

    const onChange = (parentId: number) => {
      setParentId(parentId);
    };
    return (
      <NiceModal
        id={MODAL_ID}
        title={tag === "update" ? "修改菜单" : "添加菜单"}
        okText='确定'
        cancelText='取消'
        onOk={handleSubmit}
        width='750px'
      >
        <Form form={form} initialValues={modalInfo} labelAlign={"left"}>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name={`parentId`} label={`上级菜单`}>
                <TreeSelect
                  showSearch
                  style={{ width: "100%" }}
                  value={parentId}
                  dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  placeholder='请选择上级菜单'
                  allowClear
                  treeDefaultExpandAll
                  onChange={onChange}
                  treeData={menuTreeData}
                ></TreeSelect>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name={`menuType`} label={`菜单类型`}>
                <Select placeholder='请选择' onChange={setMenuType}>
                  <Option key={"M"} value='M'>
                    目录
                  </Option>
                  <Option key={"C"} vallue='C'>
                    菜单
                  </Option>
                  <Option key={"F"} value='F'>
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
                ]}
              >
                <Input placeholder='请输入菜单名称' />
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
            {/* TODO: */}
            {["M", "C"].includes(menuType) && (
              <Col span={12}>
                <Form.Item name={`icon`} label={`菜单图标`}>
                  <Input placeholder='点击选择图标' />
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
                  ]}
                >
                  <Input placeholder='请输入路由地址' />
                </Form.Item>
              </Col>
            )}
            {["C"].includes(menuType) && (
              <Col span={24}>
                <Form.Item
                  name={`component`}
                  label={`组件路径`}
                  rules={[
                    {
                      required: true,
                      message: "组件路径不能为空!",
                    },
                  ]}
                >
                  <Input placeholder='请输入组件路径' />
                </Form.Item>
              </Col>
            )}
            {["C", "F"].includes(menuType) && (
              <Col span={24}>
                <Form.Item name={`perms`} label={`权限标识`}>
                  <Input maxLength={50} placeholder='请输入权限标识' />
                </Form.Item>
              </Col>
            )}
            {["M", "C"].includes(menuType) && (
              <Col span={12}>
                <Form.Item name={`visible`} label={`菜单状态`}>
                  <Select placeholder='请选择'>
                    {dictShowHide.getOptions()}
                  </Select>
                </Form.Item>
              </Col>
            )}
            {["M", "C"].includes(menuType) && (
              <Col span={12}>
                <Form.Item name={`hidden`} label='隐藏路由'>
                  <Select placeholder='请选择是否隐藏路由'>
                    <Option key='1'>是</Option>
                    <Option key='0'>否</Option>
                  </Select>
                </Form.Item>
              </Col>
            )}
            {["C"].includes(menuType) && (
              <Col span={12}>
                <Form.Item name={`isFrame`} label={`是否外链`}>
                  <Select placeholder='请选择是否外链'>
                    <Option key='0'>是</Option>
                    <Option key='1'>否</Option>
                  </Select>
                </Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </NiceModal>
    );
  }
);
