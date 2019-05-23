import getMock from 'utils/getMock';
import { registerApi } from 'utils/mock';
const contexts = require.context('views', true, /portal\/.*\/mock\.js$/)
let apiData = getMock(contexts);
registerApi(apiData);