import React, { useRef, useCallback, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Image from "../../images/logo.png";
import themes from "../../utils/themes";
import { blue } from "@material-ui/core/colors";
import { makeStyles, Theme, ThemeProvider } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useToasts } from "react-toast-notifications";
import { useAuthContext } from "../../context/Auth";
import { useHistory } from "react-router-dom";
import { SignInService } from "../../services/Auth.service";
import cookieHandler from "../../utils/cookieHandler";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";

const signInService = new SignInService();

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
interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

const SignIn = () => {
  const classes = useStyles();
  const usernameRef = useRef<IInputRef>(null);
  const passwordRef = useRef<IInputRef>(null);
  const [usernameInputError, setUsernameInputError] = useState(false);
  const [passwordInputError, setPasswordInputError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useAuthContext();
  const { addToast } = useToasts();
  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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

            cookieHandler.create(
              "userInfo",
              JSON.stringify(userInformation),
              30
            );

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
    <Container className={classes.content} component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <div className={classes.headerText}>
          <img src={Image} alt="logo" />
        </div>

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
              helperText={usernameInputError && ""}
              onFocus={() => setUsernameInputError(false)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              className={classes.firstInput}
            />

            <FormControl className={clsx(classes.form)} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password" className={classes.secondInput}>
                Password
              </InputLabel>
              <OutlinedInput
                className={classes.secondInput}
                id="username"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                inputRef={passwordRef}
                error={passwordInputError}
                onChange={handleChange("password")}
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
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
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>

          <Grid container className={classes.signUpLink}>
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
