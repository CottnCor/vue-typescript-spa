import { ROOT_ROUTER } from '@/config';

/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */
const rootRouter = [
    {
        path: '/',
        redirect: '/' + ROOT_ROUTER.add.name
    },
    {
        path: '/' + ROOT_ROUTER.add.name,
        name: ROOT_ROUTER.add.name,
        component: () => import('@/views/home-page/HomePage.vue'),
        props: (route) => ({
            appkey: route.query.appkey,
            userId: route.query.userId,
            wkt: route.query.wkt
        }),
        meta: {
            icon: '',
            keepAlive: true,
            navigable: true,
            title: ROOT_ROUTER.add.title
        }
    },
    {
        path: '/' + ROOT_ROUTER.loading.name,
        name: ROOT_ROUTER.loading.name,
        component: () => import('@/views/home-page/HomePage.vue'),
        props: (route) => ({
            appkey: route.query.appkey,
            userId: route.query.userId,
            queryId: route.query.queryId
        }),
        meta: {
            icon: '',
            keepAlive: true,
            navigable: true,
            title: ROOT_ROUTER.loading.title
        }
    },
    {
        path: '/' + ROOT_ROUTER.edit.name,
        name: ROOT_ROUTER.edit.name,
        component: () => import('@/views/home-page/HomePage.vue'),
        props: (route) => ({
            appkey: route.query.appkey,
            userId: route.query.userId
        }),
        meta: {
            icon: '',
            keepAlive: true,
            navigable: true,
            title: ROOT_ROUTER.edit.title
        }
    }
];

export default rootRouter;
