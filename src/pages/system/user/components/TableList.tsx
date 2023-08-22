import React, { useState, useRef, useMemo } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Space, Modal, message } from 'antd';
import { useSelectEnum, PermissionButton } from '@/zero';
import { queryUserList, delUser } from '../service';
import type { ActionType, ProFormInstance } from '@ant-design/pro-components';
import type { IResQueryUserList } from '../service/index.d';
import { SYS_COMMON_STATUS, SYS_USER_SEX } from '@/common/enum/system';
import Update from './Update';
import useColumns from '../hooks/useColumns';

const dictNormalDisable = useSelectEnum(SYS_COMMON_STATUS, 'value', 'label');
const dictUserSex = useSelectEnum(SYS_USER_SEX, 'value', 'label');

export default () => {
  const ref: any = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();

  const [delteUser, updateThen] = useMemo(() => {
    const updateThen = (flag: boolean) => {
      flag && ref.current.reloadAndRest();
      setIsModalVisible(false);
    };
    const delteUser = (userIds: string) => {
      Modal.confirm({
        title: `是否确认删除用户编号为“${userIds}”的用户?`,
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          delUser(userIds)
            .then(() => {
              message.success('删除成功');
              ref.current.reloadAndRest();
            })
            .catch((e) => {
              message.error(e?.msg || '删除失败');
            });
        },
      });
    };

    return [delteUser, updateThen];
  }, []);

  const columns = useColumns(
    setUserId,
    setIsModalVisible,
    delteUser,
    dictNormalDisable
  );

  return (
    <>
      <Update
        isModalVisible={isModalVisible}
        setIsModalVisible={updateThen}
        userId={userId}
        dictNormalDisable={dictNormalDisable}
        dictUserSex={dictUserSex}
      />
      <ProTable<IResQueryUserList>
        rowSelection={{
          getCheckboxProps: (record: IResQueryUserList) => ({
            disabled: record.admin, // Column configuration not to be checked
          }),
        }}
        actionRef={ref}
        formRef={formRef}
        columns={columns}
        rowKey={'userId'}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          defaultPageSize: 10,
          defaultCurrent: 1,
          // onChange: (page, pageSize) => {
          //   console.log("pagination.onChange", page, pageSize);
          // },
        }}
        // polling={polling || undefined}
        request={async (params, sort, fliter) => {
          const { current: pageNum, pageSize, ...req } = params;
          const { rows: data, total } = await queryUserList({
            pageNum,
            pageSize,
            ...req,
          });
          return {
            data,
            total,
            success: true,
          };
        }}
        onRequestError={(error) => {
          console.error(error);
        }}
        options={{
          fullScreen: false,
          reload: false,
          setting: false,
          density: false,
        }}
        search={{ defaultCollapsed: false }}
        defaultSize='small'
        dateFormatter='string'
        tableAlertRender={({
          selectedRowKeys,
          selectedRows,
          onCleanSelected,
        }) => (
          <Space size={6}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        )}
        tableAlertOptionRender={({
          selectedRowKeys,
          selectedRows,
          onCleanSelected,
        }) => (
          <Space size={6}>
            <PermissionButton
              permissions={['system:user:remove']}
              type='primary'
              size='small'
              danger
              disabled={!Boolean(selectedRowKeys.length)}
              onClick={() => {
                delteUser(selectedRowKeys.join(','));
              }}
            >
              批量删除
            </PermissionButton>
          </Space>
        )}
        toolBarRender={() => [
          <PermissionButton
            permissions={['system:user:add']}
            type='primary'
            size='small'
            onClick={() => {
              setUserId(undefined);
              setIsModalVisible(true);
            }}
          >
            新增
          </PermissionButton>,
        ]}
      />
    </>
  );
};
