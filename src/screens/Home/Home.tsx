import React from "react";
import UserInfo from "../../components/UserInfo";
import Statement from "../../components/Statement";
import { Grid } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingLeft: 0,
    },
  })
);

const Home = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.content}>
      <Grid container direction="row" justify="center" spacing={0}>
        <Grid item xs={12} sm={4}>
          <UserInfo />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Statement />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
