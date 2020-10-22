import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import Operations from "./screens/Operations";
import { AuthProvider } from "./context/Auth";

const Routes = () => (
  <BrowserRouter>
    <AuthProvider>
      <PrivateRoute exact path="/">
        <Home />
      </PrivateRoute>
      {/* <Route exact path="/" component={Home} /> */}
      <Route path="/login" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      {/* <Route path="/operations" component={Operations} /> */}
      <PrivateRoute path="/operations">
        <Operations />
      </PrivateRoute>
    </AuthProvider>
  </BrowserRouter>
);

export default Routes;
