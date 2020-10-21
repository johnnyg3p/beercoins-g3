import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SimpleModal from './modal';



interface IProps {
  accounts: IAccount[];
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function Accounts(props: IProps) {

  let bankPostList = props.accounts
    .map((account, index) => (
      <TableRow key={account.id}>
        <TableCell align="left">{index}</TableCell>
        <TableCell align="left">{account.name}</TableCell>
        <TableCell align="left">{account.hash}</TableCell>
        <TableCell align="left">{account.cnpj}</TableCell>
        <TableCell align="left">
          <SimpleModal account={account}/>
        </TableCell>
      </TableRow>
    ));

  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="left">E-mail</TableCell>
            <TableCell align="left">CNPJ</TableCell>
            <TableCell align="left">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{bankPostList}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default Accounts;
