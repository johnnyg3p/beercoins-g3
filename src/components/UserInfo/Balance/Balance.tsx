import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
import CurrentBalance from "./CurrentBalance";

const Balance = () => {
  return (
    <div className="balance">
      <IconButton className="balance-icon-button">
        <AccountBalanceWallet className="balance-icon-wallet" />
      </IconButton>
      <span className="balance-text">Tap on the walet to update</span>
      <CurrentBalance />
    </div>
  );
};

export default Balance;
