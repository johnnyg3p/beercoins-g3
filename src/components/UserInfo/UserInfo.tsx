import React from "react";
import Balance from "./Balance";
import Profile from "./Profile";
import "./UserInfo.scss";

const UserInfo = () => {
  return (
    <div className="user-info">
      <Profile />
      <Balance />
    </div>
  );
};

export default UserInfo;
