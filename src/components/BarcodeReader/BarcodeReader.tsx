import React from "react";
import { formatBill } from "../../utils/formaters/formaters";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { decoder } from "../../utils/barcoder";

interface IProps {
  barcoder: string;
}

const BarcodeReader = ({ barcoder }: IProps) => {
  const { bank, amount } = decoder(barcoder);
  const formatedValue = formatBill(barcoder);

  return (
    <div className="barcoder">
      <List>
        <ListItem>
          <ListItemText primary={formatedValue} secondary="Código do boleto" className="barcoder-text" />
        </ListItem>
        <ListItem>
          <ListItemText primary={bank} secondary="Banco" className="barcoder-text" />
        </ListItem>
        <ListItem>
          <ListItemText primary={amount} secondary="Valor" className="barcoder-text" />
        </ListItem>
      </List>
    </div>
  );
};

export default BarcodeReader;
