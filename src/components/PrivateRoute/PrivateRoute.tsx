import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../../context/Auth";

const PrivateRoute = ({ children, ...rest }: any) => {
  const { role: routeRole } = rest;
  const {
    userInfo: { accessToken, roles },
  } = useAuthContext();
  // const userRole = "ROLE_USER";
  /* ADMIN USER {
    user: admin,
    pass: admin
  } */

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (accessToken) {
          return !routeRole || routeRole === roles ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
};
export default PrivateRoute;
