const { rapper } = require("rap");
const { resolve } = require("path");

rapper({
  type: "normal",
  projectId: 302222,
  rapperPath: resolve(__dirname, "../src/rapper/"),
  rapUrl: "http://rap2.taobao.org",
  apiUrl:
    "http://rap2api.taobao.org/repository/get?id=302222&token=eAPs0RcJ-VCGhUBlFKDr4Zm9P56Z70bQ",
  /** 返回值类型转换，type 名必须为 ResSelector ，以下为默认即不做转换 */
  resSelector: `type ResSelector<T> = {
    data: T
    code: number
    msg: string
    [key: string]: any
    header: {[index: string]: string}
  }`,
});
