import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'components/router';
import BaseLayout from 'layouts/baseLayout'
import BlankLayout from 'layouts/blankLayout'
import routers from 'routers/portal'
import 'assets/less/public.less'
import 'services/portal'
import menus from 'configs/portaMenu'
if (process.env.NODE_ENV === 'development') {
  require('mocks/portal')
}
ReactDOM.render(
  <Router menus={menus} layouts={[{ path: '/login', component: BlankLayout }, { path: '/', component: BaseLayout }]} routers={routers} />,
  document.getElementById('root')
);
