import React from "react";
import UserInfo from "../../components/UserInfo";
import Statement from "../../components/Statement";
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    backgroundColor: "#f0f6f8",
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container direction="row" justify="center" spacing={2}>

          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <UserInfo />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8} >
            <Paper className={classes.paper}>
              <Statement />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
