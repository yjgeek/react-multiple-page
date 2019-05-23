export default [
  {
    path: '/',
    text: '首页',
    icon: 'home',
  },
  {
    text: '用户管理',
    icon: 'user',
    path: '/user',
    children: [
      {
        path: '/user/list',
        text: '用户列表',
        icon: 'unordered-list'
      }
    ]
  }
]