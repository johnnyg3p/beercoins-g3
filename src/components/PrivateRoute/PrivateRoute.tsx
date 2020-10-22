import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../../context/Auth";

const PrivateRoute = ({ children, ...rest }: any) => {
  const { userInfo } = useAuthContext();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return userInfo ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
export default PrivateRoute;
