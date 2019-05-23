import getRouter from 'utils/getRouter'
import Exception404 from 'components/exception/children/404.js'
import Exception403 from 'components/exception/children/403.js'
import Exception500 from 'components/exception/children/500.js'
const contexts = require.context('views', true, /portal\/.*\/router\.js$/)
const data = getRouter(contexts)
data.push({
  path: '/404',
  auth: false,
  component: Exception404
})
data.push({
  path: '/403',
  auth: false,
  component: Exception403
})
data.push({
  path: '/500',
  auth: false,
  component: Exception500
})
export default data