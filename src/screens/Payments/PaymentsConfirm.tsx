import React, { useState } from "react";
import { Grid, Paper, ThemeProvider, Button, CircularProgress } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import themes from "../../utils/themes";
import { useLocation } from "react-router";
import BarcodeReader from "../../components/BarcodeReader";
import { PostPayment } from "../../services/User/User";
import { useToasts } from "react-toast-notifications";
import { paymentStyles } from "./PaymentConfirmStyles";

// Valid barcode
// 34191.79001 01043.510047 91020.150008 6 84190026000
const PaymentsConfirm = () => {
  const { addToast } = useToasts();
  const classes = paymentStyles();
  const { state } = useLocation<any>();

  const [loading, setLoading] = useState(false);

  const getPayment = async () => {
    setLoading(true);
    try {
      const resultPayment = await PostPayment(state);
      console.log("resultPayment", resultPayment);
      addToast("Solicitação de pagamento realizada.", {
        appearance: "success",
      });
      setLoading(false);
    } catch (error) {
      addToast("Erro ao realizar a solicitação de pagamento.", {
        appearance: "error",
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Paper className={classes.paper}>
          <h1>Confirmar pagamento</h1>
          <ThemeProvider theme={themes.signPagesInputErrorCustomStyle}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12}>
                <BarcodeReader barcoder={state} />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.wrapper}>
                  <Button
                    disabled={loading}
                    className={classes.submit}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={getPayment}
                  >
                    Pagar
                  </Button>
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
              </Grid>
            </Grid>
          </ThemeProvider>
        </Paper>
      </Container>
    </div>
  );
};

export default PaymentsConfirm;
