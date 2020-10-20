import React from "react";
import Statement from "./Balance";
import Profile from "./Profile";

const UserInfo = () => {
  return (
    <div className="user-info">
      <Profile />
      <Statement />
    </div>
  );
};

export default UserInfo;
