import Vue from 'vue';
import Router from 'vue-router';
import rootRouter from './modules/root-router';
import { ASSIST_ROUTER } from '@/config';

Vue.use(Router);

const router = new Router({
    routes: [
        ...rootRouter,
        {
            path: '/' + ASSIST_ROUTER.error.name,
            name: ASSIST_ROUTER.error.name,
            component: () => import('@/views/error-tips/ErrorTips.vue'),
            props: (route) => ({
                code: route.query.code,
                msg: route.query.msg
            }),
            meta: {
                icon: '',
                keepAlive: true,
                navigable: false,
                title: ASSIST_ROUTER.error.title
            }
        },
        {
            path: '*',
            redirect: '/' + ASSIST_ROUTER.error.name
        }
    ],
    mode: 'history'
});

// 路由拦截
router.beforeEach((to: any, from: any, next: any) => {
    if (to.name === ASSIST_ROUTER.error.name) {
        next();
    } else {
        const verify = to.query.appkey && to.query.userId ? true : false;
        if (!verify) {
            next({
                name: ASSIST_ROUTER.error.name
            });
        } else {
            next();
        }
    }
});

router.afterEach((to: any) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
});

export default router;
