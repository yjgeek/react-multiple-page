import loadable from 'components/loadable';
import RouterView from 'components/routerView';
const User = loadable(() => import('./index'))
export default [
  {
    path: '',
    component: RouterView,
    name: '用户管理',
    children: [
      {
        path: 'list',
        component: User,
        name: '用户列表'
      }
    ]
  }
]
