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
  { value: '0', label: '正常' },
  { value: '1', label: '停用' },
];

export const SYS_SHOW_HIDE = [
  { value: '0', label: '显示' },
  { value: '1', label: '隐藏' },
];
/**
 * 用户相关枚举
 */
export const SYS_USER_SEX = [
  { value: '2', label: '女' },
  { value: '1', label: '男' },
];
