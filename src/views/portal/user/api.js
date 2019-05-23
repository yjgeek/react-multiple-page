export default [
  {
    name: 'index',
    method: 'GET',
    desc: '文章列表',
    path: '/page1/article/index',
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
    method: 'POST',
    desc: '文章列表',
    path: '/admin/article/index',
    params: {
      title: '',
      status: '',
      create_time: [],
      page: 1,
      limit: 15
    }
  }
]