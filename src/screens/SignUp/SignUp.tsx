import React, { useRef, useCallback, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { useAuthContext } from "../../context/Auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

export default function SignUp() {
  const classes = useStyles();
  const cnpjRef = useRef<IInputRef>(null);
  const nameRef = useRef<IInputRef>(null);
  const emailRef = useRef<IInputRef>(null);
  const passwordRef = useRef<IInputRef>(null);
  const usernameRef = useRef<IInputRef>(null);
  const roleRef = useRef<ICheckBoxRef>(null);
  const { signUp } = useAuthContext();

  const [state, setState] = React.useState({
    ADMINISTRATOR: false,
    USER: false,
  });

  const signUpHandler = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const cnpj = cnpjRef?.current?.value;
    const email = emailRef?.current?.value;
    const nome = nameRef?.current?.value;
    const password = passwordRef?.current?.value;
    const role = ['USER'];
    const username = usernameRef?.current?.value;

    if (cnpj && email && nome && password && role && username) {
      try {
        const userData = await signUp({
          cnpj,
          email,
          nome,
          password,
          role,
          username,
        });
        console.log("userData :>> ", userData);
      } catch (e) {
        console.log("e :>> ", e);
      }
    }
  }, [signUp]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  }, [state]);

  const { ADMINISTRATOR, USER } = state;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <form className={classes.form} onSubmit={signUpHandler} noValidate>
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
            inputRef={cnpjRef}
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
            inputRef={emailRef}
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
            autoComplete="current-password"
            inputRef={usernameRef}
          />

          {/* <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">User Role</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ADMINISTRATOR}
                    onChange={handleChange}
                    name="ADMINISTRATOR"
                  />
                }
                label="Admin"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={USER}
                    onChange={handleChange}
                    name="USER"
                  />
                }
                label="User"
              />
            </FormGroup>
          </FormControl> */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
