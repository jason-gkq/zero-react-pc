/**
 *
 * ### proTable columns: ProColumns valueType 枚举类型
 *
 * - password => 密码输入框
 * - money => 金额输入框
 * - textarea => 文本域
 * - date => 日期
 * - dateTime => 日期时间
 * - dateWeek => 周
 * - dateMonth => 月
 * - dateQuarter => 季度输入
 * - dateYear => 年份输入
 * - dateRange => 日期区间
 * - dateTimeRange => 日期时间区间
 * - time => 时间
 * - timeRange => 时间区间
 * - text => 文本框
 * - select => 下拉框
 * - treeSelect => 树形下拉框
 * - checkbox => 多选框
 * - rate => 星级组件
 * - radio => 单选框
 * - radioButton => 按钮单选框
 * - progress => 进度条
 * - percent => 百分比组件
 * - digit => 数字输入框
 * - second => 秒格式化
 * - avatar => 头像
 * - code => 代码框
 * - switch => 开关
 * - fromNow => 相对于当前时间
 * - image => 图片
 * - jsonCode => 代码框，但是带了 json 格式化
 * - color => 颜色选择器
 * - cascader => 级联选择器
 */

/**
 *
 * 以下枚举均有该项替换
 * sys_normal_disable
 * sys_role_type
 */
export const SYS_COMMON_STATUS = [
  { value: "0", label: "正常" },
  { value: "1", label: "停用" },
];

export const SYS_USER_STATUS = [
  { value: "1", label: "在职" },
  { value: "2", label: "试用" },
  { value: "4", label: "离职" },
  { value: "5", label: "退休" },
];

export const SYS_OPER_TYPE = [
  { value: "1", label: "新增" },
  { value: "2", label: "修改" },
  { value: "3", label: "删除" },
  { value: "4", label: "授权" },
  { value: "5", label: "导出" },
  { value: "6", label: "导入" },
  { value: "7", label: "强退" },
  { value: "8", label: "生成代码" },
  { value: "9", label: "清空数据" },
];

export const SYS_SHOW_HIDE = [
  { value: "0", label: "显示" },
  { value: "1", label: "隐藏" },
];

/**
 * 角色相关枚举
 */

/**
 * 用户相关枚举
 */
export const SYS_USER_SEX = [
  { value: "2", label: "女" },
  { value: "1", label: "男" },
];
export const SYS_USER_TYPE = [
  { value: "outer", label: "外部人员" },
  { value: "inner", label: "内部人员" },
];
export const SYS_OUTER_USER_TYPE = [
  { value: "1", label: "总部员工" },
  { value: "2", label: "营业部员工" },
  { value: "3", label: "外部人员" },
  { value: "4", label: "非直管子公司HR" },
];

/**
 * 参数设置
 */
export const SYS_YES_NO = [
  { value: "Y", label: "是" },
  { value: "N", label: "否" },
];

/**
 * 公告管理
 */
export const SYS_NOTICE_TYPE = [
  { value: "1", label: "通知" },
  { value: "2", label: "公告" },
];

/**
 * 消息中心
 */
export const SYS_GROUP_TYPE = [
  { value: "1", label: "手机号群组" },
  { value: "2", label: "资金账号群组" },
];
export const SYS_NEWS_TYPE = [
  //消息类型
  { value: "1", label: "公告相关" },
  { value: "2", label: "投教相关" },
  { value: "3", label: "新股新债" },
  { value: "4", label: "配股配债" },
  { value: "5", label: "融资融券" },
  { value: "6", label: "期权" },
  { value: "7", label: "持仓股提醒" },
  { value: "8", label: "基金理财" },
  { value: "9", label: "证件相关" },
  { value: "10", label: "风测相关" },
  { value: "11", label: "活动推荐" },
  { value: "12", label: "卡劵提醒" },
  { value: "13", label: "PC客户端" },
  { value: "14", label: "APP客户端" },
  { value: "15", label: "维护变动" },
  { value: "16", label: "营业部提醒" },
];
export const SYS_NEWS_CLASS = [
  { value: "1", label: "质询提醒" },
  { value: "2", label: "交易提醒" },
  { value: "3", label: "账户提醒" },
  { value: "4", label: "热门活动" },
  { value: "5", label: "系统相关" },
  { value: "6", label: "分支机构" },
];
export const SYS_EXAMINE_STATUS = [
  { value: "1", label: "无" },
  { value: "2", label: "未审核" },
  { value: "3", label: "审核通过" },
  { value: "4", label: "审核不通过" },
];
export const SYS_SEND_STATUS = [
  { value: "1", label: "已下发" },
  { value: "2", label: "未送达" },
  { value: "3", label: "已送达" },
];
export const SYS_SEND_OBJ = [
  { value: "1", label: "客户" },
  { value: "2", label: "员工" },
  { value: "3", label: "客户和员工" },
];
