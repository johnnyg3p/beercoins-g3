import React from "react";
import GetThumb from "../../GetThumb";
import "./Profile.scss";
import { useAuthContext } from "../../../context/Auth";

const Profile = () => {
  const { userInfo } = useAuthContext();
  return (
    <div className="user-profile">
      <GetThumb src="./assets/user1.jpg" text={userInfo.name} size="large" />
      <h2 className="user-profile-name">{userInfo.name}</h2>
      <span className="user-profile-position">Software Engineering</span>
      <span className="user-profile-company">Beertech - AbInbev</span>
    </div>
  );
};

export default Profile;
