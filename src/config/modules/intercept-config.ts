/*
 * 拦截配置
 */

import { ASSIST_ROUTER, ROOT_ROUTER } from './router-config';

// 需要登陆权限的模块（应通过服务获取）
export const OPEN_MODULES = [];

// 需要登陆权限的页面（应通过服务获取）
export const NEED_LOGGED_PAGES = [
    ROOT_ROUTER.add.name,
    ROOT_ROUTER.edit.name,
    ROOT_ROUTER.loading.name,
    ASSIST_ROUTER.login.name,
    ASSIST_ROUTER.error.name
];
