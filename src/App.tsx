import React from "react";
import SideBar from "./components/SideBar";
import Routes from "./routes";
import { makeStyles, createStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { AuthProvider } from "./context/Auth";
import { ToastProvider } from 'react-toast-notifications'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      paddingTop: theme.spacing(5),
      paddingLeft: theme.spacing(9),
    },
  })
);
function App() {
  const classes = useStyles();

  return (
    <AuthProvider>
      <ToastProvider autoDismiss={true} placement="bottom-right">
        <div className="App">
          <header className="App-header">
            <SideBar moderator={'USER'} />
          </header>
          <main className={classes.content}>
            <Routes />
          </main>
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
