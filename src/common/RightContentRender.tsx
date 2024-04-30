import React, { useMemo } from 'react';
import { Button, Space, Popover, Avatar } from 'antd';
import { navigate, sessionStorage } from '@/zero';
import { observer } from 'mobx-react-lite';
import Img from '@/assets/userinfo.png';

export default observer(({ logout }: any) => {
  const userName = useMemo(() => {
    const userInfo = sessionStorage.get('userInfo');
    return userInfo?.user?.userName;
  }, []);

  const content = (
    <Space direction='vertical'>
      <Button
        size='small'
        type='link'
        key={'个人中心'}
        onClick={() => {
          navigate.goTo('/system/profile');
        }}
      >
        个人中心
      </Button>
      <Button
        size='small'
        key={'退出登录'}
        type='link'
        onClick={() => logout()}
      >
        退出登录
      </Button>
    </Space>
  );
  return (
    <Space direction='horizontal' style={{ marginRight: '10px' }}>
      <Popover placement='bottomRight' content={content}>
        <Avatar
          style={{ color: '#fff' }}
          shape='square'
          size='default'
          src={Img}
        />
        <span style={{ color: '#fff', marginLeft: '8px' }}>{userName}</span>
      </Popover>
    </Space>
  );
});
