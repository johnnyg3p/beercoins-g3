import React from "react";
import { useAuthContext } from "../../context/Auth";
import SideBar from "../SideBar";
import Routes from "../../routes";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      height: "100vh",
      backgroundColor: "#f2f8fa",
    },
    contentPadding: {
      paddingLeft: theme.spacing(7),
    },
  })
);
const Body = () => {
  const {
    userInfo: { accessToken, roles },
  } = useAuthContext();
  const classes = useStyles();

  return (
    <div className="App">
      {accessToken ? (
        <header className="App-header">
          <SideBar moderator={roles} />
        </header>
      ) : null}
      <main
        className={clsx(classes.content, {
          [classes.contentPadding]: accessToken,
        })}
      >
        <Routes />
      </main>
    </div>
  );
};

export default Body;
