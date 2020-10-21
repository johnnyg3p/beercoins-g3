import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
import CurrentBalance from "./CurrentBalance";
import { Avatar } from "@material-ui/core";
import "./Balance.scss";

const Balance = () => {
  return (
    <div className="balance">
      <Avatar className="balance-avatar">
        <IconButton className="balance-avatar-icon-button">
          <AccountBalanceWallet className="balance-avatar-icon-button-wallet" />
        </IconButton>
      </Avatar>
      <span className="balance-text">Tap on the walet to update</span>
      <CurrentBalance />
    </div>
  );
};

export default Balance;
