/* md5: d5896588bedf504da892abe0353b7f86 */
/* Rap仓库id: 302222 */
/* Rapper版本: 1.3.1 */
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

/**
 * 本文件由 Rapper 同步 Rap 平台接口，自动生成，请勿修改
 * Rap仓库 地址: http://rap2.taobao.org/repository/editor?id=302222
 */

import * as commonLib from 'rap/runtime/commonLib'

export interface IModels {
  /**
   * 接口名：获取路由
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259922
   */
  'GET/getRouters': {
    Req: {}
    Res: {
      msg: string
      code: number
      data: {
        name: string
        path: string
        hidden: string
        redirect: string
        component: string
        alwaysShow: boolean
        meta: {
          title: string
          icon: string
        }
        children: {
          name: string
          path: string
          hidden: string
          component: string
          meta: {
            title: string
            icon: string
          }
          redirect:
            | string
            | {
                [k: string]: any
              }
          alwaysShow:
            | boolean
            | {
                [k: string]: any
              }
          children: {
            name: string
            path: string
            hidden: string
            component: string
            meta: {
              title: string
              icon: string
            }
          }[]
        }[]
      }[]
    }
  }

  /**
   * 接口名：/getUserInfo
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259935
   */
  'GET/getUserInfo': {
    Req: {}
    Res: {
      msg: string
      code: number
      permissions: string[]
      roles: string[]
      user: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: null
        params: {}
        userId: number
        deptId: number
        userName: string
        nickName: string
        email: string
        phonenumber: string
        sex: string
        avatar: string
        password: string
        salt: null
        status: string
        delFlag: string
        loginIp: string
        loginDate: string
        dept: {
          searchValue: null
          createBy: null
          createTime: null
          updateBy: null
          updateTime: null
          remark: null
          dataScope: null
          params: {}
          deptId: number
          parentId: number
          ancestors: null
          deptName: string
          orderNum: string
          leader: string
          phone: null
          email: null
          status: string
          delFlag: null
          parentName: null
          children: any[]
        }
        roles: {
          searchValue: null
          createBy: null
          createTime: null
          updateBy: null
          updateTime: null
          remark: null
          dataScope: string
          params: {}
          roleId: number
          roleName: string
          roleKey: string
          roleSort: string
          status: string
          delFlag: null
          flag: boolean
          menuIds: null
          deptIds: null
          admin: boolean
        }[]
        roleIds: null
        postIds: null
        admin: boolean
      }
    }
  }

  /**
   * 接口名：system/config/config
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259926
   */
  'GET/system/config/configKey': {
    Req: {}
    Res: {
      code: number
      msg: string
    }
  }

  /**
   * 接口名：dict/data/all
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259924
   */
  'GET/system/dict/data/all': {
    Req: {}
    Res: {
      msg: string
      code: number
      data: {
        'authorize_app_type:1': string
        'authorize_app_type:0': string
        'info_category_list:top': string
        'sys_notice_type:1': string
        'sys_notice_type:2': string
        'sys_job_status:0': string
        'sys_job_status:1': string
        'sys_yes_no:Y': string
        'sys_job_group:DEFAULT': string
        'info_category_list:refer': string
        'sys_job_group:SYSTEM': string
        'sys_user_sex:2': string
        'sys_common_status:0': string
        'sys_user_sex:1': string
        'sys_user_sex:0': string
        'sys_common_status:1': string
        'sys_normal_disable:0': string
        'sys_normal_disable:1': string
        'sys_oper_type:9': string
        'sys_yes_no:N': string
        'sys_oper_type:6': string
        'sys_oper_type:5': string
        'sys_oper_type:8': string
        'sys_oper_type:7': string
        'sys_oper_type:2': string
        'sys_oper_type:1': string
        'sys_oper_type:4': string
        'sys_oper_type:3': string
        'info_category_list:yanbao': string
        'sys_notice_status:0': string
        'sys_notice_status:1': string
        'sys_show_hide:0': string
        'sys_show_hide:1': string
      }
    }
  }

  /**
   * 接口名：sys_normal_disable
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259923
   */
  'GET/system/dict/data/dictType/sys_normal_disable': {
    Req: {}
    Res: {
      msg: string
      code: number
      data: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: null
        params: {}
        dictCode: number
        dictSort: number
        dictLabel: string
        dictValue: string
        dictType: string
        cssClass: string
        listClass: string
        isDefault: string
        status: string
        default: boolean
      }[]
    }
  }

  /**
   * 接口名：sys_user_sex
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259927
   */
  'GET/system/dict/data/dictType/sys_user_sex': {
    Req: {}
    Res: {
      msg: string
      code: number
      data: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: null
        params: {}
        dictCode: number
        dictSort: number
        dictLabel: string
        dictValue: string
        dictType: string
        cssClass: string
        listClass: string
        isDefault: string
        status: string
        default: boolean
      }[]
    }
  }

  /**
   * 接口名：sys_show_hide
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259925
   */
  'GET/system/dict/data/dictType/sys_show_hide': {
    Req: {}
    Res: {
      msg: string
      code: number
      data: {
        dataScope: null
        params: {}
        dictCode: number
        dictSort: number
        dictLabel: string
        dictValue: string
        dictType: string
        cssClass: string
        listClass: string
        isDefault: string
        status: string
        default: boolean
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
      }[]
    }
  }

  /**
   * 接口名：sys_yes_no
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259930
   */
  'GET/system/dict/data/dictType/sys_yes_no': {
    Req: {}
    Res: {
      msg: string
      code: number
      data: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: null
        params: {}
        dictCode: number
        dictSort: number
        dictLabel: string
        dictValue: string
        dictType: string
        cssClass: string
        listClass: string
        isDefault: string
        status: string
        default: boolean
      }[]
    }
  }

  /**
   * 接口名：sys_notice_status
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259929
   */
  'GET/system/dict/data/dictType/sys_notice_status': {
    Req: {}
    Res: {
      msg: string
      code: number
      data: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: null
        params: {}
        dictCode: number
        dictSort: number
        dictLabel: string
        dictValue: string
        dictType: string
        cssClass: string
        listClass: string
        isDefault: string
        status: string
        default: boolean
      }[]
    }
  }

  /**
   * 接口名：sys_notice_type
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259928
   */
  'GET/system/dict/data/dictType/sys_notice_type': {
    Req: {}
    Res: {
      msg: string
      code: number
      data: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: null
        params: {}
        dictCode: number
        dictSort: number
        dictLabel: string
        dictValue: string
        dictType: string
        cssClass: string
        listClass: string
        isDefault: string
        status: string
        default: boolean
      }[]
    }
  }

  /**
   * 接口名：sys_oper_type
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259931
   */
  'GET/system/dict/data/dictType/sys_oper_type': {
    Req: {}
    Res: {
      msg: string
      code: number
      data: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: null
        params: {}
        dictCode: number
        dictSort: number
        dictLabel: string
        dictValue: string
        dictType: string
        cssClass: string
        listClass: string
        isDefault: string
        status: string
        default: boolean
      }[]
    }
  }

  /**
   * 接口名：sys_common_status
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259934
   */
  'GET/system/dict/data/dictType/sys_common_status': {
    Req: {}
    Res: {
      msg: string
      code: number
      data: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: null
        params: {}
        dictCode: number
        dictSort: number
        dictLabel: string
        dictValue: string
        dictType: string
        cssClass: string
        listClass: string
        isDefault: string
        status: string
        default: boolean
      }[]
    }
  }

  /**
   * 接口名：login
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259936
   */
  'POST/login': {
    Req: {
      code: string
      uuid: string
    }
    Res: {
      token: string
      code: number
      msg: string
    }
  }

  /**
   * 接口名：logout
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259932
   */
  'POST/logout': {
    Req: {}
    Res: {
      code: number
      msg: string
    }
  }

  /**
   * 接口名：消息推送来源
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259937
   */
  'GET/system/dict/data/dictType/pushpro_source': {
    Req: {}
    Res: {
      data: {
        [k: string]: any
      }[]
      code: string
      msg: string
    }
  }

  /**
   * 接口名：/system/menu/list
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259845
   */
  'GET/system/menu/list': {
    Req: {}
    Res: {
      msg: string
      code: number
      data: {
        searchValue: null
        createBy: null
        createTime: string
        updateBy: null
        updateTime: null
        remark: null
        dataScope: null
        params: {}
        menuId: number
        menuName: string
        parentName: null
        parentId: number
        orderNum: number
        path: string
        component:
          | string
          | {
              [k: string]: any
            }
        isFrame: string
        menuType: string
        visible:
          | string
          | number
          | boolean
          | {
              [k: string]: any
            }
        perms: string
        icon: string
        hidden: string
        children: any[]
      }[]
    }
  }

  /**
   * 接口名：查询角色列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259850
   */
  'GET/system/role/list': {
    Req: {}
    Res: {
      total: number
      rows: {
        searchValue: null
        createBy: null
        createTime: string
        updateBy: null
        updateTime: null
        remark:
          | string
          | {
              [k: string]: any
            }
        dataScope: string
        params: {}
        roleId: number
        roleName: string
        roleKey: string
        roleSort: string
        status: string
        delFlag: string
        flag: boolean
        menuIds: null
        deptIds: null
        admin: boolean
      }[]
      code: number
      msg: number
    }
  }

  /**
   * 接口名：/system/user/list
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259848
   */
  'GET/system/user/list': {
    Req: {}
    Res: {
      total: number
      rows: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark:
          | string
          | {
              [k: string]: any
            }
        dataScope: null
        params: {}
        userId: number
        deptId: number
        userName: string
        nickName: string
        email: string
        phonenumber: string
        sex: string
        avatar: string
        password: string
        salt: null
        status: string
        delFlag: string
        loginIp: string
        loginDate:
          | string
          | {
              [k: string]: any
            }
        dept: {
          searchValue: null
          createBy: null
          createTime: null
          updateBy: null
          updateTime: null
          remark: null
          dataScope: null
          params: {}
          deptId: number
          parentId: null
          ancestors: null
          deptName: string
          orderNum: null
          leader: string
          phone: null
          email: null
          status: null
          delFlag: null
          parentName: null
          children: any[]
        }
        roles: {
          searchValue: null
          createBy: null
          createTime: string
          updateBy: null
          updateTime: null
          remark: string
          dataScope: string
          params: {}
          roleId: number
          roleName: string
          roleKey: string
          roleSort: string
          status: string
          delFlag: string
          flag: boolean
          menuIds: null
          deptIds: null
          admin: boolean
        }[]
        roleIds: null
        postIds: null
        admin: boolean
      }[]
      code: number
      msg: number
    }
  }

  /**
   * 接口名：查询部门下拉树结构
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259847
   */
  'GET/system/dept/treeselect': {
    Req: {}
    Res: {
      msg: string
      code: number
      data: {
        id: number
        label: string
        children: {
          id: number
          label: string
          children: {
            id: number
            label: string
          }[]
        }[]
      }[]
    }
  }

  /**
   * 接口名：部门列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259855
   */
  'GET/system/dept/list': {
    Req: {}
    Res: {
      msg: string
      code: number
      data: {
        deptId: number
        parentId: number
        ancestors: string
        deptName: string
        orderNum: string
        leader: string
        phone: string
        email: string
        status: string
        delFlag: string
        parentName: null
        children: any[]
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: null
        dataScope: null
        params: {}
      }[]
    }
  }

  /**
   * 接口名：查询岗位列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259843
   */
  'GET/system/post/list': {
    Req: {
      pageNum?: number
      pageSize?: number
      begintime?: string
      endTime?: string
    }
    Res: {
      total: number
      rows: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: null
        params: {}
        postId: number
        postCode: string
        postName: string
        postSort: string
        status: string
        flag: boolean
      }[]
      code: number
      msg: number
    }
  }

  /**
   * 接口名：dict/type/list
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259852
   */
  'GET/system/dict/type/list': {
    Req: {}
    Res: {
      total: number
      rows: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: null
        params: {}
        dictId: number
        dictName: string
        dictType: string
        status: string
      }[]
      code: number
      msg: number
    }
  }

  /**
   * 接口名：查询参数列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259846
   */
  'GET/system/config/list': {
    Req: {}
    Res: {
      total: number
      rows: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: string
        updateTime: string
        remark: string
        dataScope: null
        params: {}
        configId: number
        configName: string
        configKey: string
        configValue: string
        configType: string
      }[]
      code: number
      msg: number
    }
  }

  /**
   * 接口名：查询公告列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259844
   */
  'GET/system/notice/list': {
    Req: {}
    Res: {
      total: number
      rows: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: string
        updateTime: null
        remark: null
        dataScope: null
        params: {}
        noticeId: number
        noticeTitle: string
        noticeType: string
        noticeContent: string
        status: string
      }[]
      code: number
      msg: number
    }
  }

  /**
   * 接口名：operlog/list
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259854
   */
  'GET/monitor/operlog/list': {
    Req: {}
    Res: {
      total: number
      rows: {
        searchValue: null
        createBy: null
        createTime: null
        updateBy: null
        updateTime: null
        remark: null
        dataScope: null
        params: {}
        operId: number
        title: string
        businessType: number
        businessTypes: null
        method: string
        requestMethod: string
        operatorType: number
        operName: string
        deptName: null
        operUrl: string
        operIp: string
        operLocation: string
        operParam: string
        jsonResult: string
        status: number
        errorMsg: null
        operTime: string
      }[]
      code: number
      msg: number
    }
  }

  /**
   * 接口名：logininfor/list
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259849
   */
  'GET/monitor/logininfor/list': {
    Req: {}
    Res: {
      total: number
      rows: {
        searchValue: null
        createBy: null
        createTime: null
        updateBy: null
        updateTime: null
        remark: null
        dataScope: null
        params: {}
        infoId: number
        userName: string
        status: string
        ipaddr: string
        loginLocation: string
        browser: string
        os: string
        msg: string
        loginTime: string
      }[]
      code: number
      msg: string
    }
  }

  /**
   * 接口名：/monitor/online/list
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259853
   */
  'GET/monitor/online/list': {
    Req: {}
    Res: {
      total: number
      rows: {
        tokenId: string
        deptName: string
        userName: string
        ipaddr: string
        loginLocation: string
        browser: string
        os: string
        loginTime: number
      }[]
      code: number
      msg: number
    }
  }

  /**
   * 接口名：/monitor/server
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259851
   */
  'GET/monitor/server': {
    Req: {}
    Res: {
      msg: string
      code: number
      data: {
        cpu: {
          cpuNum: number
          total: number
          sys: number
          used: number
          wait: number
          free: number
        }
        mem: {
          total: number
          used: number
          free: number
          usage: number
        }
        jvm: {
          total: number
          max: number
          free: number
          version: string
          home: string
          runTime: string
          startTime: string
          used: number
          usage: number
          name: string
        }
        sys: {
          computerName: string
          computerIp: string
          userDir: string
          osName: string
          osArch: string
        }
        sysFiles: {
          dirName: string
          sysTypeName: string
          typeName: string
          total: string
          free: string
          used: string
          usage: number
        }[]
      }
    }
  }

  /**
   * 接口名：/system/user
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259856
   */
  'GET/system/user/:id': {
    Req: {
      id?: string
    }
    Res: {
      msg: string
      code: number
      roleIds: number[]
      data: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: null
        dataScope: null
        params: {}
        userId: number
        deptId: number
        userName: string
        nickName: string
        email: string
        phonenumber: string
        sex: string
        avatar: string
        password: string
        salt: null
        status: string
        delFlag: string
        loginIp: string
        loginDate: null
        dept: {
          searchValue: null
          createBy: null
          createTime: null
          updateBy: null
          updateTime: null
          remark: null
          dataScope: null
          params: {}
          deptId: number
          parentId: number
          ancestors: null
          deptName: string
          orderNum: string
          leader: string
          phone: null
          email: null
          status: string
          delFlag: null
          parentName: null
          children: any[]
        }
        roles: {
          searchValue: null
          createBy: null
          createTime: null
          updateBy: null
          updateTime: null
          remark: null
          dataScope: string
          params: {}
          roleId: number
          roleName: string
          roleKey: string
          roleSort: string
          status: string
          delFlag: null
          flag: boolean
          menuIds: null
          deptIds: null
          admin: boolean
        }[]
        roleIds: null
        postIds: null
        admin: boolean
      }
      postIds: number[]
      roles: {
        searchValue: null
        createBy: null
        createTime: string
        updateBy: null
        updateTime: null
        remark:
          | string
          | {
              [k: string]: any
            }
        dataScope: string
        params: {}
        roleId: number
        roleName: string
        roleKey: string
        roleSort: string
        status: string
        delFlag: string
        flag: boolean
        menuIds: null
        deptIds: null
        admin: boolean
      }[]
      posts: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: null
        params: {}
        postId: number
        postCode: string
        postName: string
        postSort: string
        status: string
        flag: boolean
      }[]
    }
  }

  /**
   * 接口名：/system/user
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259857
   */
  'GET/system/user': {
    Req: {}
    Res: {
      msg: string
      code: number
      roles: {
        searchValue: null
        createBy: null
        createTime: string
        updateBy: null
        updateTime: null
        remark:
          | string
          | {
              [k: string]: any
            }
        dataScope: string
        params: {}
        roleId: number
        roleName: string
        roleKey: string
        roleSort: string
        status: string
        delFlag: string
        flag: boolean
        menuIds: null
        deptIds: null
        admin: boolean
      }[]
      posts: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: null
        params: {}
        postId: number
        postCode: string
        postName: string
        postSort: string
        status: string
        flag: boolean
      }[]
    }
  }

  /**
   * 接口名：/system/user
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259864
   */
  'POST/system/user': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：/system/user
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259861
   */
  'PUT/system/user': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：user/changeStatus
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259863
   */
  'PUT/system/user/changeStatus': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：查询部门详细
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259860
   */
  'GET/system/dept/:deptId': {
    Req: {
      deptId?: string
    }
    Res: {
      msg: string
      code: number
      data: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: null
        dataScope: null
        params: {}
        deptId: number
        parentId: number
        ancestors: string
        deptName: string
        orderNum: string
        leader: string
        phone: string
        email: string
        status: string
        delFlag: string
        parentName: null
        children: any[]
      }
    }
  }

  /**
   * 接口名：查询角色详细信息
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259865
   */
  'GET/system/role/:roleId': {
    Req: {
      roleId?: string
    }
    Res: {
      msg: string
      code: number
      data: {
        searchValue: null
        createBy: null
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: string
        params: {}
        roleId: number
        roleName: string
        roleKey: string
        roleSort: string
        status: string
        delFlag: string
        flag: boolean
        menuIds: null
        deptIds: null
        admin: boolean
      }
    }
  }

  /**
   * 接口名：menu/treeselect
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259859
   */
  'GET/system/menu/treeselect': {
    Req: {}
    Res: {
      msg: string
      code: number
      data: {
        id: number
        label: string
        children: {
          id: number
          label: string
          children: {
            id: number
            label: string
          }[]
        }[]
      }[]
    }
  }

  /**
   * 接口名：查询参数详细
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259866
   */
  'GET/system/config/:configId': {
    Req: {
      configId?: string
    }
    Res: {
      msg: string
      code: number
      data: {
        configKey: string
        configValue: string
        configType: string
        searchValue: null
        createBy: string
        createTime: string
        updateBy: string
        updateTime: string
        remark: string
        dataScope: null
        params: {}
        configId: number
        configName: string
      }
    }
  }

  /**
   * 接口名：initPassword
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259858
   */
  'GET/system/config/configKey/sys.user.initPassword': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：根据角色ID查询菜单下拉树结构
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259867
   */
  'GET/system/menu/roleMenuTreeselect/:id': {
    Req: {
      id?: string
    }
    Res: {
      msg: string
      code: number
      menus: {
        id: number
        label: string
        children: {
          id: number
          label: string
          children: {
            id: number
            label: string
          }[]
        }[]
      }[]
      checkedKeys: number[]
    }
  }

  /**
   * 接口名：导出角色
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259869
   */
  'GET/system/role/export': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：删除角色
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259862
   */
  'DELETE/system/role/:id': {
    Req: {
      roleId?: number
      status?: number
      id?: string
    }
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：角色数据权限
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259870
   */
  'PUT/system/role/dataScope': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：角色状态修改
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259881
   */
  'PUT/system/role/changeStatus': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：查询岗位信息
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259878
   */
  'GET/system/post/:postId': {
    Req: {
      postId?: string
    }
    Res: {
      data: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: null
        params: {}
        postId: number
        postCode: string
        postName: string
        postSort: string
        status: string
        flag: boolean
      }
      msg: string
      code: number
    }
  }

  /**
   * 接口名：新增岗位
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259874
   */
  'POST/system/post': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：修改岗位
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259872
   */
  'PUT/system/post': {
    Req: {
      searchValue?: null
      createBy?: string
      createTime?: string
      updateBy?: null
      updateTime?: null
      remark?: string
      dataScope?: null
      params?: {}
      postId?: number
      postCode?: string
      postName?: string
      postSort?: string
      status?: string
      flag?: boolean
    }
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：删除岗位
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259876
   */
  'DELETE/system/post/:id': {
    Req: {
      id?: string
    }
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：导出岗位
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259877
   */
  'GET/system/post/export': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：根据角色ID查询部门树结构
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259875
   */
  'GET/system/dept/roleDeptTreeselect/:roleId': {
    Req: {
      roleId?: string
    }
    Res: {
      checkedKeys: number[]
      msg: string
      code: number
      depts: {
        label: string
        children: {
          id: number
          label: string
          children: {
            id: number
            label: string
          }[]
        }[]
        id: number
      }[]
      label: string
    }
  }

  /**
   * 接口名：新增部门
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259879
   */
  'POST/system/dept': {
    Req: {
      deptId?: number
      parentId?: number
      deptName?: string
      orderNum?: string
      leader?: string
      phone?: string
      email?: string
      status?: string
    }
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：修改部门
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259871
   */
  'PUT/system/dept': {
    Req: {
      deptId?: number
      parentId?: number
      deptName?: string
      orderNum?: string
      leader?: string
      phone?: string
      email?: string
      status?: string
    }
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：删除部门
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259880
   */
  'DELETE/system/dept/:deptId': {
    Req: {
      deptId?: string
    }
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：/ads/shelf
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259873
   */
  'GET/ads/shelf': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：/ads/del
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259868
   */
  'GET/ads/del': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：/ads/modify
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259888
   */
  'POST/ads/modify': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：/ads/add
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259891
   */
  'POST/ads/add': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：/monitor/online/
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259895
   */
  'DELETE/monitor/online/:tokenId': {
    Req: {
      tokenId?: string
    }
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：根据参数键名查询参数值
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259889
   */
  'GET/system/config/configKey/:configKey': {
    Req: {
      configKey?: string
    }
    Res: {
      msg: string
      code: number
      data: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: string
        updateTime: string
        remark: string
        dataScope: null
        params: {}
        configId: number
        configName: string
        configKey: string
        configValue: string
        configType: string
      }
    }
  }

  /**
   * 接口名：新增参数配置
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259886
   */
  'POST/system/config': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：修改参数配置
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259883
   */
  'PUT/system/config': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：删除参数配置
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259884
   */
  'DELETE/system/config/:configId': {
    Req: {
      configId?: string
    }
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：导出参数
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259882
   */
  'GET/system/config/export': {
    Req: {
      pageNum?: number
      pageSize?: number
      configName?: string
      configKey?: string
      configType?: string
    }
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：/monitor/logininfor/
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259885
   */
  'DELETE/monitor/logininfor/:infoIds': {
    Req: {
      infoIds?: string
    }
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：logininfor/clean
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259893
   */
  'DELETE/monitor/logininfor/clean': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：登录日志导出
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259896
   */
  'GET/monitor/logininfor/export': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：删除操作日志
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259890
   */
  'DELETE/monitor/operlog/:operIds': {
    Req: {
      operIds?: string
    }
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：清除操作日志
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259898
   */
  'DELETE/monitor/operlog/clean': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：导出操作日志
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259897
   */
  'GET/monitor/operlog/export': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：查询公告详细
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259887
   */
  'GET/system/notice/:noticeId': {
    Req: {
      noticeId?: string
    }
    Res: {
      msg: string
      code: string
      data: {
        noticeId: number
        noticeTitle: string
        noticeType: number
        createBy: string
        status: string
        createTime: string
      }
    }
  }

  /**
   * 接口名：新增公告
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259892
   */
  'POST/system/notice': {
    Req: {
      noticeTitle?: string
      noticeType?: string
      noticeContent?: string
      status?: string
    }
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：修改公告
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259894
   */
  'PUT/system/notice': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：删除公告
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259899
   */
  'DELETE/system/notice/:noticeId': {
    Req: {
      noticeId?: string
    }
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：删除用户
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259900
   */
  'DELETE/system/user/:ids': {
    Req: {
      ids?: string
    }
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：新增角色
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259908
   */
  'POST/system/role': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：修改角色
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259901
   */
  'PUT/system/role': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：查询菜单详细
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259902
   */
  'GET/system/menu/:menuId': {
    Req: {
      menuId?: string
    }
    Res: {
      msg: string
      code: number
      data: {
        searchValue: null
        createBy: null
        createTime: string
        updateBy: null
        updateTime: null
        remark: null
        dataScope: null
        params: {}
        menuId: number
        menuName: string
        parentName: null
        parentId: number
        orderNum: string
        path: string
        component: null
        isFrame: string
        menuType: string
        visible: string
        perms: string
        icon: string
        hidden: string
        children: any[]
      }
    }
  }

  /**
   * 接口名：新增菜单
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259920
   */
  'POST/system/menu': {
    Req: {}
    Res: {
      code: number
      msg: string
    }
  }

  /**
   * 接口名：修改菜单
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259904
   */
  'PUT/system/menu': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：删除菜单
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259906
   */
  'DELETE/system/menu/:menuId': {
    Req: {
      menuId?: string
    }
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：新增字典类型
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259912
   */
  'POST/system/dict/type': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：修改字典类型
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259913
   */
  'PUT/system/dict/type': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：删除字典类型
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259903
   */
  'DELETE/system/dict/type/:dictId': {
    Req: {
      dictId?: string
    }
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：导出字典类型
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259905
   */
  'GET/system/dict/type/export': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：个人信息
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259911
   */
  'GET/system/user/profile': {
    Req: {}
    Res: {
      roleGroup: string
      msg: string
      postGroup: string
      code: number
      data: {
        email: string
        phonenumber: string
        sex: string
        avatar: string
        password: string
        salt: null
        status: string
        delFlag: string
        loginIp: string
        loginDate: string
        dept: {
          searchValue: null
          createBy: null
          createTime: null
          updateBy: null
          updateTime: null
          remark: null
          dataScope: null
          params: {}
          deptId: number
          parentId: number
          ancestors: null
          deptName: string
          orderNum: string
          leader: string
          phone: null
          email: null
          status: string
          delFlag: null
          parentName: null
          children: any[]
        }
        roles: {
          searchValue: null
          createBy: null
          createTime: null
          updateBy: null
          updateTime: null
          remark: null
          dataScope: string
          params: {}
          roleId: number
          roleName: string
          roleKey: string
          roleSort: string
          status: string
          delFlag: null
          flag: boolean
          menuIds: null
          deptIds: null
          admin: boolean
        }[]
        roleIds: null
        postIds: null
        admin: boolean
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: null
        params: {}
        userId: number
        deptId: number
        userName: string
        nickName: string
      }
    }
  }

  /**
   * 接口名：数据字典数据获取
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259907
   */
  'GET/system/dict/type/:id': {
    Req: {
      id?: string
    }
    Res: {
      msg: string
      code: number
      data: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: null
        params: {}
        dictId: number
        dictName: string
        dictType: string
        status: string
      }
    }
  }

  /**
   * 接口名：数据字典数据列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259910
   */
  'GET/system/dict/data/list': {
    Req: {}
    Res: {
      total: number
      rows: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: null
        params: {}
        dictCode: number
        dictSort: number
        dictLabel: string
        dictValue: string
        dictType: string
        cssClass: string
        listClass: string
        isDefault: string
        status: string
        default: boolean
      }[]
      code: number
      msg: number
    }
  }

  /**
   * 接口名：查询字典数据详细
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259915
   */
  'GET/system/dict/data/:dictCode': {
    Req: {
      dictCode?: string
    }
    Res: {
      msg: string
      code: number
      data: {
        searchValue: null
        createBy: string
        createTime: string
        updateBy: null
        updateTime: null
        remark: string
        dataScope: null
        params: {}
        dictCode: number
        dictSort: number
        dictLabel: string
        dictValue: string
        dictType: string
        cssClass: string
        listClass: string
        isDefault: string
        status: string
        default: boolean
      }
      createBy: string
    }
  }

  /**
   * 接口名：新增字典数据
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259909
   */
  'POST/system/dict/data': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：修改字典数据
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259919
   */
  'PUT/system/dict/data': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：删除字典数据
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259921
   */
  'DELETE/system/dict/data/:dictCode': {
    Req: {
      dictCode?: string
    }
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：导出字典数据
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259916
   */
  'GET/system/dict/data/export': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：修改用户个人信息
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259918
   */
  'PUT/system/user/profile': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：用户密码重置
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259914
   */
  'PUT/system/user/profile/updatePwd': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }

  /**
   * 接口名：用户头像上传
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259917
   */
  'POST/system/user/profile/avatar': {
    Req: {}
    Res: {
      msg: string
      code: number
    }
  }
}

type ResSelector<T> = {
  data: T
  code: number
  msg: string
  [key: string]: any
  header: {[index: string]: string}
}

export interface IResponseTypes {
  'GET/getRouters': ResSelector<IModels['GET/getRouters']['Res']>
  'GET/getUserInfo': ResSelector<IModels['GET/getUserInfo']['Res']>
  'GET/system/config/configKey': ResSelector<IModels['GET/system/config/configKey']['Res']>
  'GET/system/dict/data/all': ResSelector<IModels['GET/system/dict/data/all']['Res']>
  'GET/system/dict/data/dictType/sys_normal_disable': ResSelector<
    IModels['GET/system/dict/data/dictType/sys_normal_disable']['Res']
  >
  'GET/system/dict/data/dictType/sys_user_sex': ResSelector<
    IModels['GET/system/dict/data/dictType/sys_user_sex']['Res']
  >
  'GET/system/dict/data/dictType/sys_show_hide': ResSelector<
    IModels['GET/system/dict/data/dictType/sys_show_hide']['Res']
  >
  'GET/system/dict/data/dictType/sys_yes_no': ResSelector<IModels['GET/system/dict/data/dictType/sys_yes_no']['Res']>
  'GET/system/dict/data/dictType/sys_notice_status': ResSelector<
    IModels['GET/system/dict/data/dictType/sys_notice_status']['Res']
  >
  'GET/system/dict/data/dictType/sys_notice_type': ResSelector<
    IModels['GET/system/dict/data/dictType/sys_notice_type']['Res']
  >
  'GET/system/dict/data/dictType/sys_oper_type': ResSelector<
    IModels['GET/system/dict/data/dictType/sys_oper_type']['Res']
  >
  'GET/system/dict/data/dictType/sys_common_status': ResSelector<
    IModels['GET/system/dict/data/dictType/sys_common_status']['Res']
  >
  'POST/login': ResSelector<IModels['POST/login']['Res']>
  'POST/logout': ResSelector<IModels['POST/logout']['Res']>
  'GET/system/dict/data/dictType/pushpro_source': ResSelector<
    IModels['GET/system/dict/data/dictType/pushpro_source']['Res']
  >
  'GET/system/menu/list': ResSelector<IModels['GET/system/menu/list']['Res']>
  'GET/system/role/list': ResSelector<IModels['GET/system/role/list']['Res']>
  'GET/system/user/list': ResSelector<IModels['GET/system/user/list']['Res']>
  'GET/system/dept/treeselect': ResSelector<IModels['GET/system/dept/treeselect']['Res']>
  'GET/system/dept/list': ResSelector<IModels['GET/system/dept/list']['Res']>
  'GET/system/post/list': ResSelector<IModels['GET/system/post/list']['Res']>
  'GET/system/dict/type/list': ResSelector<IModels['GET/system/dict/type/list']['Res']>
  'GET/system/config/list': ResSelector<IModels['GET/system/config/list']['Res']>
  'GET/system/notice/list': ResSelector<IModels['GET/system/notice/list']['Res']>
  'GET/monitor/operlog/list': ResSelector<IModels['GET/monitor/operlog/list']['Res']>
  'GET/monitor/logininfor/list': ResSelector<IModels['GET/monitor/logininfor/list']['Res']>
  'GET/monitor/online/list': ResSelector<IModels['GET/monitor/online/list']['Res']>
  'GET/monitor/server': ResSelector<IModels['GET/monitor/server']['Res']>
  'GET/system/user/:id': ResSelector<IModels['GET/system/user/:id']['Res']>
  'GET/system/user': ResSelector<IModels['GET/system/user']['Res']>
  'POST/system/user': ResSelector<IModels['POST/system/user']['Res']>
  'PUT/system/user': ResSelector<IModels['PUT/system/user']['Res']>
  'PUT/system/user/changeStatus': ResSelector<IModels['PUT/system/user/changeStatus']['Res']>
  'GET/system/dept/:deptId': ResSelector<IModels['GET/system/dept/:deptId']['Res']>
  'GET/system/role/:roleId': ResSelector<IModels['GET/system/role/:roleId']['Res']>
  'GET/system/menu/treeselect': ResSelector<IModels['GET/system/menu/treeselect']['Res']>
  'GET/system/config/:configId': ResSelector<IModels['GET/system/config/:configId']['Res']>
  'GET/system/config/configKey/sys.user.initPassword': ResSelector<
    IModels['GET/system/config/configKey/sys.user.initPassword']['Res']
  >
  'GET/system/menu/roleMenuTreeselect/:id': ResSelector<IModels['GET/system/menu/roleMenuTreeselect/:id']['Res']>
  'GET/system/role/export': ResSelector<IModels['GET/system/role/export']['Res']>
  'DELETE/system/role/:id': ResSelector<IModels['DELETE/system/role/:id']['Res']>
  'PUT/system/role/dataScope': ResSelector<IModels['PUT/system/role/dataScope']['Res']>
  'PUT/system/role/changeStatus': ResSelector<IModels['PUT/system/role/changeStatus']['Res']>
  'GET/system/post/:postId': ResSelector<IModels['GET/system/post/:postId']['Res']>
  'POST/system/post': ResSelector<IModels['POST/system/post']['Res']>
  'PUT/system/post': ResSelector<IModels['PUT/system/post']['Res']>
  'DELETE/system/post/:id': ResSelector<IModels['DELETE/system/post/:id']['Res']>
  'GET/system/post/export': ResSelector<IModels['GET/system/post/export']['Res']>
  'GET/system/dept/roleDeptTreeselect/:roleId': ResSelector<
    IModels['GET/system/dept/roleDeptTreeselect/:roleId']['Res']
  >
  'POST/system/dept': ResSelector<IModels['POST/system/dept']['Res']>
  'PUT/system/dept': ResSelector<IModels['PUT/system/dept']['Res']>
  'DELETE/system/dept/:deptId': ResSelector<IModels['DELETE/system/dept/:deptId']['Res']>
  'GET/ads/shelf': ResSelector<IModels['GET/ads/shelf']['Res']>
  'GET/ads/del': ResSelector<IModels['GET/ads/del']['Res']>
  'POST/ads/modify': ResSelector<IModels['POST/ads/modify']['Res']>
  'POST/ads/add': ResSelector<IModels['POST/ads/add']['Res']>
  'DELETE/monitor/online/:tokenId': ResSelector<IModels['DELETE/monitor/online/:tokenId']['Res']>
  'GET/system/config/configKey/:configKey': ResSelector<IModels['GET/system/config/configKey/:configKey']['Res']>
  'POST/system/config': ResSelector<IModels['POST/system/config']['Res']>
  'PUT/system/config': ResSelector<IModels['PUT/system/config']['Res']>
  'DELETE/system/config/:configId': ResSelector<IModels['DELETE/system/config/:configId']['Res']>
  'GET/system/config/export': ResSelector<IModels['GET/system/config/export']['Res']>
  'DELETE/monitor/logininfor/:infoIds': ResSelector<IModels['DELETE/monitor/logininfor/:infoIds']['Res']>
  'DELETE/monitor/logininfor/clean': ResSelector<IModels['DELETE/monitor/logininfor/clean']['Res']>
  'GET/monitor/logininfor/export': ResSelector<IModels['GET/monitor/logininfor/export']['Res']>
  'DELETE/monitor/operlog/:operIds': ResSelector<IModels['DELETE/monitor/operlog/:operIds']['Res']>
  'DELETE/monitor/operlog/clean': ResSelector<IModels['DELETE/monitor/operlog/clean']['Res']>
  'GET/monitor/operlog/export': ResSelector<IModels['GET/monitor/operlog/export']['Res']>
  'GET/system/notice/:noticeId': ResSelector<IModels['GET/system/notice/:noticeId']['Res']>
  'POST/system/notice': ResSelector<IModels['POST/system/notice']['Res']>
  'PUT/system/notice': ResSelector<IModels['PUT/system/notice']['Res']>
  'DELETE/system/notice/:noticeId': ResSelector<IModels['DELETE/system/notice/:noticeId']['Res']>
  'DELETE/system/user/:ids': ResSelector<IModels['DELETE/system/user/:ids']['Res']>
  'POST/system/role': ResSelector<IModels['POST/system/role']['Res']>
  'PUT/system/role': ResSelector<IModels['PUT/system/role']['Res']>
  'GET/system/menu/:menuId': ResSelector<IModels['GET/system/menu/:menuId']['Res']>
  'POST/system/menu': ResSelector<IModels['POST/system/menu']['Res']>
  'PUT/system/menu': ResSelector<IModels['PUT/system/menu']['Res']>
  'DELETE/system/menu/:menuId': ResSelector<IModels['DELETE/system/menu/:menuId']['Res']>
  'POST/system/dict/type': ResSelector<IModels['POST/system/dict/type']['Res']>
  'PUT/system/dict/type': ResSelector<IModels['PUT/system/dict/type']['Res']>
  'DELETE/system/dict/type/:dictId': ResSelector<IModels['DELETE/system/dict/type/:dictId']['Res']>
  'GET/system/dict/type/export': ResSelector<IModels['GET/system/dict/type/export']['Res']>
  'GET/system/user/profile': ResSelector<IModels['GET/system/user/profile']['Res']>
  'GET/system/dict/type/:id': ResSelector<IModels['GET/system/dict/type/:id']['Res']>
  'GET/system/dict/data/list': ResSelector<IModels['GET/system/dict/data/list']['Res']>
  'GET/system/dict/data/:dictCode': ResSelector<IModels['GET/system/dict/data/:dictCode']['Res']>
  'POST/system/dict/data': ResSelector<IModels['POST/system/dict/data']['Res']>
  'PUT/system/dict/data': ResSelector<IModels['PUT/system/dict/data']['Res']>
  'DELETE/system/dict/data/:dictCode': ResSelector<IModels['DELETE/system/dict/data/:dictCode']['Res']>
  'GET/system/dict/data/export': ResSelector<IModels['GET/system/dict/data/export']['Res']>
  'PUT/system/user/profile': ResSelector<IModels['PUT/system/user/profile']['Res']>
  'PUT/system/user/profile/updatePwd': ResSelector<IModels['PUT/system/user/profile/updatePwd']['Res']>
  'POST/system/user/profile/avatar': ResSelector<IModels['POST/system/user/profile/avatar']['Res']>
}

export function createFetch(fetchConfig: commonLib.RequesterOption, extraConfig?: {fetchType?: commonLib.FetchType}) {
  // if (!extraConfig || !extraConfig.fetchType) {
  //   console.warn('Rapper Warning: createFetch API will be deprecated, if you want to customize fetch, please use overrideFetch instead, since new API guarantees better type consistency during frontend lifespan. See detail https://www.yuque.com/rap/rapper/overridefetch')
  // }
  const rapperFetch = commonLib.getRapperRequest(fetchConfig)

  return {
    /**
     * 接口名：获取路由
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259922
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/getRouters': (req?: IModels['GET/getRouters']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/getRouters',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/getRouters']>
    },

    /**
     * 接口名：/getUserInfo
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259935
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/getUserInfo': (req?: IModels['GET/getUserInfo']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/getUserInfo',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/getUserInfo']>
    },

    /**
     * 接口名：system/config/config
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259926
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/config/configKey': (req?: IModels['GET/system/config/configKey']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/config/configKey',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/config/configKey']>
    },

    /**
     * 接口名：dict/data/all
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259924
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dict/data/all': (req?: IModels['GET/system/dict/data/all']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/dict/data/all',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dict/data/all']>
    },

    /**
     * 接口名：sys_normal_disable
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259923
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dict/data/dictType/sys_normal_disable': (
      req?: IModels['GET/system/dict/data/dictType/sys_normal_disable']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/dict/data/dictType/sys_normal_disable',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dict/data/dictType/sys_normal_disable']>
    },

    /**
     * 接口名：sys_user_sex
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259927
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dict/data/dictType/sys_user_sex': (
      req?: IModels['GET/system/dict/data/dictType/sys_user_sex']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/dict/data/dictType/sys_user_sex',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dict/data/dictType/sys_user_sex']>
    },

    /**
     * 接口名：sys_show_hide
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259925
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dict/data/dictType/sys_show_hide': (
      req?: IModels['GET/system/dict/data/dictType/sys_show_hide']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/dict/data/dictType/sys_show_hide',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dict/data/dictType/sys_show_hide']>
    },

    /**
     * 接口名：sys_yes_no
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259930
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dict/data/dictType/sys_yes_no': (
      req?: IModels['GET/system/dict/data/dictType/sys_yes_no']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/dict/data/dictType/sys_yes_no',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dict/data/dictType/sys_yes_no']>
    },

    /**
     * 接口名：sys_notice_status
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259929
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dict/data/dictType/sys_notice_status': (
      req?: IModels['GET/system/dict/data/dictType/sys_notice_status']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/dict/data/dictType/sys_notice_status',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dict/data/dictType/sys_notice_status']>
    },

    /**
     * 接口名：sys_notice_type
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259928
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dict/data/dictType/sys_notice_type': (
      req?: IModels['GET/system/dict/data/dictType/sys_notice_type']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/dict/data/dictType/sys_notice_type',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dict/data/dictType/sys_notice_type']>
    },

    /**
     * 接口名：sys_oper_type
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259931
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dict/data/dictType/sys_oper_type': (
      req?: IModels['GET/system/dict/data/dictType/sys_oper_type']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/dict/data/dictType/sys_oper_type',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dict/data/dictType/sys_oper_type']>
    },

    /**
     * 接口名：sys_common_status
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259934
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dict/data/dictType/sys_common_status': (
      req?: IModels['GET/system/dict/data/dictType/sys_common_status']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/dict/data/dictType/sys_common_status',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dict/data/dictType/sys_common_status']>
    },

    /**
     * 接口名：login
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259936
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/login': (req?: IModels['POST/login']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/login',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/login']>
    },

    /**
     * 接口名：logout
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259932
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/logout': (req?: IModels['POST/logout']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/logout',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/logout']>
    },

    /**
     * 接口名：消息推送来源
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510156&itf=2259937
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dict/data/dictType/pushpro_source': (
      req?: IModels['GET/system/dict/data/dictType/pushpro_source']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/dict/data/dictType/pushpro_source',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dict/data/dictType/pushpro_source']>
    },

    /**
     * 接口名：/system/menu/list
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259845
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/menu/list': (req?: IModels['GET/system/menu/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/menu/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/menu/list']>
    },

    /**
     * 接口名：查询角色列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259850
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/role/list': (req?: IModels['GET/system/role/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/role/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/role/list']>
    },

    /**
     * 接口名：/system/user/list
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259848
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/user/list': (req?: IModels['GET/system/user/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/user/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/user/list']>
    },

    /**
     * 接口名：查询部门下拉树结构
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259847
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dept/treeselect': (req?: IModels['GET/system/dept/treeselect']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/dept/treeselect',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dept/treeselect']>
    },

    /**
     * 接口名：部门列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259855
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dept/list': (req?: IModels['GET/system/dept/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/dept/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dept/list']>
    },

    /**
     * 接口名：查询岗位列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259843
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/post/list': (req?: IModels['GET/system/post/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/post/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/post/list']>
    },

    /**
     * 接口名：dict/type/list
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259852
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dict/type/list': (req?: IModels['GET/system/dict/type/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/dict/type/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dict/type/list']>
    },

    /**
     * 接口名：查询参数列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259846
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/config/list': (req?: IModels['GET/system/config/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/config/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/config/list']>
    },

    /**
     * 接口名：查询公告列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259844
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/notice/list': (req?: IModels['GET/system/notice/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/notice/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/notice/list']>
    },

    /**
     * 接口名：operlog/list
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259854
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/monitor/operlog/list': (req?: IModels['GET/monitor/operlog/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/monitor/operlog/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/monitor/operlog/list']>
    },

    /**
     * 接口名：logininfor/list
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259849
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/monitor/logininfor/list': (req?: IModels['GET/monitor/logininfor/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/monitor/logininfor/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/monitor/logininfor/list']>
    },

    /**
     * 接口名：/monitor/online/list
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259853
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/monitor/online/list': (req?: IModels['GET/monitor/online/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/monitor/online/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/monitor/online/list']>
    },

    /**
     * 接口名：/monitor/server
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259851
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/monitor/server': (req?: IModels['GET/monitor/server']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/monitor/server',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/monitor/server']>
    },

    /**
     * 接口名：/system/user
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259856
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/user/:id': (req?: IModels['GET/system/user/:id']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/user/:id',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/user/:id']>
    },

    /**
     * 接口名：/system/user
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259857
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/user': (req?: IModels['GET/system/user']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/user',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/user']>
    },

    /**
     * 接口名：/system/user
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259864
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/system/user': (req?: IModels['POST/system/user']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/user',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/system/user']>
    },

    /**
     * 接口名：/system/user
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259861
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/system/user': (req?: IModels['PUT/system/user']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/user',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/system/user']>
    },

    /**
     * 接口名：user/changeStatus
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259863
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/system/user/changeStatus': (
      req?: IModels['PUT/system/user/changeStatus']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/user/changeStatus',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/system/user/changeStatus']>
    },

    /**
     * 接口名：查询部门详细
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259860
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dept/:deptId': (req?: IModels['GET/system/dept/:deptId']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/dept/:deptId',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dept/:deptId']>
    },

    /**
     * 接口名：查询角色详细信息
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259865
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/role/:roleId': (req?: IModels['GET/system/role/:roleId']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/role/:roleId',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/role/:roleId']>
    },

    /**
     * 接口名：menu/treeselect
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259859
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/menu/treeselect': (req?: IModels['GET/system/menu/treeselect']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/menu/treeselect',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/menu/treeselect']>
    },

    /**
     * 接口名：查询参数详细
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259866
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/config/:configId': (req?: IModels['GET/system/config/:configId']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/config/:configId',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/config/:configId']>
    },

    /**
     * 接口名：initPassword
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259858
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/config/configKey/sys.user.initPassword': (
      req?: IModels['GET/system/config/configKey/sys.user.initPassword']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/config/configKey/sys.user.initPassword',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/config/configKey/sys.user.initPassword']>
    },

    /**
     * 接口名：根据角色ID查询菜单下拉树结构
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259867
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/menu/roleMenuTreeselect/:id': (
      req?: IModels['GET/system/menu/roleMenuTreeselect/:id']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/menu/roleMenuTreeselect/:id',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/menu/roleMenuTreeselect/:id']>
    },

    /**
     * 接口名：导出角色
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259869
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/role/export': (req?: IModels['GET/system/role/export']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/role/export',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/role/export']>
    },

    /**
     * 接口名：删除角色
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259862
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'DELETE/system/role/:id': (req?: IModels['DELETE/system/role/:id']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/role/:id',
        method: 'DELETE',
        params: req,
        extra,
      }) as Promise<IResponseTypes['DELETE/system/role/:id']>
    },

    /**
     * 接口名：角色数据权限
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259870
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/system/role/dataScope': (req?: IModels['PUT/system/role/dataScope']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/role/dataScope',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/system/role/dataScope']>
    },

    /**
     * 接口名：角色状态修改
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259881
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/system/role/changeStatus': (
      req?: IModels['PUT/system/role/changeStatus']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/role/changeStatus',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/system/role/changeStatus']>
    },

    /**
     * 接口名：查询岗位信息
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259878
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/post/:postId': (req?: IModels['GET/system/post/:postId']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/post/:postId',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/post/:postId']>
    },

    /**
     * 接口名：新增岗位
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259874
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/system/post': (req?: IModels['POST/system/post']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/post',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/system/post']>
    },

    /**
     * 接口名：修改岗位
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259872
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/system/post': (req?: IModels['PUT/system/post']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/post',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/system/post']>
    },

    /**
     * 接口名：删除岗位
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259876
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'DELETE/system/post/:id': (req?: IModels['DELETE/system/post/:id']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/post/:id',
        method: 'DELETE',
        params: req,
        extra,
      }) as Promise<IResponseTypes['DELETE/system/post/:id']>
    },

    /**
     * 接口名：导出岗位
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259877
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/post/export': (req?: IModels['GET/system/post/export']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/post/export',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/post/export']>
    },

    /**
     * 接口名：根据角色ID查询部门树结构
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259875
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dept/roleDeptTreeselect/:roleId': (
      req?: IModels['GET/system/dept/roleDeptTreeselect/:roleId']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/dept/roleDeptTreeselect/:roleId',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dept/roleDeptTreeselect/:roleId']>
    },

    /**
     * 接口名：新增部门
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259879
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/system/dept': (req?: IModels['POST/system/dept']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/dept',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/system/dept']>
    },

    /**
     * 接口名：修改部门
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259871
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/system/dept': (req?: IModels['PUT/system/dept']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/dept',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/system/dept']>
    },

    /**
     * 接口名：删除部门
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259880
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'DELETE/system/dept/:deptId': (req?: IModels['DELETE/system/dept/:deptId']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/dept/:deptId',
        method: 'DELETE',
        params: req,
        extra,
      }) as Promise<IResponseTypes['DELETE/system/dept/:deptId']>
    },

    /**
     * 接口名：/ads/shelf
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259873
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/ads/shelf': (req?: IModels['GET/ads/shelf']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/ads/shelf',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/ads/shelf']>
    },

    /**
     * 接口名：/ads/del
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259868
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/ads/del': (req?: IModels['GET/ads/del']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/ads/del',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/ads/del']>
    },

    /**
     * 接口名：/ads/modify
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259888
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/ads/modify': (req?: IModels['POST/ads/modify']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/ads/modify',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/ads/modify']>
    },

    /**
     * 接口名：/ads/add
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259891
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/ads/add': (req?: IModels['POST/ads/add']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/ads/add',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/ads/add']>
    },

    /**
     * 接口名：/monitor/online/
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259895
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'DELETE/monitor/online/:tokenId': (
      req?: IModels['DELETE/monitor/online/:tokenId']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/monitor/online/:tokenId',
        method: 'DELETE',
        params: req,
        extra,
      }) as Promise<IResponseTypes['DELETE/monitor/online/:tokenId']>
    },

    /**
     * 接口名：根据参数键名查询参数值
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259889
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/config/configKey/:configKey': (
      req?: IModels['GET/system/config/configKey/:configKey']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/config/configKey/:configKey',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/config/configKey/:configKey']>
    },

    /**
     * 接口名：新增参数配置
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259886
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/system/config': (req?: IModels['POST/system/config']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/config',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/system/config']>
    },

    /**
     * 接口名：修改参数配置
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259883
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/system/config': (req?: IModels['PUT/system/config']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/config',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/system/config']>
    },

    /**
     * 接口名：删除参数配置
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259884
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'DELETE/system/config/:configId': (
      req?: IModels['DELETE/system/config/:configId']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/config/:configId',
        method: 'DELETE',
        params: req,
        extra,
      }) as Promise<IResponseTypes['DELETE/system/config/:configId']>
    },

    /**
     * 接口名：导出参数
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259882
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/config/export': (req?: IModels['GET/system/config/export']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/config/export',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/config/export']>
    },

    /**
     * 接口名：/monitor/logininfor/
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259885
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'DELETE/monitor/logininfor/:infoIds': (
      req?: IModels['DELETE/monitor/logininfor/:infoIds']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/monitor/logininfor/:infoIds',
        method: 'DELETE',
        params: req,
        extra,
      }) as Promise<IResponseTypes['DELETE/monitor/logininfor/:infoIds']>
    },

    /**
     * 接口名：logininfor/clean
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259893
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'DELETE/monitor/logininfor/clean': (
      req?: IModels['DELETE/monitor/logininfor/clean']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/monitor/logininfor/clean',
        method: 'DELETE',
        params: req,
        extra,
      }) as Promise<IResponseTypes['DELETE/monitor/logininfor/clean']>
    },

    /**
     * 接口名：登录日志导出
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259896
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/monitor/logininfor/export': (
      req?: IModels['GET/monitor/logininfor/export']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/monitor/logininfor/export',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/monitor/logininfor/export']>
    },

    /**
     * 接口名：删除操作日志
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259890
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'DELETE/monitor/operlog/:operIds': (
      req?: IModels['DELETE/monitor/operlog/:operIds']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/monitor/operlog/:operIds',
        method: 'DELETE',
        params: req,
        extra,
      }) as Promise<IResponseTypes['DELETE/monitor/operlog/:operIds']>
    },

    /**
     * 接口名：清除操作日志
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259898
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'DELETE/monitor/operlog/clean': (
      req?: IModels['DELETE/monitor/operlog/clean']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/monitor/operlog/clean',
        method: 'DELETE',
        params: req,
        extra,
      }) as Promise<IResponseTypes['DELETE/monitor/operlog/clean']>
    },

    /**
     * 接口名：导出操作日志
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259897
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/monitor/operlog/export': (req?: IModels['GET/monitor/operlog/export']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/monitor/operlog/export',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/monitor/operlog/export']>
    },

    /**
     * 接口名：查询公告详细
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259887
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/notice/:noticeId': (req?: IModels['GET/system/notice/:noticeId']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/notice/:noticeId',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/notice/:noticeId']>
    },

    /**
     * 接口名：新增公告
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259892
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/system/notice': (req?: IModels['POST/system/notice']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/notice',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/system/notice']>
    },

    /**
     * 接口名：修改公告
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259894
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/system/notice': (req?: IModels['PUT/system/notice']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/notice',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/system/notice']>
    },

    /**
     * 接口名：删除公告
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259899
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'DELETE/system/notice/:noticeId': (
      req?: IModels['DELETE/system/notice/:noticeId']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/notice/:noticeId',
        method: 'DELETE',
        params: req,
        extra,
      }) as Promise<IResponseTypes['DELETE/system/notice/:noticeId']>
    },

    /**
     * 接口名：删除用户
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259900
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'DELETE/system/user/:ids': (req?: IModels['DELETE/system/user/:ids']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/user/:ids',
        method: 'DELETE',
        params: req,
        extra,
      }) as Promise<IResponseTypes['DELETE/system/user/:ids']>
    },

    /**
     * 接口名：新增角色
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259908
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/system/role': (req?: IModels['POST/system/role']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/role',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/system/role']>
    },

    /**
     * 接口名：修改角色
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259901
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/system/role': (req?: IModels['PUT/system/role']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/role',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/system/role']>
    },

    /**
     * 接口名：查询菜单详细
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259902
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/menu/:menuId': (req?: IModels['GET/system/menu/:menuId']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/menu/:menuId',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/menu/:menuId']>
    },

    /**
     * 接口名：新增菜单
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259920
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/system/menu': (req?: IModels['POST/system/menu']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/menu',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/system/menu']>
    },

    /**
     * 接口名：修改菜单
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259904
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/system/menu': (req?: IModels['PUT/system/menu']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/menu',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/system/menu']>
    },

    /**
     * 接口名：删除菜单
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259906
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'DELETE/system/menu/:menuId': (req?: IModels['DELETE/system/menu/:menuId']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/menu/:menuId',
        method: 'DELETE',
        params: req,
        extra,
      }) as Promise<IResponseTypes['DELETE/system/menu/:menuId']>
    },

    /**
     * 接口名：新增字典类型
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259912
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/system/dict/type': (req?: IModels['POST/system/dict/type']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/dict/type',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/system/dict/type']>
    },

    /**
     * 接口名：修改字典类型
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259913
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/system/dict/type': (req?: IModels['PUT/system/dict/type']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/dict/type',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/system/dict/type']>
    },

    /**
     * 接口名：删除字典类型
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259903
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'DELETE/system/dict/type/:dictId': (
      req?: IModels['DELETE/system/dict/type/:dictId']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/dict/type/:dictId',
        method: 'DELETE',
        params: req,
        extra,
      }) as Promise<IResponseTypes['DELETE/system/dict/type/:dictId']>
    },

    /**
     * 接口名：导出字典类型
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259905
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dict/type/export': (req?: IModels['GET/system/dict/type/export']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/dict/type/export',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dict/type/export']>
    },

    /**
     * 接口名：个人信息
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259911
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/user/profile': (req?: IModels['GET/system/user/profile']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/user/profile',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/user/profile']>
    },

    /**
     * 接口名：数据字典数据获取
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259907
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dict/type/:id': (req?: IModels['GET/system/dict/type/:id']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/dict/type/:id',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dict/type/:id']>
    },

    /**
     * 接口名：数据字典数据列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259910
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dict/data/list': (req?: IModels['GET/system/dict/data/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/dict/data/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dict/data/list']>
    },

    /**
     * 接口名：查询字典数据详细
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259915
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dict/data/:dictCode': (
      req?: IModels['GET/system/dict/data/:dictCode']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/dict/data/:dictCode',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dict/data/:dictCode']>
    },

    /**
     * 接口名：新增字典数据
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259909
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/system/dict/data': (req?: IModels['POST/system/dict/data']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/dict/data',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/system/dict/data']>
    },

    /**
     * 接口名：修改字典数据
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259919
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/system/dict/data': (req?: IModels['PUT/system/dict/data']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/dict/data',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/system/dict/data']>
    },

    /**
     * 接口名：删除字典数据
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259921
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'DELETE/system/dict/data/:dictCode': (
      req?: IModels['DELETE/system/dict/data/:dictCode']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/dict/data/:dictCode',
        method: 'DELETE',
        params: req,
        extra,
      }) as Promise<IResponseTypes['DELETE/system/dict/data/:dictCode']>
    },

    /**
     * 接口名：导出字典数据
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259916
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/system/dict/data/export': (req?: IModels['GET/system/dict/data/export']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/dict/data/export',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/system/dict/data/export']>
    },

    /**
     * 接口名：修改用户个人信息
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259918
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/system/user/profile': (req?: IModels['PUT/system/user/profile']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/system/user/profile',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/system/user/profile']>
    },

    /**
     * 接口名：用户密码重置
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259914
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/system/user/profile/updatePwd': (
      req?: IModels['PUT/system/user/profile/updatePwd']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/user/profile/updatePwd',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/system/user/profile/updatePwd']>
    },

    /**
     * 接口名：用户头像上传
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302222&mod=510155&itf=2259917
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/system/user/profile/avatar': (
      req?: IModels['POST/system/user/profile/avatar']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/system/user/profile/avatar',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/system/user/profile/avatar']>
    },
  }
}
