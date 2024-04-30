import React, { useCallback } from 'react';
import {
  ProCard,
  ProDescriptions,
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {
  useEnv,
  sessionStorage,
  navigate,
  HttpClient,
  useMergeState,
  useToken,
} from '@/zero';
import { Button, Col, Input, Row, Collapse, message } from 'antd';
import { MD5 } from 'crypto-js';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

const { Panel } = Collapse;
const { removeToken, setToken } = useToken();
const { user = {}, permissions = {} } = sessionStorage.get('userInfo') || {};

const {
  routes,
  parentSessionId,
  sessionId,
  appId,
  webpackConfig,
  viteConfig,
  onLunchTime,
  apolloConf,
  setEnv,
  publicKey,
  oaLoginPublicKey,
  ...restEnv
} = useEnv();

const originRoutes = [
  {
    path: restEnv.appName,
    isRouteRoot: true,
    children: routes,
  },
];

Object.assign(restEnv, {
  buildTime: dayjs(restEnv.buildTime).format('YYYY-MM-DD HH:mm:ss'),
});

const PROD_KEY = 'a1812ee29e57aa70490f9ef2bba1b82d'; // prodAdmin
const NEED_OPEN_KEY = '50307bcb2d8bd3234f3dda0520ab8abb'; // ebscn@2024
const safeEnv = ['local', 'test', 'pre'];

export default () => {
  const { id } = useParams();
  const idKey = id ? MD5(id).toString() : undefined;

  const [state, setState] = useMergeState({
    userId: user?.userId,
    response: null,
    pagePassword: '',
    needPassword: !safeEnv.includes(restEnv.ENV),
  });
  const { userId, response, pagePassword, needPassword } = state;

  const externalLogin = useCallback(
    (flag?: boolean) => {
      removeToken();
      const token = MD5(
        `${userId}${oaLoginPublicKey}${dayjs().format('YYYYMMDD')}`,
      );
      HttpClient.post(
        `bff/mot/external/login?token=${token.toString()}&userId=${userId}`,
        {
          token: token.toString(),
          userId,
        },
      )
        .then((res: any) => {
          setState({
            response: res,
          });
          sessionStorage.clearAll();
          setToken(res.token);
          if (flag) {
            navigate.reload('/index/index');
          }
        })
        .catch((e) => {
          setState({
            response: e,
          });
        });
    },
    [userId],
  );

  const httpReq = useCallback(async (values: any) => {
    const { method, uri, params = {} } = values;
    const payload = JSON.parse(params);
    try {
      let res = {};
      if (['get', 'delete'].includes(method)) {
        res = await HttpClient[method as 'get' | 'delete'](uri, {
          params: payload,
        });
      }
      if (['post', 'put'].includes(method)) {
        res = await HttpClient[method as 'post' | 'put'](uri, payload);
      }
      setState({
        response: res,
      });
    } catch (error) {
      setState({
        response: error,
      });
    }
  }, []);

  const openTools = useCallback(() => {
    const inputToken = MD5(pagePassword).toString();
    if (inputToken === NEED_OPEN_KEY) {
      setState({ needPassword: false });
    } else {
      message.error('校验失败');
    }
  }, [pagePassword]);

  if (needPassword) {
    return (
      <div>
        <Input.Password
          style={{ marginTop: '10px' }}
          onChange={(e) => {
            setState({
              pagePassword: e.target.value,
            });
          }}
        />
        <Button
          style={{ marginTop: '10px', marginRight: '10px' }}
          onClick={() => {
            openTools();
          }}
        >
          打开工具
        </Button>
      </div>
    );
  }

  return (
    <>
      <Row>
        {(safeEnv.includes(restEnv.ENV) || idKey == PROD_KEY) && (
          <Col span={14}>
            <ProCard>
              <Input
                style={{ marginTop: '10px' }}
                value={userId}
                onChange={(e) => {
                  setState({
                    userId: e.target.value,
                  });
                }}
              />
              <Button
                style={{ marginTop: '10px', marginRight: '10px' }}
                onClick={() => {
                  // loginRas();
                  externalLogin();
                }}
              >
                登录
              </Button>
              <Button
                style={{ marginTop: '10px' }}
                onClick={() => {
                  // loginRas();
                  externalLogin(true);
                }}
              >
                登录回首页
              </Button>
            </ProCard>
          </Col>
        )}
        <Col span={10}>
          <Collapse>
            <Panel header='环境信息' key='1'>
              <ProDescriptions>
                <ProDescriptions.Item valueType='jsonCode'>
                  {JSON.stringify(restEnv)}
                </ProDescriptions.Item>
              </ProDescriptions>
            </Panel>
            <Panel header='用户信息' key='2'>
              <ProDescriptions>
                <ProDescriptions.Item valueType='jsonCode'>
                  {JSON.stringify(user)}
                </ProDescriptions.Item>
              </ProDescriptions>
            </Panel>
            <Panel header='权限信息' key='3'>
              <ProDescriptions>
                <ProDescriptions.Item valueType='jsonCode'>
                  {JSON.stringify(permissions)}
                </ProDescriptions.Item>
              </ProDescriptions>
            </Panel>
            <Panel header='路由信息' key='5'>
              <ProDescriptions>
                <ProDescriptions.Item valueType='jsonCode'>
                  {JSON.stringify(originRoutes)}
                </ProDescriptions.Item>
              </ProDescriptions>
            </Panel>
          </Collapse>
        </Col>
      </Row>
      {(safeEnv.includes(restEnv.ENV) || idKey == PROD_KEY) && (
        <Row>
          <Col span={14}>
            <ProCard>
              <ProForm onFinish={httpReq}>
                <ProFormText name={'uri'} label='地址' />
                <ProFormRadio.Group
                  name={'method'}
                  label='方法'
                  options={[
                    {
                      label: 'POST',
                      value: 'post',
                    },
                    {
                      label: 'GET',
                      value: 'get',
                    },
                    {
                      label: 'PUT',
                      value: 'put',
                    },
                    {
                      label: 'DELETE',
                      value: 'delete',
                    },
                  ]}
                />
                <ProFormTextArea name={'params'} label='参数' />
              </ProForm>
            </ProCard>
          </Col>
          <Col span={10}>
            <ProDescriptions title='接口调用返回信息'>
              <ProDescriptions.Item valueType='jsonCode'>
                {JSON.stringify(response)}
              </ProDescriptions.Item>
            </ProDescriptions>
          </Col>
        </Row>
      )}
    </>
  );
};
