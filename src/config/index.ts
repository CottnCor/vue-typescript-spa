export { APP_PRAMS } from './modules/app-config';

export { COOKIE_KEYS, COOKIE_EXPIRES } from './modules/cookies-config';

export {
    DEBUG_VUE_DEVTOOLS,
    DEBUG_VUE_DEBUG,
    DEBUG_VUE_TIP,
    CONSOLE_REQUEST_ENABLE,
    CONSOLE_RESPONSE_ENABLE,
    CONSOLE_MONITOR_ENABLE,
    AJAX_LOCALLY_ENABLE,
    MONITOR_ENABLE,
    MOCK_TIMEOUT
} from './modules/debugger-config';

export {
    AXIOS_DEFAULT_CONFIG,
    API_DEFAULT_CONFIG,
    IS_MOCK,
    ONLINE_HOST,
    QA_HOST,
    MOCK_HOST,
    CURRENT_HOST,
    CONMOM_PRAMS
} from './modules/http-config';

export { OPEN_MODULES, NEED_LOGGED_PAGES } from './modules/intercept-config';

export { ROOT_ROUTER, ASSIST_ROUTER} from './modules/router-config';

export { MAPBOX_ACCESSTOKEN, MAP_VEC_URL, MAP_IMG_URL, MAP_CVA_URL } from './modules/map-config';

// 平台
export const HOST_PLATFORM = 'WEB';

// 环境
export const NODE_ENV = process.env.NODE_ENV || 'prod';

// 是否生产环境
export const IS_PROD = process.env.NODE_ENV === 'production' ? true : false;
