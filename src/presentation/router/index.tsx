import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Login } from "@/presentation/pages";

import "@/presentation/theme/global.scss";
const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/login"} component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
