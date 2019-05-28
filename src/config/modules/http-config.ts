/*
 * http配置
 */

// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
    timeout: 60000,
    maxContentLength: 2000,
    headers: {}
};

// API 默认配置
export const API_DEFAULT_CONFIG = {
    mockBaseURL: '',
    mock: false,
    debug: true,
    sep: '/'
};

// 是否mock
export const IS_MOCK = false;

// 线上环境
export const ONLINE_HOST = 'http://49.4.82.201:8093/';

// 测试环境
export const QA_HOST = 'http://172.16.56.98:8080/';

// mock
export const MOCK_HOST = './mock/';

// 当前的host ONLINE_HOST | QA_HOST | MOCK_HOST
export const CURRENT_HOST = MOCK_HOST;

// 接口请求公共参数
export const CONMOM_PRAMS = {};
