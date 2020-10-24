import React from "react";
import { useAuthContext } from "../../context/Auth";
import SideBar from "../SideBar";
import Routes from "../../routes";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      paddingLeft: theme.spacing(9),
    },
  })
);
const Body = () => {
  const {
    userInfo: { accessToken, roles },
  } = useAuthContext();
  const classes = useStyles();
  const userRole = roles[0];

  return (
    <div className="App">
      {accessToken ? (
        <header className="App-header">
          <SideBar moderator={userRole} />
        </header>
      ) : null}
      <main className={classes.content}>
        <Routes />
      </main>
    </div>
  );
};

export default Body;
