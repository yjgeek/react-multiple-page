import loadable from 'components/loadable';
const Home = loadable(() => import('./index'))
export default [
  {
    path: '/',
    component: Home,
    name: '首页',
  }
]
