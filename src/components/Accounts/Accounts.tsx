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

const accountsService = new AccountsService();

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

function seeMore(event: HTMLAnchorElement) {
  alert("see more");
}

function Accounts() {
  const [accountList, setAccount] = useState<IAccount[]>([]);
  const { addToast } = useToasts();

  useEffect(() => {
    accountsService
      .getAccountsMock()
      .then((response) => {
        setAccount(response);
        JSON.stringify(response);
      })
      .catch((error) => {
        addToast("An error occur to get Accounts. Try again.", {
          appearance: "error",
        });
      });
  });

  let bankPostList = accountList.map((account, index) => (
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
      <h1>Accounts</h1>
      <TableContainer>
        <Table className={classes.table} aria-label="Accounts table">
          <TableHead>
            <TableRow>
              <TableCell align="left">#</TableCell>
              <TableCell align="left">Account number</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">CNPJ</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{bankPostList}</TableBody>
        </Table>
      </TableContainer>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={() => seeMore}>
          See more
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Accounts;
