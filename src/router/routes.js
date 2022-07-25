// import store from '@/state/store'

export default [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/auth/login'),
  },
  {
    path: '/logout',
    name: 'logout',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { requiresAuth: true },
    component: () => import('../views/dashboard/index'),
  },
  {
    path: '/customers',
    name: 'customers',
    meta: { authRequired: true },
    component: () => import('../views/customer/index'),
  },

  {
    path: '/transactions',
    name: 'transactions',
    meta: { authRequired: true },
    component: () => import('../views/transactions/index'),
  },

  {
    path: '/order',
    name: 'order',
    meta: { authRequired: true },
    component: () => import('../views/order/index'),
  },

  {
    path: '/order/add-order',
    name: 'add-order',
    meta: { authRequired: true },
    component: () => import('../views/order/addOrder'),
  },

  {
    path: '/administrator',
    name: 'administrator',
    meta: { authRequired: true },
    component: () => import('../views/administrator/index'),
  },

  {
    path: '/administrator/add-administrator',
    name: 'add-administrator',
    meta: { authRequired: true },
    component: () => import('../views/administrator/addAdministrator'),
  },

  {
    path: '/auth/login-1',
    name: 'login-1',
    meta: { authRequired: true },
    component: () => import('../views/pages/sample-auth/login-1'),
  },
  {
    path: '/auth/register-1',
    name: 'register-1',
    meta: { authRequired: true },
    component: () => import('../views/pages/sample-auth/register-1'),
  },
  {
    path: '/auth/lock-screen-1',
    name: 'Lock-screen-1',
    meta: { authRequired: true },
    component: () => import('../views/pages/sample-auth/lock-screen-1'),
  },
  {
    path: '/auth/recoverpwd-1',
    name: 'Recoverpwd-1',
    meta: { authRequired: true },
    component: () => import('../views/pages/sample-auth/recoverpwd-1'),
  },
  {
    path: '/icons/font-awesome',
    name: 'Font Awesome 5',
    meta: { authRequired: true },
    component: () => import('../views/pages/icons/font-awesome/index'),
  },
  {
    path: '/icons/dripicons',
    name: 'Dripicons',
    meta: { authRequired: true },
    component: () => import('../views/pages/icons/dripicons'),
  },
  {
    path: '/icons/material-design',
    name: 'Material Design',
    meta: { authRequired: true },
    component: () => import('../views/pages/icons/materialdesign/index'),
  },
  {
    path: '/icons/remix',
    name: 'Remix Icons',
    meta: { authRequired: true },
    component: () => import('../views/pages/icons/remix/index'),
  },
  {
    path: '/ui/buttons',
    name: 'Buttons',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/buttons'),
  },
  {
    path: '/ui/alerts',
    name: 'Alerts',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/alerts'),
  },
  {
    path: '/ui/grid',
    name: 'Grid',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/grid'),
  },
  {
    path: '/ui/cards',
    name: 'Cards',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/cards'),
  },
  {
    path: '/ui/carousel',
    name: 'Carousel',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/carousel'),
  },
  {
    path: '/ui/dropdowns',
    name: 'Dropdowns',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/dropdowns'),
  },
  {
    path: '/ui/images',
    name: 'Images',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/images'),
  },
  {
    path: '/ui/modals',
    name: 'Modals',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/modals'),
  },
  {
    path: '/ui/rangeslider',
    name: 'Range - slider',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/rangeslider'),
  },
  {
    path: '/ui/progressbar',
    name: 'Progressbar',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/progressbars'),
  },
  {
    path: '/ui/sweet-alert',
    name: 'Sweet-alert',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/sweet-alert'),
  },
  {
    path: '/ui/tabs-accordion',
    name: 'Tabs & Accordion',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/tabs-accordions'),
  },
  {
    path: '/ui/typography',
    name: 'Typography',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/typography'),
  },
  {
    path: '/ui/video',
    name: 'Video',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/video'),
  },
  {
    path: '/ui/general',
    name: 'General',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/general'),
  },
  {
    path: '/ui/lightbox',
    name: 'Lightbox',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/lightbox'),
  },
  {
    path: '/ui/notification',
    name: 'Notification',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/notification'),
  },
  {
    path: '/ui/rating',
    name: 'Rating',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/rating'),
  },
  {
    path: '/ui/session-timeout',
    name: 'Session Timeout',
    meta: { authRequired: true },
    component: () => import('../views/pages/ui/session-timeout'),
  },
  {
    path: '/form/elements',
    name: 'Form Elements',
    meta: { authRequired: true },
    component: () => import('../views/pages/forms/elements'),
  },
  {
    path: '/form/validation',
    name: 'Form validation',
    meta: { authRequired: true },
    component: () => import('../views/pages/forms/validation'),
  },
  {
    path: '/form/advanced',
    name: 'Form Advanced',
    meta: { authRequired: true },
    component: () => import('../views/pages/forms/advanced'),
  },
  {
    path: '/form/editor',
    name: 'CK Editor',
    meta: { authRequired: true },
    component: () => import('../views/pages/forms/ckeditor'),
  },
  {
    path: '/form/uploads',
    name: 'File Uploads',
    meta: { authRequired: true },
    component: () => import('../views/pages/forms/uploads'),
  },
  {
    path: '/form/wizard',
    name: 'Form Wizard',
    meta: { authRequired: true },
    component: () => import('../views/pages/forms/wizard'),
  },
  {
    path: '/form/mask',
    name: 'Form Mask',
    meta: { authRequired: true },
    component: () => import('../views/pages/forms/mask'),
  },

  {
    path: "*",
    name: "",
    component: () => import('../views/dashboard/index'),
    meta: { requiresAuth: true },
  },
];
