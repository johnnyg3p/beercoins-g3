import React from "react";
import UserInfo from "../../components/UserInfo";
import Statement from "../../components/Statement";
import { Grid } from "@material-ui/core";

const Home = () => {
  return (
    <>
      <Grid container direction="row" justify="center" spacing={0}>
        <Grid item xs={12} sm={4}>
          <UserInfo />
        </Grid>
        <Grid item xs={12} sm={8} style={{ backgroundColor: "#f0f6f8" }}>
          <Statement />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
