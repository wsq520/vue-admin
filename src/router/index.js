import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  // {
  //   path: "/",
  //   component: Layout,
  //   redirect: "/dashboard",
  //   children: [
  //     {
  //       path: "dashboard",
  //       name: "Dashboard",
  //       component: () => import("@/views/dashboard/index"),
  //       meta: { title: "Dashboard1", icon: "dashboard" },
  //     },
  //   ],
  // },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/grade",
    component: Layout,
    children: [
      {
        path: "index",
        name: "grade",
        component: () => import("@/views/grade/index"),
        meta: { title: "年级管理", icon: "form" },
      },
    ],
  },
  {
    path: "/college",
    component: Layout,
    children: [
      {
        path: "index",
        name: "college",
        component: () => import("@/views/college/index"),
        meta: { title: "学院管理", icon: "form" },
      },
    ],
  },
  {
    path: "/major",
    component: Layout,
    children: [
      {
        path: "index",
        name: "major",
        component: () => import("@/views/major/index"),
        meta: { title: "专业管理", icon: "form" },
      },
    ],
  },
  {
    path: "/class",
    component: Layout,
    children: [
      {
        path: "index",
        name: "class",
        component: () => import("@/views/class/index"),
        meta: { title: "班级管理", icon: "form" },
      },
    ],
  },
  {
    path: "/student",
    component: Layout,
    children: [
      {
        path: "index",
        name: "student",
        component: () => import("@/views/student/index"),
        meta: { title: "学生管理", icon: "form" },
      },
    ],
  },
  {
    path: "/club",
    component: Layout,
    name: "club",
    redirect: "/club/menu1",
    meta: {
      title: "社团管理",
      icon: "nested",
    },
    children: [
      {
        path: "menu1",
        name: "clubtype",
        component: () => import("@/views/club_type/index"),
        meta: { title: "类型管理", icon: "form" },
      },
      {
        path: "menu2",
        name: "club",
        component: () => import("@/views/club/index"),
        meta: { title: "部门管理", icon: "form" },
      },
      {
        path: "menu3",
        name: "club_zhaoxin",
        component: () => import("@/views/club_zhaoxin/index"),
        meta: { title: "招新管理(缺新增)", icon: "form" },
      },
      {
        path: "menu4",
        name: "club_gonggao",
        component: () => import("@/views/club_gonggao/index"),
        meta: { title: "公告管理", icon: "form" },
      },
      {
        path: "menu5",
        name: "club_account_registry",
        component: () => import("@/views/club_account_registry/index"),
        meta: { title: "注册管理", icon: "form" },
      },
      {
        path: "menu6",
        name: "club_huo_dong",
        component: () => import("@/views/club_huodong/index"),
        meta: { title: "活动管理", icon: "form" },
      },
    ],
  },
  {
    path: "/gonggao",
    component: Layout,
    children: [
      {
        path: "index",
        name: "gonggao",
        component: () => import("@/views/admin_gonggao/index"),
        meta: { title: "公告管理", icon: "form" },
      },
    ],
  },
  {
    path: "/swiper",
    component: Layout,
    children: [
      {
        path: "index",
        name: "swiper",
        component: () => import("@/views/swiper/index"),
        meta: { title: "轮播图", icon: "form" },
      },
    ],
  },
  {
    path: "/admininfo",
    component: Layout,
    children: [
      {
        path: "index",
        name: "admininfo",
        component: () => import("@/views/admin_info/index"),
        meta: { title: "我的主页", icon: "form" },
      },
    ],
  },
  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    name: "Nested",
    meta: {
      title: "Nested",
      icon: "nested",
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/nested/menu1/index"), // Parent router-view
        name: "Menu1",
        meta: { title: "Menu1" },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/nested/menu1/menu1-1"),
            name: "Menu1-1",
            meta: { title: "Menu1-1" },
          },
          {
            path: "menu1-2",
            component: () => import("@/views/nested/menu1/menu1-2"),
            name: "Menu1-2",
            meta: { title: "Menu1-2" },
            children: [
              {
                path: "menu1-2-1",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-1"),
                name: "Menu1-2-1",
                meta: { title: "Menu1-2-1" },
              },
              {
                path: "menu1-2-2",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-2"),
                name: "Menu1-2-2",
                meta: { title: "Menu1-2-2" },
              },
            ],
          },
          {
            path: "menu1-3",
            component: () => import("@/views/nested/menu1/menu1-3"),
            name: "Menu1-3",
            meta: { title: "Menu1-3" },
          },
        ],
      },
      {
        path: "menu2",
        component: () => import("@/views/nested/menu2/index"),
        name: "Menu2",
        meta: { title: "menu2" },
      },
    ],
  },
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
