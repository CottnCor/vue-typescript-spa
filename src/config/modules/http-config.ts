/*
 * http配置
 */

// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
    timeout: 20000,
    maxContentLength: 2000,
    headers: {}
};

// API 默认配置
export const API_DEFAULT_CONFIG = {
    mockBaseURL: '',
    mock: true,
    debug: false,
    sep: '/'
};

// 是否mock
export const IS_MOCK = true;

// 线上环境
export const ONLINE_HOST = 'https://xxx.com';

// 测试环境
export const QA_HOST = 'http://xxx.com';

// mock
export const MOCK_HOST = './mock/';

// 当前的host ONLINE_HOST | QA_HOST | MOCK_HOST
export const CURRENT_HOST = MOCK_HOST;

// 接口请求公共参数
export const CONMOM_PRAMS = {};
