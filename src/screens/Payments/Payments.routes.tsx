import React from "react";
import PrivateRoute from "../../components/PrivateRoute";
import Payments from "./Payments";
import PaymentsConfirm from "./PaymentsConfirm";

const PaymentsRoutes = () => (
  <>
    <PrivateRoute exact path="/payments" role="ROLE_USER">
      <Payments />
    </PrivateRoute>
    <PrivateRoute path="/payments/confirm" role="ROLE_USER">
      <PaymentsConfirm />
    </PrivateRoute>
  </>
);

export default PaymentsRoutes;
