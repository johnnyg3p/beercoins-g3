import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { AuthProvider } from "./context/Auth";
import { ToastProvider } from "react-toast-notifications";
import Body from "./components/Body";

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
        <Body />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
