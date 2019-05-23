export default function (contexts) {
  let api = {};
  contexts.keys().forEach(item => {
    try {
      let arr = item.split('/')
      if (arr.length !== 4) return false;
      let obj = contexts(item).default
      Object.keys(obj).forEach(key => {
        if (api[key]) {
          console.group(api[key].path);
          console.warn(api[key].filePath);
          console.warn(item);
          console.groupEnd(api[key].path);
        } else {
          api[key] = obj[key];
          api[key].filePath = item;
        }
      })
    } catch (err) { }
  })
  return api;
}