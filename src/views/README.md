# views

第一级目录是应用，第二级目录是该应用下的模块，每个根模块下     ```router.js``` ```api.js``` ```mock.js```  

```router.js```
```js
import loadable from 'components/Loadable';
const Home = loadable(() => import('./index'))
export default [
  {
    path: '',
    component: Home,
    auth: false // 路由不鉴权
  }
]

```

```mock.js```
```js
export default {
  '/page/article/index': function ({ responent }, optioin) {
    return responent(optioin)
  },
  '/admin/article/index': {
    type: 'post',
    callback({ responent }, optioin) {
      return responent(optioin)
    }
  }
}
```

```api.js```
```js
export default [
  {
    name: 'index',
    method: 'GET',
    desc: '文章列表',
    path: '/page/article/index',
    params: {
      title: '',
      status: '',
      create_time: [],
      page: 1,
      limit: 15
    }
  }
]
```