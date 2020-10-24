import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

interface IProps {
  colsPan: number;
  items: number;
}

const TableLoading = ({ colsPan, items }: IProps) => {
  let loaders: JSX.Element[] = [];
  for (let index = 0; index < items; index++) {
    loaders.push(
      <TableRow key={`table-loader${index}`}>
        <TableCell colSpan={colsPan} style={{ padding: "1px 0 0 " }}>
          <Skeleton variant="rect" width={"100%"} height={53} animation="wave" />
        </TableCell>
      </TableRow>
    );
  }
  return <>{loaders}</>;
};

export default TableLoading;
