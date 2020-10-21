import React from "react";
import "./CurrentBalance.scss";

const CurrentBalance = () => {
  return (
    <>
      <div className="current-balance">
        <span className="current-balance-text">Current Balance</span>
        <span className="current-balance-currency">R$ 12.343,55</span>
      </div>
    </>
  );
};

export default CurrentBalance;
