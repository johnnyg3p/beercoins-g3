import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SimpleModal from "./modal";
import AccountsService from "../../services/Accounts/accounts.service";
import Link from "@material-ui/core/Link";
import { useToasts } from "react-toast-notifications";
import TableLoading from "../TableLoading";
import Button from "@material-ui/core/Button";

const accountsService = new AccountsService();

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  seeMore: {
    marginTop: theme.spacing(3),
    maxWidth: '200px'
  },
  tableHeadItem: {
    fontWeight: "bold"
  }
}));

function seeMore(event: HTMLAnchorElement) {
  alert("Ver mais");
}

function Accounts() {
  const [accountList, setAccount] = useState<IAccount[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { addToast } = useToasts();

  function seeMore(event: HTMLAnchorElement) {
    alert("see more");
  }

  useEffect(() => {
    accountsService
      .getAccounts()
      .then((response) => {
        setAccount(response);
        JSON.stringify(response);
      })
      .catch((error) => {
        addToast("Erro ao carregar a lista de contas", {
          appearance: "error",
        });
      });
  }, [addToast]);

  const accounts = accountList.map((account, index) => (
    <TableRow key={account.hash}>
      <TableCell align="left">{index}</TableCell>
      <TableCell align="left">{account.hash}</TableCell>
      <TableCell align="left">{account.nome}</TableCell>
      <TableCell align="left">{account.email}</TableCell>
      <TableCell align="left">{account.cnpj}</TableCell>
      <TableCell align="left">
        <SimpleModal account={account} />
      </TableCell>
    </TableRow>
  ));

  const classes = useStyles();

  return (
    <React.Fragment>
      <h1>Contas</h1>
      <TableContainer>
        <Table className={classes.table} aria-label="Accounts table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className={classes.tableHeadItem}>#</TableCell>
              <TableCell align="left" className={classes.tableHeadItem}>Número da conta</TableCell>
              <TableCell align="left" className={classes.tableHeadItem}>Nome</TableCell>
              <TableCell align="left" className={classes.tableHeadItem}>E-mail</TableCell>
              <TableCell align="left" className={classes.tableHeadItem}>CNPJ</TableCell>
              <TableCell align="left" className={classes.tableHeadItem}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{accountList.length ? accounts : <TableLoading colsPan={6} items={3} />}</TableBody>
        </Table>
      </TableContainer>
      <div className={classes.seeMore}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => seeMore}
          disabled={loading}
        >
          Ver mais
        </Button>
      </div>
    </React.Fragment>
  );
}

export default Accounts;
