import loadable from 'components/loadable';
const Home = loadable(() => import('./index'))
export default [
  {
    path: '',
    component: Home,
    auth: false
  }
]
