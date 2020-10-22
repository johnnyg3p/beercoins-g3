import React from "react";
import SideBar from "./sideBar";
import Routes from "./routes";
import { makeStyles, createStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { AuthProvider } from "./context/Auth";

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

  return (
    <AuthProvider>
      <div className="App">
        <header className="App-header">
          <SideBar moderator={'MODERATOR'} />
        </header>
        <main className={classes.content}>
          <Routes />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
