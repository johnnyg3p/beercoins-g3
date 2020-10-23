import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../../context/Auth";

const PrivateRoute = ({ children, ...rest }: any) => {
  const {
    userInfo: { accessToken },
  } = useAuthContext();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return accessToken ? (
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
