import React, { useCallback, useRef, useState } from "react";
import clsx from "clsx";
import useStyles from "../signInStyles";
import { SignInService } from "../../../services/Auth.service";
import { useAuthContext } from "../../../context/Auth";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import cookieHandler from "../../../utils/cookieHandler";
import themes from "../../../utils/themes";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const signInService = new SignInService();

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

const SignInForm = () => {
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
    <form className={classes.form} onSubmit={signInHandler} noValidate>
      <ThemeProvider theme={themes.signPagesInputErrorCustomStyle}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Usuário"
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
          <InputLabel
            htmlFor="outlined-adornment-password"
            className={classes.secondInput}
          >
            Senha
          </InputLabel>

          <OutlinedInput
            className={classes.secondInput}
            id="password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            inputRef={passwordRef}
            error={passwordInputError}
            onChange={handleChange("password")}
            onFocus={() => setPasswordInputError(false)}
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
          Entrar
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>

      <Grid container className={classes.signUpLink}>
        <Grid item>
          <Link href="/signup" variant="body2">
            {"Ainda não tem conta? Cadastre-se!"}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignInForm;
