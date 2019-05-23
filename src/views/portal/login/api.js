export default [
  {
    name: 'index',
    method: 'GET',
    desc: '文章列表',
    path: '/page/article/index',
    mockPath: '',
    mockCallback(optioin, { responent}) {
      return responent(optioin)
    },
    params: {
      title: '',
      status: '',
      create_time: [],
      page: 1,
      limit: 15
    }
  },
  {
    name: 'add',
    method: 'GET',
    desc: '文章列表',
    path: '/page/category/index',
    mockPath: '',
    mockCallback() {

    },
    params: {
      title: '',
      status: '',
      create_time: [],
      page: 1,
      limit: 15
    }
  }
]