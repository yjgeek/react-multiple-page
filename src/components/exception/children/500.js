import React from 'react';
import { Link } from 'react-router-dom';
import Exception from 'components/exception';
import icon from './500Icon.svg'
export default () => (
  <Exception type="500" desc="抱歉，服务器出错了" img={icon} style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
);
