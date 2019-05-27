import { APP_PRAMS } from './app-config';

/*
 * 主菜单路由配置
 */
export const ROOT_ROUTER = {
    add: {
        name: 'add',
        label: '',
        icon: 'smile',
        title: APP_PRAMS.title
    },
    edit: {
        name: 'edit',
        label: '',
        icon: 'smile',
        title: APP_PRAMS.title
    },
    loading: {
        name: 'loading',
        label: '',
        icon: 'smile',
        title: APP_PRAMS.title
    }
};

/**
 * 辅助菜单路由配置
 */
export const ASSIST_ROUTER = {
    login: {
        name: 'login',
        label: '',
        icon: '',
        title: '登陆验证' + ' | ' + APP_PRAMS.title
    },
    search: {
        name: 'search',
        label: '',
        icon: '',
        title: '开始搜索吧' + ' | ' + APP_PRAMS.title
    },
    error: {
        name: 'error',
        label: '',
        icon: '',
        title: '出错了 ～(　TロT)σ' + ' | ' + APP_PRAMS.title
    }
};
