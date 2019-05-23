import React from 'react'
import { HashRouter, Route, Switch} from "react-router-dom";
function BaseLayout (props = {}) {
  const { routers = [] } = props || [];
  return (
    <HashRouter>
      <Switch>
        {
          routers.map(item => {
            return <Route exact path={item.path} key={item.path} component={item.component} />
          })
        }
      </Switch>
    </HashRouter>
  )
}

export default BaseLayout;