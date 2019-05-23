export default {
  '/page1/article/index': function ({ responent }, optioin) {
    return responent(optioin)
  },
  '/admin/article/index': {
    type: 'post',
    callback({ responent }, optioin) {
      return responent(optioin)
    }
  }
}