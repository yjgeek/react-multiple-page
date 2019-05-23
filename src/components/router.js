import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";

export default function (props) {
  const { routers = [], layouts = [], menus } = props || {}
  return (
    <HashRouter>
      <Switch>
        {
          layouts.length
            ?
            layouts.map(item => {
              const Component = item.component;
              return <Route path={item.path} key={item.path} render={props => <Component menus={menus} routers={routers} {...props} />} />
            })
            :
            <Route path='*' render={() => <div>没有选择布局!!!</div>} />
        }
      </Switch>
    </HashRouter>
  )
}