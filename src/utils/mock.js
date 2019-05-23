import Mock from 'mockjs'
Mock.setup({ timeout: '1000-2000' });
Mock.Random.extend({
  mobile: function (date) {
    let val = '139'
    for (let i = 0; i < 8; i++) {
      val += String(parseInt(Math.random() * 10))
    }
    return Number(val)
  }
})

/**
 * 正常响应数据格式
 * @example
 *  responent(data, code, message, {})
 * @param {Any} Value 需要返回的数据
 * @param {Object} params 其他返回的参数 Result = 'ok', Message = null, Actions = null
 * @return {Object} 返回格式： {ResultMessage: { Result: 'ok', Message: null, Actions=null }, Value: []}
 */
export function responent (data, code=200, message='success', other={}) {
  return {
    code,
    data,
    message,
    ...other
  }
}


/**
 * 过滤查询条件
 * @example
 *  filterWhere({pageIndex: 1, pageSize: 15}, 'item')
 * @param {Object} params 条件 
 * @param {String} key 变量的名字 默认是item
 * @return {String} 如果为空就为 true
 */
export function filterWhere(params, variable = 'item') {
  let str = ''
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (!val && val !== 0 && (typeof val !== 'string' || typeof val !== 'number')) {
      delete params[key]
    } else {
      if (typeof val === 'number') {
        str += `${variable}["${key}"] == ${val} && `
      } else {
        str += `${variable}["${key}"].includes("${val}") && `
      }
    }
  })
  if (str) {
    return str.slice(0, -3)
  }
  return 'true'
}

/**
 * 分页查询
 * @example
 *  page({pageIndex: 1, pageSize: 15}, [])
 * @param {Object} params 查询的参数
 * @param {Array} sources 分页的数据
 * @return {Object} 返回格式: {
    "ResultMessage": { "Result": "ok", "Message": null, "Actions": null},
    "Value": { "Columns": [], "DataList": [], "Pager": { "CurrentPage": 1, "PageSize": 12, "TotalCount": 12, "TotalPage": 2}}
  }
 */
export function page(params, sources) {
  let page = Number(params.page) || Number(params.page) || 1
  let limit = Number(params.limit) || Number(params.limit) || 15
  let totalCount = 0
  let totalPage = 0
  let skip = (page - 1) * limit
  if (sources instanceof Array) {
    params = JSON.parse(JSON.stringify(params))
    delete params.page
    delete params.limit
    params = filterWhere(params)
    sources = JSON.parse(JSON.stringify(sources))
    try {
      sources = sources.filter(item => eval(params))
    } catch (error) {
      sources = []
      console.error('参数有问题:' + params)
    }
    totalCount = sources.length
    sources = sources.slice(skip, skip + limit)
    totalPage = Math.ceil(totalCount / limit)
  } else {
    sources = []
    console.error('分页数据源一定是Array')
  }
  return {
    code: 200,
    list: sources,
    page,
    limit,
    total_count: totalCount,
    total_page: totalPage
  }
}
/**
 * 查找单条数据
 * @example 
 *  find(1, [{id: 1, name: 'yjgeek'}, {id: 2, name: 'test'}])
 * @example 
 *  find({name: 'yjgeek'}, [{id: 1, name: 'yjgeek'}, {id: 2, name: 'test'}])
 * @param {Object | String | Number} params string默认查找id的值 返回第一条数据 
 * @param {Array} sources  
 * @return {Object} 返回数据: {}
 */
export function find(params, sources) {
  let data = {}
  if (sources instanceof Array) {
    if (typeof params === 'string') {
      const id = params
      params = `item["id"] == "${id}"`
    } else {
      params = filterWhere(JSON.parse(JSON.stringify(params)))
    }
    sources = JSON.parse(JSON.stringify(sources))
    sources = sources.filter(item => eval(params))
    if (sources[0]) {
      data = sources[0]
    }
  }
  return responent(data)
}


/**
 * 查询数据
 * @example 
 *  select({name: 'yjgeek'}, [{name: 'yjgeek'}, {name: 'test'}])
 * @param {Object | String} params string默认查找id的值 返回第一条数据 
 * @param {Array} sources  
 * @return {Array} 返回数据: []
 */
export function select(params, sources) {
  if (sources instanceof Array) {
    params = filterWhere(JSON.parse(JSON.stringify(params)))
    sources = JSON.parse(JSON.stringify(sources))
    sources = sources.filter(item => eval(params))
    return responent(data)
  } else {
    return responent([])
  }
}

/**
 * 验证字段是否为空
 * @example 
 *  verification(['name', 'sex'], {name: 'yjgeek', sex: '男'})
 * @param {Array} fields 需要验证的字段
 * @param {Object} data  验证的数据
 * @return {Boolean | String}  如果成功: true 否则: field
 */
export function verification(fields, data) {
  let val = true
  fields.forEach(key => {
    if (data[key] === '') {
      val = key
    }
  })
  return val
}

/**
 * 随机数组或者字符串里面的一个值
 * @example 
 *  randomOne('asdfghjklqwertyuiopzxcvbnm')
 * @example 
 *  randomOne([1,2,3,4,5,6])
 * @param {Array | String} val 需要验证的字段
 * @return {String | Number}  
 */
export function randomOne(val) {
  if (typeof val === 'string') {
    val = val.split('')
  } else if (Object.prototype.toString.call(val) !== '[object Array]') {
    val = []
  }
  const index = parseInt(Math.random() * val.length)
  return (val[index] || val[index] === false) ? val[index] : 1
}
/**
 * 解析option的参数
 * @param {
 *  type: 'get',
 *  url: '/admin/user/index?id=1',
 *  body: null | Array | Object | String | Number
 * } option
 * @return {
 *  url: '/admin/user/index',
 *  params: {id: 1},
 *  type: 'get',
 *  body: null
 * }
 */
export const parseOption = ({ type, url, body }) => {
  type = Mock.Random.lower(type)
  let obj = { type, params: {}, url }
  if (type === 'get') {
    let arr = url.split('?')
    obj['url'] = arr[0]
    if (arr[1]) {
      let params = arr[1].split('&')
      params.forEach(item => {
        item = item.split('=')
        obj['params'][item[0]] = item[1]
      })
    }
  } else if (type === 'post' && body) {
    try {
      body = JSON.parse(body)
    } catch (e) {

    }
    obj['params'] = body
  }
  return obj
}

/**
 * 注册拦截API
 * @example
 *  registerApi({
 *    '/page/article/index': function(){},
 *    '/page/article/add': {
 *      type: 'POST',
 *      callback () {}
 *    },
 *  })
 * @param Object data 需要注册的api
 * @return {Any}
 */
export function registerApi (data) {
  Object.keys(data).forEach(key => {
    const item = data[key];
    let type;
    let path = key;
    let callback = item; 
    if (item instanceof Function) {
      type = 'get';
    } else {
      type = item.type;
      callback = item.callback;
    }
    if (type === 'get') {
      path += '?.*'
    }
    
    // .call({ mock: Mock, responent, page, select, parseOption, randomOne, verification })
    Mock.mock(new RegExp(path), type, function (options) {
      return callback && callback({ mock: Mock, responent, page, select, parseOption, randomOne, verification }, options);
    })
  })
}