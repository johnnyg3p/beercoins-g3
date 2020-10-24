import React, { useRef, useCallback, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import signPagesInputErrorCustomStyle from "../../utils/themes";
import themes from "../../utils/themes";
import { blue } from "@material-ui/core/colors";
import { makeStyles, Theme, ThemeProvider } from "@material-ui/core/styles";
import { useToasts } from "react-toast-notifications";
import { useAuthContext } from "../../context/Auth";
import { useHistory } from "react-router-dom";
import { SignInService } from "../../services/Auth.service";
import cookieHandler from "../../utils/cookieHandler";
import beerIcon from '../../assets/images/felicidades.svg'

const signInService = new SignInService();

const useStyles = makeStyles((theme: Theme) => ({
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
      transform: "translateX(-100px)"
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0)"
    }
  },
  titleContainer: {
    display: 'flex',
    
  },
  iconContainer: {
    maxWidth: '100px'
  },
  headerText: {
    opacity: 0,
    transform: "translateX(-100px)",
    animation: `$fadeIn 1300ms ${theme.transitions.easing.easeInOut} forwards 500ms`,
  },
  icon: {
    opacity: 0,
    maxWidth: '100px',
    width: '100%',
    display: 'block',
    margin: '0 auto',
    animation: `$fadeIn 1300ms ${theme.transitions.easing.easeInOut} forwards`,
  },
  iconImg: {
    width: '100%'
  },
  paper: {
    marginTop: theme.spacing(8),
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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const usernameRef = useRef<IInputRef>(null);
  const passwordRef = useRef<IInputRef>(null);
  const [usernameInputError, setUsernameInputError] = useState(false);
  const [passwordInputError, setPasswordInputError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useAuthContext();
  const { addToast } = useToasts();

  let history = useHistory();

  const signInHandler = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const username = usernameRef?.current?.value;
      const password = passwordRef?.current?.value;

      if (!username) {
        setUsernameInputError(true);
      }

      if (!password) {
        setPasswordInputError(true);
      }

      if (username && password) {
        setLoading(true);

        await signInService
          .execute({ password, username })
          .then((response) => {
            const userInformation = response.data;

            setUserInfo(userInformation);

            cookieHandler.create("userInfo", JSON.stringify(userInformation), 30);

            addToast("Login efetuado com sucesso!", {
              appearance: "success",
            });

            history.push("/");
          })
          .catch((error) => {
            setLoading(false);

            addToast("Credenciais inválidas. Por favor, tente novamente.", {
              appearance: "error",
            });
          });
      }
    },
    [addToast, history, setUserInfo]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          <i className={classes.icon}>
            <img className={classes.iconImg}src={beerIcon} alt="Icon with 2 beer mugs"/>
          </i>
          <span className={classes.headerText}>
            Welcome to the BankBeer
          </span>
        </Typography>

        <form className={classes.form} onSubmit={signInHandler} noValidate>
          <ThemeProvider theme={themes.signPagesInputErrorCustomStyle}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              inputRef={usernameRef}
              error={usernameInputError}
              helperText={usernameInputError && "Type an username"}
              onFocus={() => setUsernameInputError(false)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordRef}
              error={passwordInputError}
              helperText={passwordInputError && "Type a password"}
              onFocus={() => setPasswordInputError(false)}
            />
          </ThemeProvider>

          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              size="large"
              disabled={loading}
            >
              Sign In
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>

          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default React.memo(SignIn);
