import React, { useEffect, useContext, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
import CurrentBalance from "./CurrentBalance";
import { Avatar } from "@material-ui/core";
import "./Balance.scss";
import { GetBalance } from "../../../services/Balance/Balance";
import { useAuthContext } from "../../../context/Auth";

const Balance = () => {
  const { userInfo } = useAuthContext();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    async function getDataFn() {
      const resultBalance = await GetBalance(userInfo.hash || "");
      const { saldo } = resultBalance;
      setBalance(saldo);
    }
    getDataFn();
  }, [balance]);

  return (
    <div className="balance">
      <Avatar className="balance-avatar">
        <IconButton className="balance-avatar-icon-button">
          <AccountBalanceWallet className="balance-avatar-icon-button-wallet" />
        </IconButton>
      </Avatar>
      <span className="balance-text">Tap on the walet to update</span>
      {balance && <CurrentBalance balance={balance} />}
    </div>
  );
};

export default Balance;
