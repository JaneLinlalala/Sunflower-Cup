import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from 'D:/Project/Sunflower-Cup/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    "path": "/",
    "component": __IS_BROWSER
    ? _dvaDynamic({

      component: () => import(/* webpackChunkName: "layouts__BlankLayout" */'../../layouts/BlankLayout'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../../layouts/BlankLayout').default,
    "routes": [
      {
        "path": "/user",
        "component": __IS_BROWSER
    ? _dvaDynamic({

      component: () => import(/* webpackChunkName: "layouts__UserLayout" */'../../layouts/UserLayout'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../../layouts/UserLayout').default,
        "routes": [
          {
            "path": "/user",
            "redirect": "/user/login",
            "exact": true
          },
          {
            "name": "login",
            "path": "/user/login",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__user__login__model.ts' */'D:/Project/Sunflower-Cup/src/pages/user/login/model.ts').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "p__user__login" */'../user/login'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../user/login').default,
            "exact": true
          },
          {
            "name": "登录",
            "path": "/user/login-2",
            "component": __IS_BROWSER
              ? _dvaDynamic({
                app: require('@tmp/dva').getApp(),
                models: () => [
                  import(/* webpackChunkName: 'p__user__login__model.ts' */'D:/Project/Sunflower-Cup/src/pages/user/login-2/model.ts').then(m => { return { namespace: 'model',...m.default}})
                ],
                component: () => import(/* webpackChunkName: "p__user__login" */'../user/login-2'),
                LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
              })
              : require('../user/login-2').default,
            "exact": true
          },
          {
            "name": "register-result",
            "path": "/user/register-result",
            "component": __IS_BROWSER
    ? _dvaDynamic({

      component: () => import(/* webpackChunkName: "p__user__register-result" */'../user/register-result'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../user/register-result').default,
            "exact": true
          },
          {
            "name": "register",
            "path": "/user/register",
            "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__user__register__model.ts' */'D:/Project/Sunflower-Cup/src/pages/user/register/model.ts').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "p__user__register" */'../user/register'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../user/register').default,
            "exact": true
          },
          {
            "name": "register-expert",
            "path": "/user/register-expert",
            "component": __IS_BROWSER
              ? _dvaDynamic({
                app: require('@tmp/dva').getApp(),
                models: () => [
                  import(/* webpackChunkName: 'p__user__register__model.ts' */'D:/Project/Sunflower-Cup/src/pages/user/register-expert/model.ts').then(m => { return { namespace: 'model',...m.default}})
                ],
                component: () => import(/* webpackChunkName: "p__user__register" */'../user/register-expert'),
                LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
              })
              : require('../user/register-expert').default,
            "exact": true
          },
          {
            "component": __IS_BROWSER
    ? _dvaDynamic({

      component: () => import(/* webpackChunkName: "p__404" */'../404'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../404').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/Project/Sunflower-Cup/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/",
        "component": __IS_BROWSER
    ? _dvaDynamic({

      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../../layouts/BasicLayout'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../../layouts/BasicLayout').default,
        "Routes": [require('../Authorized').default],
        "authority": [
          "admin",
          "user"
        ],
        "routes": [
          {
            "path": "/participant/step-form",
            "name": "添加作品",
            "icon": "form",
            "component": __IS_BROWSER
              ? _dvaDynamic({
                app: require('@tmp/dva').getApp(),
                models: () => [
                  import(/* webpackChunkName: 'p__dashboard__analysis__model.tsx' */'D:/Project/Sunflower-Cup/src/pages/participant/step-form/model.ts').then(m => { return { namespace: 'model',...m.default}})
                ],
                component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../participant/step-form'),
                LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
              })
              : require('../participant/step-form').default,
            "exact": true
          },
          {
            "path": "/participant/table-list",
            "name": "作品列表",
            "icon": "profile",
            "component": __IS_BROWSER
              ? _dvaDynamic({
                app: require('@tmp/dva').getApp(),
                models: () => [
                  import(/* webpackChunkName: 'p__dashboard__analysis__model.tsx' */'D:/Project/Sunflower-Cup/src/pages/participant/table-list/model.ts').then(m => { return { namespace: 'model',...m.default}})
                ],
                component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../participant/table-list'),
                LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
              })
              : require('../participant/table-list').default,
            "exact": true
          },
          {
            "path": "/participant/advanced",
            "name": "作品详情",
            "icon": "table",
            "component": __IS_BROWSER
              ? _dvaDynamic({
                app: require('@tmp/dva').getApp(),
                models: () => [
                  import(/* webpackChunkName: 'p__dashboard__analysis__model.tsx' */'D:/Project/Sunflower-Cup/src/pages/participant/advanced/model.ts').then(m => { return { namespace: 'model',...m.default}})
                ],
                component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../participant/advanced'),
                LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
              })
              : require('../participant/advanced').default,
            "exact": true
          },
          {
            "path": "/participant/basic-list",
            "name": "作品列表2",
            "icon": "profile",
            "component": __IS_BROWSER
              ? _dvaDynamic({
                app: require('@tmp/dva').getApp(),
                models: () => [
                  import(/* webpackChunkName: 'p__dashboard__analysis__model.tsx' */'D:/Project/Sunflower-Cup/src/pages/participant/basic-list/model.ts').then(m => { return { namespace: 'model',...m.default}})
                ],
                component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../participant/basic-list'),
                LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
              })
              : require('../participant/basic-list').default,
            "exact": true
          },
          {
            "path": "/dashboard",
            "name": "dashboard",
            "icon": "dashboard",
            "routes": [
              {
                "name": "analysis",
                "path": "/dashboard/analysis",
                "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__dashboard__analysis__model.tsx' */'D:/Project/Sunflower-Cup/src/pages/dashboard/analysis/model.tsx').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../dashboard/analysis'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../dashboard/analysis').default,
                "exact": true
              },
              {
                "name": "monitor",
                "path": "/dashboard/monitor",
                "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__dashboard__monitor__model.ts' */'D:/Project/Sunflower-Cup/src/pages/dashboard/monitor/model.ts').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../dashboard/monitor'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../dashboard/monitor').default,
                "exact": true
              },
              {
                "name": "workplace",
                "path": "/dashboard/workplace",
                "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__dashboard__workplace__model.ts' */'D:/Project/Sunflower-Cup/src/pages/dashboard/workplace/model.ts').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../dashboard/workplace'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../dashboard/workplace').default,
                "exact": true
              },
              {
                "component": () => React.createElement(require('D:/Project/Sunflower-Cup/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/form",
            "icon": "form",
            "name": "form",
            "routes": [
              {
                "name": "basic-form",
                "path": "/form/basic-form",
                "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__form__basic-form__model.ts' */'D:/Project/Sunflower-Cup/src/pages/form/basic-form/model.ts').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../form/basic-form'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../form/basic-form').default,
                "exact": true
              },
              {
                "name": "step-form",
                "path": "/form/step-form",
                "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__form__step-form__model.ts' */'D:/Project/Sunflower-Cup/src/pages/form/step-form/model.ts').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../form/step-form'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../form/step-form').default,
                "exact": true
              },
              {
                "name": "advanced-form",
                "path": "/form/advanced-form",
                "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__form__advanced-form__model.ts' */'D:/Project/Sunflower-Cup/src/pages/form/advanced-form/model.ts').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../form/advanced-form'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../form/advanced-form').default,
                "exact": true
              },
              {
                "component": () => React.createElement(require('D:/Project/Sunflower-Cup/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/list",
            "icon": "table",
            "name": "list",
            "routes": [
              {
                "path": "/list/search",
                "name": "search-list",
                "component": __IS_BROWSER
    ? _dvaDynamic({

      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../list/search'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../list/search').default,
                "routes": [
                  {
                    "path": "/list/search",
                    "redirect": "/list/search/articles",
                    "exact": true
                  },
                  {
                    "name": "articles",
                    "path": "/list/search/articles",
                    "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__list__search__articles__model.ts' */'D:/Project/Sunflower-Cup/src/pages/list/search/articles/model.ts').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../list/search/articles'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../list/search/articles').default,
                    "exact": true
                  },
                  {
                    "name": "projects",
                    "path": "/list/search/projects",
                    "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__list__search__projects__model.ts' */'D:/Project/Sunflower-Cup/src/pages/list/search/projects/model.ts').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../list/search/projects'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../list/search/projects').default,
                    "exact": true
                  },
                  {
                    "name": "applications",
                    "path": "/list/search/applications",
                    "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__list__search__applications__model.ts' */'D:/Project/Sunflower-Cup/src/pages/list/search/applications/model.ts').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../list/search/applications'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../list/search/applications').default,
                    "exact": true
                  },
                  {
                    "component": () => React.createElement(require('D:/Project/Sunflower-Cup/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
                  }
                ]
              },
              {
                "name": "table-list",
                "path": "/list/table-list",
                "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__list__table-list__model.ts' */'D:/Project/Sunflower-Cup/src/pages/list/table-list/model.ts').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../list/table-list'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../list/table-list').default,
                "exact": true
              },
              {
                "name": "basic-list",
                "path": "/list/basic-list",
                "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__list__basic-list__model.ts' */'D:/Project/Sunflower-Cup/src/pages/list/basic-list/model.ts').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../list/basic-list'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../list/basic-list').default,
                "exact": true
              },
              {
                "name": "card-list",
                "path": "/list/card-list",
                "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__list__card-list__model.ts' */'D:/Project/Sunflower-Cup/src/pages/list/card-list/model.ts').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../list/card-list'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../list/card-list').default,
                "exact": true
              },
              {
                "component": () => React.createElement(require('D:/Project/Sunflower-Cup/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/profile",
            "name": "profile",
            "icon": "profile",
            "routes": [
              {
                "name": "basic",
                "path": "/profile/basic",
                "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__profile__basic__model.ts' */'D:/Project/Sunflower-Cup/src/pages/profile/basic/model.ts').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../profile/basic'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../profile/basic').default,
                "exact": true
              },
              {
                "name": "advanced",
                "path": "/profile/advanced",
                "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__profile__advanced__model.ts' */'D:/Project/Sunflower-Cup/src/pages/profile/advanced/model.ts').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../profile/advanced'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../profile/advanced').default,
                "exact": true
              },
              {
                "component": () => React.createElement(require('D:/Project/Sunflower-Cup/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "name": "result",
            "icon": "check-circle-o",
            "path": "/result",
            "routes": [
              {
                "name": "success",
                "path": "/result/success",
                "component": __IS_BROWSER
    ? _dvaDynamic({

      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../result/success'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../result/success').default,
                "exact": true
              },
              {
                "name": "fail",
                "path": "/result/fail",
                "component": __IS_BROWSER
    ? _dvaDynamic({

      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../result/fail'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../result/fail').default,
                "exact": true
              },
              {
                "component": () => React.createElement(require('D:/Project/Sunflower-Cup/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "name": "exception",
            "icon": "warning",
            "path": "/exception",
            "routes": [
              {
                "name": "404",
                "path": "/exception/404",
                "component": __IS_BROWSER
    ? _dvaDynamic({

      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../exception/404'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../exception/404').default,
                "exact": true
              },
              {
                "name": "500",
                "path": "/exception/500",
                "component": __IS_BROWSER
    ? _dvaDynamic({

      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../exception/500'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../exception/500').default,
                "exact": true
              },
              {
                "component": () => React.createElement(require('D:/Project/Sunflower-Cup/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "name": "account",
            "icon": "user",
            "path": "/account",
            "routes": [
              {
                "name": "center",
                "path": "/account/center",
                "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__account__center__model.ts' */'D:/Project/Sunflower-Cup/src/pages/account/center/model.ts').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../account/center'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../account/center').default,
                "exact": true
              },
              {
                "name": "settings",
                "path": "/account/settings",
                "component": __IS_BROWSER
    ? _dvaDynamic({
      app: require('@tmp/dva').getApp(),
models: () => [
  import(/* webpackChunkName: 'p__account__settings__model.ts' */'D:/Project/Sunflower-Cup/src/pages/account/settings/model.ts').then(m => { return { namespace: 'model',...m.default}})
],
      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../account/settings'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../account/settings').default,
                "exact": true
              },
              {
                "component": () => React.createElement(require('D:/Project/Sunflower-Cup/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "name": "editor",
            "icon": "highlight",
            "path": "/editor",
            "routes": [
              {
                "name": "flow",
                "path": "/editor/flow",
                "component": __IS_BROWSER
    ? _dvaDynamic({

      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../editor/flow'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../editor/flow').default,
                "exact": true
              },
              {
                "name": "mind",
                "path": "/editor/mind",
                "component": __IS_BROWSER
    ? _dvaDynamic({

      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../editor/mind'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../editor/mind').default,
                "exact": true
              },
              {
                "name": "koni",
                "path": "/editor/koni",
                "component": __IS_BROWSER
    ? _dvaDynamic({

      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../editor/koni'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../editor/koni').default,
                "exact": true
              },
              {
                "component": () => React.createElement(require('D:/Project/Sunflower-Cup/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/",
            "redirect": "/dashboard/analysis",
            "authority": [
              "admin",
              "user"
            ],
            "exact": true
          },
          {
            "component": __IS_BROWSER
    ? _dvaDynamic({

      component: () => import(/* webpackChunkName: "p__404" */'../404'),
      LoadingComponent: require('D:/Project/Sunflower-Cup/src/components/PageLoading/index').default,
    })
    : require('../404').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/Project/Sunflower-Cup/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": () => React.createElement(require('D:/Project/Sunflower-Cup/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('D:/Project/Sunflower-Cup/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
history.listen(routeChangeHandler);
routeChangeHandler(history.location);

export { routes };

export default function RouterWrapper(props = {}) {
  return (
<RendererWrapper0>
          <Router history={history}>
      { renderRoutes(routes, props) }
    </Router>
        </RendererWrapper0>
  );
}
