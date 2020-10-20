import React from "react";
import GetThumb from "../../GetThumb";
import "./Profile.scss";

const Profile = () => {
  return (
    <div className="user-profile">
      <GetThumb src="./assets/user1.jpg" text="Nexin Morgan" size="large" />
      <h2 className="user-profile-name">
        Nexin <b>Morgan</b>
      </h2>
      <span className="user-profile-position">Asst. Broker</span>
      <span className="user-profile-company">New Jersey Bank</span>
    </div>
  );
};

export default Profile;
