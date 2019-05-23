import React from 'react';
import { Link } from 'react-router-dom';
import Exception from 'components/exception';
import icon from './403Icon.svg'
export default () => (
  <Exception type="403" desc="抱歉，你无权访问此页面" img={icon} style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
);
