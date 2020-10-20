import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import SignIn from "./screens/SignIn/SignIn";
import Home from "./screens/Home";
import IBankPosting, { BankPostType } from "./services/Interfaces/IBankPosting";

const bankPostingsMock: IBankPosting[] = [
  {
    id: "564656",
    description: "salario",
    value: 100000,
    type: BankPostType.CREDIT,
    date: 1,
  },
  {
    id: "113654",
    description: "mercado livre",
    value: 5000,
    type: BankPostType.DEBIT,
    date: 6,
  },
  {
    id: "413654",
    description: "posto gasolina",
    value: 2399,
    type: BankPostType.DEBIT,
    date: 3,
  },
  {
    id: "213654",
    description: "posto gasolina",
    value: 4235,
    type: BankPostType.DEBIT,
    date: 2,
  },
];

{
  /* <Statement bankPostings={bankPostingsMock} /> */
}
const Routes = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={SignIn} />
  </BrowserRouter>
);

export default Routes;
