import React, { memo } from "react";
import "./CurrentBalance.scss";
import { formatCurrency } from "../../../../utils/formaters/formaters";

interface IBalanceProps {
  balance: number;
}

const CurrentBalance = ({ balance }: IBalanceProps) => {
  return (
    <>
      <div className="current-balance">
        <span className="current-balance-text">Current Balance</span>
        <span className="current-balance-currency">{formatCurrency(balance)}</span>
      </div>
    </>
  );
};

export default memo(CurrentBalance);
