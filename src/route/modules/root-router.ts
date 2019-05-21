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
        redirect: '/' + ROOT_ROUTER.home.name
    },
    {
        path: '/' + ROOT_ROUTER.home.name,
        name: ROOT_ROUTER.home.name,
        component: () => import('@/views/home-page/HomePage.vue'),
        meta: {
            icon: '',
            keepAlive: true,
            navigable: true,
            title: ROOT_ROUTER.home.title
        }
    }
];

export default rootRouter;
