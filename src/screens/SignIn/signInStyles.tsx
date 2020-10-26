import { makeStyles, Theme } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  titleContainer: {
    display: "flex",
  },
  iconContainer: {
    maxWidth: "100px",
  },
  headerText: {
    opacity: 0,
    animation: `$fadeIn 400ms ${theme.transitions.easing.easeInOut} forwards`,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  wrapper: {
    position: "relative",
  },
  buttonProgress: {
    color: blue[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  avatar: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    opacity: 0,
    animation: `$fadeIn 600ms ${theme.transitions.easing.easeInOut} forwards 550ms`,
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  firstInput: {
    opacity: 0,
    animation: `$fadeIn 400ms ${theme.transitions.easing.easeInOut} forwards 400ms`
  },
  secondInput: {
    opacity: 0,
    animation: `$fadeIn 400ms ${theme.transitions.easing.easeInOut} forwards 450ms`,
  },
  signUpLink: {
    opacity: 0,
    animation: `$fadeIn 400ms ${theme.transitions.easing.easeInOut} forwards 500ms`,
  },
  content: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      height: "100%",
    },
  },
}));

export default useStyles;
