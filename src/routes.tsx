import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import Operations from "./screens/Operations";
import { AuthProvider } from "./context/Auth";

const Routes = () => (
  <BrowserRouter>
    <AuthProvider>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/operations" component={Operations} />
    </AuthProvider>
  </BrowserRouter>
);

export default Routes;
