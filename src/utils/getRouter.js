// 遍历路由模块
function deepRouter(prefix, data, routes = [], moduleName, parent={}) {
  if (data) {
    data.forEach(item => {
      let obj = {
        ...item
      }
      // 如果是/开头就返回一级目录
      if (!/^\//.test(obj.path)) {
        obj.path = `${prefix}${obj.path ? '/' + obj.path : ''}`;
      }
      if (!parent.bread) {
        parent.bread = [];
      }
      if (obj.name && !(obj.name instanceof Array)) {
        obj.bread = [obj.name]
      } else {
        obj.bread = [];
      }
      obj.bread = [...parent.bread, ...obj.bread]
      obj.moduleName = moduleName;
      routes.push(obj);
      if (item.children) {
        deepRouter(obj.path, item.children, routes, moduleName, obj)
      }
    })
  }
  return routes;
}

export default function (contexts) {
  let routersData = []
  contexts.keys().forEach(item => {
    try {
      let arr = item.split('/')
      if (arr.length !== 4) return false;
      let prefix = arr[arr.length - 2];
      let obj = contexts(item).default
      routersData = [...routersData, ...deepRouter('/' + prefix, obj, [], prefix)]
    } catch (err) { }
  })
  return routersData;
}