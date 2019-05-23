import React from 'react';
import { Route, HashRouter } from "react-router-dom";
import Exception403 from './exception/children/403'
import storage from 'utils/storage'
export default function (props) {
  const { auth } = props
  return (
    (auth !== false && !storage.getItem('user')) ?
      <Exception403 />
      :
      <HashRouter>
        <Route {...props} />
      </HashRouter>
  )
}