import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Factory = {
  makeLogin: React.FC
  makeSignup: React.FC
}

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/login'} component={factory.makeLogin} />
        <Route exact path={'/signup'} component={factory.makeSignup} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
