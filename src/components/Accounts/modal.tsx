import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AccountsService from '../../services/Accounts/accounts.service';
import Link from '@material-ui/core/Link';
import { IDeposit } from '../../interfaces/IDeposit';
import { OperationType } from '../../interfaces/OperationType';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

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
        position: 'absolute',
        // padding: 20,
        height: '50%',
        width: '50%',
        backgroundColor: theme.palette.background.paper,
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
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

    const handleChange = ((e: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({ ...values, ['amount']: parseInt(e.currentTarget.value, 10) });
        console.log(e.currentTarget.value)
    });

    const body = (
        <div style={modalStyle} className={classes.paper} >
            <div className={classes.root}>
                <Typography component="h1" variant="h4" align="center">Depósito</Typography>
                <h3>Digite o valor para realizar o depósito na conta de {props.account.nome}</h3>
                <Grid item xs={12}>
                    <TextField fullWidth id="standard-basic" label="Valor" value='0' onChange={handleChange} />
                </Grid>
                <Button variant="contained" color="secondary" onClick={handleClose} className={classes.button}>Cancelar</Button>
                <Button variant="contained" color="primary" onClick={makeDeposit} className={classes.button}>Realizar Depósito</Button>
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
