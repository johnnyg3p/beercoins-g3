import React, { useState, useEffect, memo } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useAuthContext } from "../../context/Auth";
import { GetStatement } from "../../services/User/User";
import "./Statement.scss";
import { formatCurrency, formatBankPost } from "../../utils/formaters/formaters";
import { useToasts } from "react-toast-notifications";
import { Skeleton } from "@material-ui/lab";
import TableLoading from "../TableLoading";

interface IProps {}

function Statement(props: IProps) {
  const { userInfo } = useAuthContext();
  const [statement, setStatement] = useState<IStatement[]>([]);
  const { addToast } = useToasts();

  type Order = "asc" | "desc";

  useEffect(() => {
    async function getDataFn() {
      try {
        const resultStatement = await GetStatement({ hash: userInfo.hash || "", token: userInfo.accessToken });
        setStatement(resultStatement);
      } catch (error) {
        addToast("Error to get statement.", {
          appearance: "error",
        });
      }
    }
    getDataFn();
  }, [userInfo]);

  const bankPostList = statement
    .sort((a, b) => {
      if (a.horarioOperacao < b.horarioOperacao) return 1;
      else if (a.horarioOperacao > b.horarioOperacao) return -1;
      return 0;
    })
    .map((bankPost, index) => (
      <TableRow key={index + bankPost.hash}>
        <TableCell align="left">{formatBankPost(bankPost.debitCredit)}</TableCell>
        <TableCell align="center">{bankPost.horarioOperacao}</TableCell>
        <TableCell align="right">{formatCurrency(bankPost.valorOperacao)}</TableCell>
      </TableRow>
    ));

  return (
    <TableContainer>
      <Table className="statement" aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Bank posting</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{statement.length ? bankPostList : <TableLoading colsPan={3} items={3} />}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default memo(Statement);
