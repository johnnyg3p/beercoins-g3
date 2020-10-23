import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
import CurrentBalance from "./CurrentBalance";
import { Skeleton } from "@material-ui/lab";
import { Avatar } from "@material-ui/core";
import "./Balance.scss";
import { GetBalance } from "../../../services/User/User";
import { useAuthContext } from "../../../context/Auth";

const Balance = () => {
  const { userInfo } = useAuthContext();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    async function getDataFn() {
      const resultBalance = await GetBalance({ hash: userInfo.hash || "", token: userInfo.accessToken });
      const { saldo } = resultBalance;
      setBalance(saldo);
    }
    getDataFn();
  }, [userInfo]);

  return (
    <div className="balance">
      <Avatar className="balance-avatar">
        <IconButton className="balance-avatar-icon-button">
          <AccountBalanceWallet className="balance-avatar-icon-button-wallet" />
        </IconButton>
      </Avatar>
      <span className="balance-text">Tap on the walet to update</span>
      {balance === null ? (
        <Skeleton variant="rect" width={"calc(100% - 10%)"} height={82} animation="wave" />
      ) : (
        <CurrentBalance balance={balance} />
      )}
    </div>
  );
};

export default Balance;
