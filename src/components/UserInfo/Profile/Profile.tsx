import React, { useContext } from "react";
import GetThumb from "../../GetThumb";
import "./Profile.scss";
import { useAuthContext } from "../../../context/Auth";

const Profile = () => {
  const { userInfo } = useAuthContext();
  console.log("userInf => ", userInfo);
  return (
    <div className="user-profile">
      <GetThumb src="./assets/user1.jpg" text={userInfo.username} size="large" />
      <h2 className="user-profile-name">{userInfo.username}</h2>
      <span className="user-profile-position">Asst. Broker</span>
      <span className="user-profile-company">New Jersey Bank</span>
    </div>
  );
};

export default Profile;
