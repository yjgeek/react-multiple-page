export default function (contexts) {
  let data = []
  contexts.keys().forEach(item => {
    try {
      let arr = item.split('/')
      if (arr.length !== 4) return false;
      let obj = contexts(item).default
      const prefix = arr[arr.length - 2];
      obj = obj.map(item => {
        let str = item.name.substring(0, 1).toUpperCase() + item.name.substring(1);
        item.name = prefix + str; 
        return item;
      })
      data = data.concat(obj);
    } catch (err) { }
  })
  return data;
}