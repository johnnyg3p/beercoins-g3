import React, { useState } from "react";
import { Grid, Paper, ThemeProvider, Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import themes from "../../utils/themes";
import { useLocation } from "react-router";
import BarcodeReader from "../../components/BarcodeReader";

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
const PaymentsConfirm = () => {
  const classes = useStyles();
  const { state } = useLocation<any>();

  const [loading, setLoading] = useState(false);

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
                <div>
                  <Button type="submit" variant="contained" color="primary" size="large">
                    Pagar
                  </Button>
                  {loading && <CircularProgress size={24} />}
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
