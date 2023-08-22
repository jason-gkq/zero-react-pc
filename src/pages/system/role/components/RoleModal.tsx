import React from 'react';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { Form, Input, Select, message, InputNumber, Tree } from 'antd';
import { useSelectEnum, NiceModal, useNiceModal } from '@/zero';
import { addRole, updateRole } from '../service';
import { IResGetTreeselect, IMenuTreeData } from '../service/index.d';
import { SYS_COMMON_STATUS } from '@/common/enum/system';

const dictNormalDisable = useSelectEnum(SYS_COMMON_STATUS, 'value', 'label');
export const ROLE_MODAL_ID = 'system-role-modal';

export default NiceModal.create(
  ROLE_MODAL_ID,
  ({ modalInfo, menuOptions, menuCheckedKeys }: any) => {
    const modal = useNiceModal(ROLE_MODAL_ID);
    const [expandedKeys, setExpandedKeys] = useState<never[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
    const [checkedKeys, setCheckedKeys] =
      useState<React.Key[]>(menuCheckedKeys);

    const [menuTreeData, setMenuTreeData] = useState<IMenuTreeData[]>([]);
    const [form] = Form.useForm();

    const handleSubmit = useCallback(() => {
      form
        .validateFields()
        .then((data) => {
          const requestData = {
            ...modalInfo,
            ...data,
            roleSort: data.roleSort || 1,
            menuIds: checkedKeys || [],
          };
          if (modalInfo && modalInfo.roleId) {
            /* 修改 */
            updateRole(requestData)
              .then((res) => {
                form.resetFields();
                message.success('修改成功');
                modal.resolve({ ...modalInfo, ...form.getFieldsValue() });
                modal.hide();
              })
              .catch((e) => {
                message.error(e?.msg || '修改失败');
              });
          } else {
            /* 新增 */
            addRole(requestData)
              .then((response) => {
                form.resetFields();
                message.success('新增成功');
                modal.resolve({ ...modalInfo, ...form.getFieldsValue() });
                modal.hide();
              })
              .catch((e) => {
                message.error(e?.msg || '新增失败');
              });
          }
        })
        .catch((e) => {});
    }, [modal, modalInfo, form, checkedKeys]);

    /* 菜单权限展示操作 */
    const onExpand = useMemo<any>(() => {
      const onExpand = (expandedKeys: never[]) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
      };
      return onExpand;
    }, [expandedKeys]);

    useEffect(() => {
      const getMenuTreeData = (
        menuOptions: IResGetTreeselect[],
        pIds: number[]
      ) => {
        if (!menuOptions) return;
        return menuOptions.reduce((list: any, item: IResGetTreeselect) => {
          if (Reflect.has(item, 'children')) {
            list.push({
              key: item.id,
              value: item.id,
              title: item.label,
              parentIds: pIds,
              children: getMenuTreeData((item as any).children, [
                ...pIds,
                item.id,
              ]),
            });
          } else {
            list.push({
              key: item.id,
              value: item.id,
              title: item.label,
              parentIds: pIds,
            });
          }
          return list;
        }, []);
      };
      const treeData = getMenuTreeData(menuOptions, []);
      setMenuTreeData(treeData);
    }, [menuOptions]);

    const onCheck = (checkedKeys: React.Key[]) => {
      setCheckedKeys(checkedKeys);
    };
    return (
      <NiceModal
        id={ROLE_MODAL_ID}
        title={modalInfo ? '修改角色' : '添加角色'}
        okText={'确定'}
        cancelText='取消'
        onOk={handleSubmit}
      >
        <Form form={form} initialValues={modalInfo} labelAlign={'left'}>
          <Form.Item
            name={`roleName`}
            label={`角色名称`}
            rules={[
              {
                required: true,
                message: '请输入角色名称!',
              },
            ]}
          >
            <Input placeholder='请输入角色名称' />
          </Form.Item>
          <Form.Item
            name={`roleKey`}
            label={`权限字符`}
            rules={[
              {
                required: true,
                message: '请输入权限字符!',
              },
            ]}
          >
            <Input placeholder='请输入权限字符' />
          </Form.Item>
          <Form.Item
            name={`roleSort`}
            label={`角色顺序`}
            rules={[
              {
                required: true,
                message: '请输入角色顺序!',
              },
            ]}
          >
            <InputNumber min={0} defaultChecked />
          </Form.Item>
          <Form.Item
            name={`status`}
            label={`状态`}
            rules={[
              {
                required: true,
                message: '请选择状态!',
              },
            ]}
          >
            <Select
              placeholder='请选择状态'
              options={dictNormalDisable.getOptions()}
            />
          </Form.Item>
          <Form.Item name={`menuIds`} label={`菜单权限`}>
            <Tree
              checkable
              checkedKeys={checkedKeys}
              autoExpandParent={autoExpandParent}
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              onCheck={(checkedKeys: any) => {
                onCheck(checkedKeys as React.Key[]);
              }}
              treeData={menuTreeData}
            ></Tree>
          </Form.Item>

          <Form.Item name={`remark`} label='备注'>
            <Input.TextArea placeholder='请输入内容' />
          </Form.Item>
        </Form>
      </NiceModal>
    );
  }
);
