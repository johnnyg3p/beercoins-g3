import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AccountsService from "../../services/Accounts/accounts.service";
import Link from "@material-ui/core/Link";
import { IDeposit } from "../../interfaces/IDeposit";
import { OperationType } from "../../interfaces/OperationType";

interface IProps {
  account: IAccount;
}

function getModalStyle() {
  const top = 40;
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
    height: 350,
    width: 550,
    backgroundColor: theme.palette.background.paper,
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function SimpleModal(props: IProps) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({ amount: 0 });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const makeDeposit = () => {
    const account: IDeposit = {
      authToken: "xxx",
      hash: props.account.hash,
      tipoOperacao: OperationType.CREDIT,
      valorOperacao: values.amount,
    };
    accountsService.deposit(account);
    alert(JSON.stringify(values));
  };

  const handleChange = (event: HTMLInputElement) => {
    setValues({ ...values, ["amount"]: parseInt(event.value, 10) });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={classes.root}>
        <h2 id="simple-modal-title">Depósito </h2>
        <h3>Digite o valor para realizar o depósito na conta de {props.account.nome}</h3>
        <form className={classes.root}>
          <TextField id="standard-basic" label="Standard" onChange={(e) => handleChange} />
        </form>
        <Button variant="contained" color="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={makeDeposit}>
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
