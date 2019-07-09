import { ROOT_PATH, ROOT_ROUTER, ROOT_ROUTER_YN } from "@/config";

/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */
const rootRouter = [
  {
    path: ROOT_PATH,
    redirect: ROOT_PATH + ROOT_ROUTER_YN.add.name
  },
  {
    path: ROOT_PATH + ROOT_ROUTER_YN.add.name,
    name: ROOT_ROUTER_YN.add.name,
    component: () => import("@/views/home-page/HomePage_YN.vue"),
    props: route => ({
      appkey: route.query.appkey,
      timestamp: route.query.timestamp,
      sign: route.query.sign,
      userId: route.query.userId,
      wkt: route.query.wkt,
      type: ROOT_ROUTER.add.name
    }),
    meta: {
      icon: "",
      keepAlive: true,
      navigable: true,
      title: ROOT_ROUTER_YN.add.title
    }
  },
  {
    path: ROOT_PATH + ROOT_ROUTER_YN.loading.name,
    name: ROOT_ROUTER_YN.loading.name,
    component: () => import("@/views/home-page/HomePage_YN.vue"),
    props: route => ({
      appkey: route.query.appkey,
      timestamp: route.query.timestamp,
      sign: route.query.sign,
      userId: route.query.userId,
      queryId: route.query.queryId,
      type: ROOT_ROUTER.loading.name
    }),
    meta: {
      icon: "",
      keepAlive: true,
      navigable: true,
      title: ROOT_ROUTER_YN.loading.title
    }
  },
  {
    path: ROOT_PATH + ROOT_ROUTER_YN.edit.name,
    name: ROOT_ROUTER_YN.edit.name,
    component: () => import("@/views/home-page/HomePage_YN.vue"),
    props: route => ({
      appkey: route.query.appkey,
      timestamp: route.query.timestamp,
      sign: route.query.sign,
      userId: route.query.userId,
      type: ROOT_ROUTER.edit.name
    }),
    meta: {
      icon: "",
      keepAlive: true,
      navigable: true,
      title: ROOT_ROUTER_YN.edit.title
    }
  },
  {
    path: ROOT_PATH + ROOT_ROUTER_YN.get.name,
    name: ROOT_ROUTER_YN.get.name,
    component: () => import("@/views/home-page/HomePage_YN.vue"),
    props: route => ({
      appkey: route.query.appkey,
      timestamp: route.query.timestamp,
      sign: route.query.sign,
      userId: route.query.userId,
      queryId: route.query.queryId,
      type: ROOT_ROUTER.get.name
    }),
    meta: {
      icon: "",
      keepAlive: true,
      navigable: true,
      title: ROOT_ROUTER_YN.get.title
    }
  }
];

export default rootRouter;
