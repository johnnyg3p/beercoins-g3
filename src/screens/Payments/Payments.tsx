import React, { useRef, useState, useCallback } from "react";
import { Grid, Paper, ThemeProvider, TextField, InputAdornment, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Payment } from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import themes from "../../utils/themes";
import { formatBill, isValidBill, formatOnlyNumbers } from "../../utils/formaters/formaters";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
}));

// Valid barcode
// 34191.79001 01043.510047 91020.150008 6 84190026000
const Payments = () => {
  const classes = useStyles();
  const paymentRef = useRef<IInputRef>(null);
  const [paymentInputValid, setPaymentInputValid] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [paymentValue, setpaymentValue] = useState("");

  const handleCheckIfBillisValid = useCallback((billValue: string) => {
    setPaymentInputValid(isValidBill(billValue));
    setFormValid(isValidBill(billValue));
  }, []);

  const handleFormatAndValidate = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const formatedValue = formatBill(e.target.value);
      setpaymentValue(formatedValue);
      handleCheckIfBillisValid(e.target.value);
    },
    [handleCheckIfBillisValid]
  );

  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Paper className={classes.paper}>
          <h1>Pagamentos</h1>
          <ThemeProvider theme={themes.signPagesInputErrorCustomStyle}>
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="payment"
                  label="Código de barras"
                  name="payment"
                  autoComplete="payment"
                  inputRef={paymentRef}
                  value={paymentValue}
                  error={!paymentInputValid}
                  helperText={!paymentInputValid && "Digite o código de um boleto válido."}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                    handleFormatAndValidate(event)
                  }
                  onFocus={() => setPaymentInputValid(true)}
                  onBlur={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                    handleCheckIfBillisValid(event.target.value)
                  }
                  inputProps={{
                    maxLength: 51,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Payment />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!formValid}
                    component={Link}
                    to={{
                      pathname: "/payments/confirm",
                      state: formatOnlyNumbers(paymentValue),
                    }}
                  >
                    Próximo
                  </Button>
                </div>
              </Grid>
            </Grid>
          </ThemeProvider>
        </Paper>
      </Container>
    </div>
  );
};

export default Payments;
