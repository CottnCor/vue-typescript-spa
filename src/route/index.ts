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
    const verify = to.query.appkey && to.query.userid ? true : false;
    if (!verify) {
        next({
            name: ASSIST_ROUTER.error.name
        });
    } else {
        next();
    }
});

router.afterEach((to: any) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
});

export default router;
