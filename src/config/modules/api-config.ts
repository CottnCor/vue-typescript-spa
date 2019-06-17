/*
 * 基本配置
 */

// 云查询相关
export const CLOUD_QUERY_API = {
  add: "cloudQuery/add",
  list: "cloudQuery/list",
  get: "cloudQuery/get",
  report: "cloudQuery/report",
  xzqTag: "cloudQuery/xzqTag"
};

// 是否mock
export const IS_MOCK = false;

// 线上环境
export const ONLINE_HOST = "/";

// 测试环境
export const QA_HOST = "http://127.0.0.1:8093/";

// mock
export const MOCK_HOST = "./mock/";

// 当前的host ONLINE_HOST | QA_HOST | MOCK_HOST
export const CURRENT_HOST = ONLINE_HOST;
