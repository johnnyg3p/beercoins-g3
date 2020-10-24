import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import Operations from "./screens/Operations";
import NotFound from "./screens/NotFound/NotFound";
import Payments from "./screens/Payments";

const Routes = () => (
  <>
    <Switch>
      <Route path="/login" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute exact path="/">
        <Home />
      </PrivateRoute>
      <PrivateRoute path="/operations" role="ROLE_MODERATOR">
        <Operations />
      </PrivateRoute>
      <PrivateRoute path="/payments" role="ROLE_USER">
        <Payments />
      </PrivateRoute>
      <Route path="*" component={() => <NotFound />} />
    </Switch>
  </>
);

export default Routes;
