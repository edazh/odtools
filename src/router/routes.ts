import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/tools',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'json', component: () => import('pages/tools/JsonPage.vue') },
      { path: 'base64-text', component: () => import('pages/tools/Base64TextPage.vue') },
      { path: 'base64-img', component: () => import('pages/tools/Base64ImgPage.vue') },
      { path: 'password', component: () => import('pages/tools/PasswordPage.vue') },
      { path: 'uuid', component: () => import('pages/tools/UuidPage.vue') },
      { path: 'decimal', component: () => import('pages/tools/DecimalPage.vue') },
      { path: 'url-encode', component: () => import('pages/tools/UrlEncodePage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
