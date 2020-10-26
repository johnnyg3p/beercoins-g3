import { isValidCNPJ, isValidEmail, isValidPhone } from "@brazilian-utils/brazilian-utils";
import { Button, CircularProgress, Grid, InputAdornment, Link, TextField, ThemeProvider } from "@material-ui/core";
import { formatCNPJ } from "../../../utils/formaters/formaters";
import React, { useCallback, useRef, useState } from "react";
import cleanStringValue from "../../../utils/formaters/cleanStringValue";
import themes from "../../../utils/themes";
import useStyles from "../signUpStyles";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import { SignUpService } from "../../../services/Auth.service";
import formatPhoneNumber from "../../../utils/formaters/phoneMask";
import { Business, Email, Lock, PermContactCalendar, Person, Phone } from "@material-ui/icons";
import { signUpCnpjErrorMessages, signUpPhoneErrorMessages } from "../../../interfaces/IErrorMessages";

const signUpService = new SignUpService();

const SignUpForm = () => {
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
  const [cnpjErrorMessage, setCnpjErrorMessage] = useState(signUpCnpjErrorMessages.EMPTY);
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState(signUpPhoneErrorMessages.EMPTY);
  const [isCnpjValid, setIsCnpjValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const { addToast } = useToasts();
  let history = useHistory();

  const validateInputFields = useCallback((inputArray: IInputValidationObject[]) => {
    inputArray.map((inputObjectWithNameAndValue) => {
      const objectName = Object.keys(inputObjectWithNameAndValue)[0];
      const objectValue = Object.values(inputObjectWithNameAndValue)[0];

      switch (objectName) {
        case "cnpj":
          if (!objectValue) {
            setIsCnpjValid(false);
            setCnpjErrorMessage(signUpCnpjErrorMessages.EMPTY);
          }
          break;
        case "email":
          if (!objectValue) setEmailInputError(true);
          break;
        case "nome":
          if (!objectValue) setNameInputError(true);
          break;
        case "phonenumber":
          if (!objectValue) {
            setIsPhoneValid(false);
            setPhoneErrorMessage(signUpPhoneErrorMessages.EMPTY);
          }
          break;
        case "password":
          if (!objectValue) setPasswordInputError(true);
          break;
        case "username":
          if (!objectValue) setUserInputError(true);
          break;
      }
    });
  }, []);

  const handleCheckIfCNPJisValid = useCallback((CNPJ: string) => {
    if (!CNPJ) {
      setIsCnpjValid(isValidCNPJ(CNPJ));
      setCnpjErrorMessage(signUpCnpjErrorMessages.EMPTY);

      return false;
    }

    setIsCnpjValid(isValidCNPJ(CNPJ));

    !isValidCNPJ(CNPJ) && setCnpjErrorMessage(signUpCnpjErrorMessages.INVALID);

    return isValidCNPJ(CNPJ);
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
    if (!phoneNumber) {
      setIsPhoneValid(isValidPhone(phoneNumber));
      setPhoneErrorMessage(signUpPhoneErrorMessages.EMPTY);

      return false;
    }

    setIsPhoneValid(isValidPhone(phoneNumber));

    !isValidPhone(phoneNumber) && setPhoneErrorMessage(signUpPhoneErrorMessages.INVALID);

    return isValidPhone(phoneNumber);
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

  const handleCheckIsEmailIsValid = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const emailInputValue = e.target.value;

    if (emailInputValue) {
      setEmailInputError(!isValidEmail(emailInputValue));
    }
  }, []);

  const signUpHandler = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const cnpj = cnpjRef?.current?.value;
      const email = emailRef?.current?.value;
      const nome = nameRef?.current?.value;
      const phonenumber = phoneRef?.current?.value;
      const password = passwordRef?.current?.value;
      const username = usernameRef?.current?.value;

      validateInputFields([{ cnpj }, { email }, { nome }, { phonenumber }, { password }, { username }]);

      if (
        cnpj &&
        email &&
        phonenumber &&
        nome &&
        password &&
        username &&
        handleCheckIfCNPJisValid(cnpj) &&
        handleCheckIfPhoneNumberIsValid(phonenumber)
      ) {
        setLoading(true);
        const parsedCNPJ = cleanStringValue(cnpj);
        const parsedPhoneNumber = cleanStringValue(phonenumber);

        await signUpService
          .execute({
            cnpj: parsedCNPJ,
            email,
            nome,
            phonenumber: parsedPhoneNumber,
            password,
            username,
          })
          .then((response) => {
            addToast("Cadastro efetuado com sucesso! Você pode fazer o login agora.", { appearance: "success" });

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
    [addToast, handleCheckIfCNPJisValid, handleCheckIfPhoneNumberIsValid, history, validateInputFields]
  );

  return (
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
          onBlur={(e) => handleCheckIfCNPJisValid(e.target.value)}
          inputRef={cnpjRef}
          error={!isCnpjValid}
          onFocus={() => setIsCnpjValid(true)}
          helperText={!isCnpjValid && cnpjErrorMessage}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Business />
              </InputAdornment>
            ),
          }}
          className={classes.firstInput}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nome"
          name="name"
          type="text"
          autoComplete="name"
          error={nameInputError}
          onFocus={() => setNameInputError(false)}
          helperText={nameInputError && "Digite seu nome."}
          inputRef={nameRef}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
          className={classes.secondInput}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="E-mail"
          name="email"
          type="email"
          autoComplete="email"
          onFocus={() => setEmailInputError(false)}
          onBlur={(e) => handleCheckIsEmailIsValid(e)}
          helperText={emailInputError && "Digite seu e-mail."}
          error={emailInputError}
          inputRef={emailRef}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
          className={classes.thirdInput}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phone"
          label="Telefone"
          name="phone"
          autoComplete="phone"
          value={phoneValue}
          onChange={(e) => handleFormatAndValidatePhone(e)}
          inputRef={phoneRef}
          error={!isPhoneValid}
          onFocus={() => setIsPhoneValid(true)}
          helperText={!isPhoneValid && phoneErrorMessage}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          }}
          className={classes.fourthInput}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          autoComplete="password"
          error={passwordInputError}
          onFocus={() => setPasswordInputError(false)}
          helperText={passwordInputError && "Digite uma senha"}
          inputRef={passwordRef}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
          className={classes.fifthInput}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="username"
          label="Nome de usuário"
          type="text"
          id="username"
          autoComplete="username"
          error={userInputError}
          onFocus={() => setUserInputError(false)}
          helperText={userInputError && "Digite um nome de usuário."}
          inputRef={usernameRef}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PermContactCalendar />
              </InputAdornment>
            ),
          }}
          className={classes.sixthInput}
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
          Cadastrar
        </Button>

        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
      <Grid container className={classes.signInLink}>
        <Grid item>
          <Link href="/login" variant="body2">
            {"Já é cadastrado? Entrar."}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUpForm;
