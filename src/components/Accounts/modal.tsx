import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import AccountsService from "../../services/Accounts/accounts.service";
import Link from "@material-ui/core/Link";
import { IDeposit } from "../../interfaces/IDeposit";
import Typography from "@material-ui/core/Typography";
import { Grid, InputAdornment } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import TextField from "@material-ui/core/TextField";
import { formatCurrency, formatCurrencyIntoInteger, formatCurrencyWithouCurrencyDisplay } from "../../utils/formaters/formaters";

interface IProps {
  account: IAccount;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const accountsService = new AccountsService();

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    padding: 20,
    minHeight: "30%",
    width: "35%",
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginTop: theme.spacing(4),
  },
  padd: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export default function SimpleModal(props: IProps) {
  const classes = useStyles();
  const { addToast } = useToasts();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({ amount: "0" });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const makeDeposit = () => {
    const account: IDeposit = {
      hash: props.account.hash,
      valorOperacao: Number(values.amount),
    };
    accountsService
      .deposit(account)
      .then(() => {
        addToast("Depósito efetuado com sucesso!", {
          appearance: "success",
        });
      })
      .catch(() => {
        addToast("An error occur to make Deposit. Try again.", {
          appearance: "error",
        });
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const currencyStringValue = e.target.value;
    const parsedNumber = formatCurrencyIntoInteger(currencyStringValue);
    
    setValues({
      ...values,
      amount: formatCurrencyWithouCurrencyDisplay(parsedNumber)
    });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <Typography component="h1" variant="h4" align="center">
          Depósito
        </Typography>
        <h3>
          {`Digite o valor para realizar o depósito na conta de ${props.account.nome}`}
        </h3>
        <Grid item xs={12} className={classes.padd}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Valor do depósito"
            name="amount"
            onChange={handleChange}
            value={values.amount}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={makeDeposit}
          className={classes.button}
        >
          Realizar Depósito
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Link color="primary" href="#" onClick={handleOpen}>
        Depósito
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
