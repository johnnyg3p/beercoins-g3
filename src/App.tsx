import React from "react";
import "./App.css";
import SideBar from "./sideBar";
import "./App.css";
import Routes from "./routes";
import { makeStyles, createStyles } from "@material-ui/core";
import { Theme, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      paddingTop: theme.spacing(8),
      paddingLeft: theme.spacing(9),
    },
  })
);
function App() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className="App">
      <header className="App-header">
        <SideBar moderator={'MODERATOR'} />
      </header>
      <main className={classes.content}>
        <Routes />
      </main>
    </div>
  );
}

export default App;
