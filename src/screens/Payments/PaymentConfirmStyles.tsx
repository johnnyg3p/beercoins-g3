import { makeStyles, Theme } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

export const paymentStyles = makeStyles((theme: Theme) => ({
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
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
  wrapper: {
    position: "relative",
    display: "inline-flex",
  },
  buttonProgress: {
    color: blue[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  submit: {
    opacity: 0,
    animation: `$fadeIn 600ms ${theme.transitions.easing.easeInOut} forwards 550ms`,
  },
}));
