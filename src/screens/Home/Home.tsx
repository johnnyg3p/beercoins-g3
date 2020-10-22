import React from "react";
import UserInfo from "../../components/UserInfo";
import Statement from "../../components/Statement/statement";
import { Grid } from "@material-ui/core";
import { OperationType } from "../../interfaces/OperationType";

const bankPostingsMock: IBankPosting[] = [
  {
    id: "564656",
    description: "salario",
    value: 100000,
    type: OperationType.CREDIT,
    date: 1,
  },
  {
    id: "113654",
    description: "mercado livre",
    value: 5000,
    type: OperationType.DEBIT,
    date: 6,
  },
  {
    id: "413654",
    description: "posto gasolina",
    value: 2399,
    type: OperationType.DEBIT,
    date: 3,
  },
  {
    id: "213654",
    description: "posto gasolina",
    value: 4235,
    type: OperationType.DEBIT,
    date: 2,
  },
];

const Home = () => {
  return (
    <>
      <Grid container direction="row" justify="center" spacing={0}>
        <Grid item xs={12} sm={4}>
          <UserInfo />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Statement bankPostings={bankPostingsMock} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
