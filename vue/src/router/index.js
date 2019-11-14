import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1                                         只有当路由中 children.length >= 1 才出现的子菜单
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)    如果设置为true，则项目将不会显示在边栏中（默认值为false）
 * alwaysShow: true               if set true, will always show the root menu                         如果设置为true，将始终显示根菜单;不管子菜单是否只有一个
 *                                if not set alwaysShow, when item has more than one children route,  如果未设置AlwaysShow，则当项有多个子路由时，
 *                                it will becomes nested mode, otherwise not show the root menu       它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb                如果设置为noRedirect，则不会在breadcrumb中重定向
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)                      名称由<keep alive>使用（必须设置！！！！）
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)                  控制页面角色（可以设置多个角色）
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)              侧边栏和面包屑中显示的名称（推荐设置）
    icon: 'svg-name'             the icon show in the sidebar                                         图标显示在侧边栏中（请使用svg图标）
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)    如果设置为false，该项将隐藏在breadcrumb中（默认值为true）
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set             如果设置路径，侧边栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard', defaultPage: true }
    }]
  },

  {
    path: '/obituary',
    component: Layout,
    name: 'obituary',
    meta: {
      title: '生死簿',
      icon: 'obituary'
    },
    alwaysShow: true,
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/obituary/user'),
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'test',
        name: 'test',
        component: () => import('@/views/table/test'),
        meta: { title: 'test', icon: 'table' }
      },
      {
        path: 'page',
        name: 'Page',
        component: () => import('@/views/page/index'),
        meta: { title: 'Page', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
