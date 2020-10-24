import React, { useRef, useCallback, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { useToasts } from "react-toast-notifications";
import { SignUpService } from "../../services/Auth.service";
import { blue } from "@material-ui/core/colors";
import formatCNPJ from "../../utils/formaters/cnpjMask";
import {
  isValidCNPJ,
  isValidPhone,
  isValidEmail,
} from "@brazilian-utils/brazilian-utils";
import CircularProgress from "@material-ui/core/CircularProgress";
import themes from "../../utils/themes";
import formatPhoneNumber from "../../utils/formaters/phoneMask";
import cleanStringValue from "../../utils/formaters/cleanStringValue";

const signUpService = new SignUpService();

const useStyles = makeStyles((theme) => ({
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
  containerWrapper: {
    animation: `$fadeIn 1500ms ${theme.transitions.easing.easeInOut} forwards`,
    opacity: 0,
    transform: "translateX(-100px)"
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
  formControl: {
    margin: theme.spacing(3),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const cnpjRef = useRef<IInputRef>(null);
  const nameRef = useRef<IInputRef>(null);
  const emailRef = useRef<IInputRef>(null);
  const phoneRef = useRef<IInputRef>(null);
  const passwordRef = useRef<IInputRef>(null);
  const usernameRef = useRef<IInputRef>(null);
  const [nameInputError, setNameInputError] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);
  const [passwordInputError, setPasswordInputError] = useState(false);
  const [userInputError, setUserInputError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cnpjValue, setCnpjValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [isCnpjValid, setIsCnpjValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const { addToast } = useToasts();
  let history = useHistory();

  const validateInputFields = useCallback(
    (inputArray: IInputValidationObject[]) => {
      inputArray.map((inputObjectWithNameAndValue) => {
        const objectName = Object.keys(inputObjectWithNameAndValue)[0];
        const objectValue = Object.values(inputObjectWithNameAndValue)[0];

        switch (objectName) {
          case "cnpj":
            if (!objectValue) setIsCnpjValid(false);
            break;
          case "email":
            if (!objectValue) setEmailInputError(true);
            break;
          case "nome":
            if (!objectValue) setNameInputError(true);
            break;
          case "phone":
            if (!objectValue) setIsPhoneValid(false);
            break;
          case "password":
            if (!objectValue) setPasswordInputError(true);
            break;
          case "username":
            if (!objectValue) setUserInputError(true);
            break;
        }
      });
    },
    []
  );

  const signUpHandler = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const cnpj = cnpjRef?.current?.value;
      const email = emailRef?.current?.value;
      const nome = nameRef?.current?.value;
      const phone = phoneRef?.current?.value;
      const password = passwordRef?.current?.value;
      const username = usernameRef?.current?.value;

      validateInputFields([
        { cnpj },
        { email },
        { nome },
        { phone },
        { password },
        { username },
      ]);

      if (cnpj && email && phone && nome && password && username) {
        setLoading(true);
        const parsedCNPJ = cleanStringValue(cnpj);
        const parsedPhoneNumber = cleanStringValue(phone);

        await signUpService
          .execute({ cnpj: parsedCNPJ, email, nome, phone: parsedPhoneNumber, password, username })
          .then((response) => {
            addToast(
              "Cadastro efetuado com sucesso! Você pode fazer o login agora.",
              { appearance: "success" }
            );

            setTimeout(() => {
              history.push("/login");
            }, 1000);
          })
          .catch((error) => {
            setLoading(false);

            const { message } = error.response.data;

            if (message) return addToast(message, { appearance: "error" });

            addToast("Ocorreu um erro. Por favor, tente novamente.", {
              appearance: "error",
            });
          });
      }
    },
    [addToast, history, validateInputFields]
  );

  const handleCheckIfCNPJisValid = useCallback((CNPJ: string) => {
    setIsCnpjValid(isValidCNPJ(CNPJ));
  }, []);

  const handleFormatAndValidateCNPJ = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setCnpjValue(formatCNPJ(e.target.value));

      if (formatCNPJ(e.target.value).length === 18) {
        handleCheckIfCNPJisValid(formatCNPJ(e.target.value));
      }
    },
    [handleCheckIfCNPJisValid]
  );

  const handleCheckIfPhoneNumberIsValid = useCallback((phoneNumber: string) => {
    setIsPhoneValid(isValidPhone(phoneNumber));
  }, []);

  const handleFormatAndValidatePhone = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setPhoneValue(formatPhoneNumber(e.target.value));

      if (formatPhoneNumber(e.target.value).length === 15) {
        handleCheckIfPhoneNumberIsValid(formatPhoneNumber(e.target.value));
      }
    },
    [handleCheckIfPhoneNumberIsValid]
  );

  const handleCheckIsEmailIsValid = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const emailInputValue = e.target.value;

      if (emailInputValue) {
        setEmailInputError(!isValidEmail(emailInputValue));
      }
    },
    []
  );

  return (
    <Container component="main" maxWidth="xs" className={classes.containerWrapper}>
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <form className={classes.form} onSubmit={signUpHandler} noValidate>
          <ThemeProvider theme={themes.signPagesInputErrorCustomStyle}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cnpj"
              label="CNPJ"
              name="cnpj"
              autoComplete="cnpj"
              autoFocus
              value={cnpjValue}
              onChange={(e) => handleFormatAndValidateCNPJ(e)}
              inputRef={cnpjRef}
              error={!isCnpjValid}
              onFocus={() => setIsCnpjValid(true)}
              helperText={!isCnpjValid && "Please, type a valid CNPJ number."}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              type="text"
              autoComplete="name"
              error={nameInputError}
              onFocus={() => setNameInputError(false)}
              helperText={nameInputError && "Type a name"}
              inputRef={nameRef}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              onFocus={() => setEmailInputError(false)}
              onBlur={(e) => handleCheckIsEmailIsValid(e)}
              helperText={emailInputError && "Type an email"}
              error={emailInputError}
              inputRef={emailRef}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              autoComplete="phone"
              value={phoneValue}
              onChange={(e) => handleFormatAndValidatePhone(e)}
              inputRef={phoneRef}
              error={!isPhoneValid}
              onFocus={() => setIsPhoneValid(true)}
              helperText={!isPhoneValid && "Please, type a valid phone number."}
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
              autoComplete="password"
              error={passwordInputError}
              onFocus={() => setPasswordInputError(false)}
              helperText={passwordInputError && "Type a password"}
              inputRef={passwordRef}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              type="username"
              id="username"
              autoComplete="username"
              error={userInputError}
              onFocus={() => setUserInputError(false)}
              helperText={userInputError && "Type an username"}
              inputRef={usernameRef}
            />
          </ThemeProvider>

          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              size="large"
              className={classes.submit}
            >
              Register
            </Button>

            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default React.memo(SignUp);
