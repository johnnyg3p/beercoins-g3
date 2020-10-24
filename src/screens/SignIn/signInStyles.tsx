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
    animation: `$fadeIn 1300ms ${theme.transitions.easing.easeInOut} forwards`,
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
    animation: `$fadeIn 1000ms ${theme.transitions.easing.easeInOut} forwards 600ms`,
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
  textField: {
    width: "25ch",
  },
  firstInput: {
    opacity: 0,
    animation: `$fadeIn 1000ms ${theme.transitions.easing.easeInOut} forwards 200ms`,
  },
  secondInput: {
    opacity: 0,
    animation: `$fadeIn 1000ms ${theme.transitions.easing.easeInOut} forwards 300ms`,
  },
  signUpLink: {
    opacity: 0,
    animation: `$fadeIn 1000ms ${theme.transitions.easing.easeInOut} forwards 400ms`,
  },
  content: {
    display: "flex",
    height: "100%",
    alignItems: "center",
  },
}));

export default useStyles;
