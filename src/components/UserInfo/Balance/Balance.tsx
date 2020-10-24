import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
import CurrentBalance from "./CurrentBalance";
import { Skeleton } from "@material-ui/lab";
import { Avatar } from "@material-ui/core";
import "./Balance.scss";
import { GetBalance } from "../../../services/User/User";
import { useAuthContext } from "../../../context/Auth";
import { useToasts } from "react-toast-notifications";

const Balance = () => {
  const { userInfo } = useAuthContext();
  const [balance, setBalance] = useState<number | null>(null);
  const { addToast } = useToasts();

  useEffect(() => {
    async function getDataFn() {
      try {
        const resultBalance = await GetBalance({ token: userInfo.accessToken });
        const { saldo } = resultBalance;
        setBalance(saldo);
      } catch (error) {
        addToast("Error to get balance.", {
          appearance: "error",
        });
      }
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
