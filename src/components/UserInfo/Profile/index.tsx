import React from "react";
import GetThumb from "../../GetThumb";
import { Paper } from "@material-ui/core";

const Profile = () => {
  return (
    <div className="user-profile">
      <Paper variant="outlined">
        <GetThumb src="./assets/user1.jpg" text="Nexin Morgan" />
        <h2 className="name">
          Nexin <b>Morgan</b>
        </h2>
        <span className="position">Asst. Broker</span>
        <span className="company">New Jersey Bank</span>
      </Paper>
    </div>
  );
};

export default Profile;
