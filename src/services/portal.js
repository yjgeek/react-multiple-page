import getApi from 'utils/getApi';
import MakeApi from 'utils/makeApi';
import config from 'configs/axios';
const contexts = require.context('views', true, /portal\/.*\/api\.js$/)
let apiData = getApi(contexts);
export default new MakeApi({ config, apiData })['api'];