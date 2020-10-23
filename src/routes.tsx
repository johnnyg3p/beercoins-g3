import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import Operations from "./screens/Operations";

const Routes = () => (
  <>
    <PrivateRoute exact path="/">
      <Home />
    </PrivateRoute>
    <Route path="/login" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <PrivateRoute path="/operations">
      <Operations />
    </PrivateRoute>
  </>
);

export default Routes;
