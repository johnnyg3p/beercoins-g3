import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.container} direction="row" justify="center" spacing={2}>
        Page Not Found
      </Grid>
    </>
  );
};

export default NotFound;
