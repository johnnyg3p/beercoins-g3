import React from 'react';
import IBankPosting from '../../services/Interfaces/IBankPosting';


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { BankPostType } from '../../services/Interfaces/IBankPosting';


interface Iprops {
    bankPostings: IBankPosting[]
}

const useStyles = makeStyles({
    table: {
        maxWidth: 650,
    },
});

const bankPostingsMock: IBankPosting[] =
  [{
    id: "564656",
    description: "salario",
    value: 100000,
    type: BankPostType.CREDIT,
    date: 1
  }, {
    id: "113654",
    description: "mercado livre",
    value: 5000,
    type: BankPostType.DEBIT,
    date: 6
  }, {
    id: "413654",
    description: "posto gasolina",
    value: 2399,
    type: BankPostType.DEBIT,
    date: 3
  }, {
    id: "213654",
    description: "posto gasolina",
    value: 4235,
    type: BankPostType.DEBIT,
    date: 2
  },];

function Statement() {

    let bankPostList = bankPostingsMock
        .sort((a, b) => {
            if (a.date < b.date) return -1;
            else if (a.date > b.date) return 1;
            return 0;
        })
        .map((bankPost) =>
            <TableRow key={bankPost.id}>
                <TableCell align="left">{bankPost.description}</TableCell >
                <TableCell align="left">{bankPost.value}</TableCell >
                <TableCell align="left">{bankPost.type}</TableCell >
            </TableRow>
        );


    const classes = useStyles();

    return (
        <TableContainer >
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Lançamento</TableCell >
                        <TableCell align="left">Valor</TableCell >
                        <TableCell align="left">Tipo</TableCell >
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bankPostList}
                </TableBody>
            </Table>
        </TableContainer>
    );

}

export default Statement;