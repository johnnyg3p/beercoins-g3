import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import Operations from "./screens/Operations";

const Routes = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={SignIn} />
    <Route exact path="/signup" component={SignIn} />
    <Route exact path="/operations" component={Operations} />
  </BrowserRouter>
);

export default Routes;
