import React, { useMemo } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import type { IResQueryRoleList } from '../service/index.d';
import { PermissionA } from '@/zero';

const useColumns = (
  handleUpdate: any,
  handleDelete: any,
  dictNormalDisable: any
) => {
  const columns: ProColumns<IResQueryRoleList>[] = useMemo(() => {
    return [
      {
        title: '角色编号',
        dataIndex: 'roleId',
        hideInSearch: true,
        width: 80,
      },
      {
        title: '角色名称',
        dataIndex: 'roleName',
      },
      {
        title: '权限字符',
        dataIndex: 'roleKey',
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: dictNormalDisable.getEnum(),
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        hideInSearch: true,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        valueType: 'dateRange',
        hideInTable: true,
        search: {
          transform: (value) => {
            return {
              beginTime: value[0],
              endTime: value[1],
            };
          },
        },
      },
      {
        title: '操作',
        valueType: 'option',
        render: (text, record, index, action) => (
          <>
            <PermissionA
              permissions={['system:role:edit']}
              onClick={() => handleUpdate(record.roleId)}
            >
              修改
            </PermissionA>
            <PermissionA
              danger
              permissions={['system:role:remove']}
              onClick={() => handleDelete(record.roleId)}
            >
              删除
            </PermissionA>
          </>
        ),
      },
    ];
  }, [dictNormalDisable]);
  return { columns };
};

export default useColumns;
