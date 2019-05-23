import React from 'react';
import { Link } from 'react-router-dom';
import Exception from 'components/exception';
import icon from './404Icon.svg'
export default () => (
  <Exception type="404" desc="抱歉，你访问的页面不存在" img={icon} style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
);
