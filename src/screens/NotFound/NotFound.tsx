import React from "react";
import { Paper, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Page not Found</Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default NotFound;
