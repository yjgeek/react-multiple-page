import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";

export default function (props = {}) {
  const { routers = []  } = props
  return (
    <HashRouter>
      <Switch>
        {
          routers.map(item => {
            const Component = item.component;
            return <Route path={item.path} key={item.path} render={props => <Component {...props} />} />
          })
        }
      </Switch>
    </HashRouter>
  )
}