import React from "react";
import GetThumb from "../../GetThumb";
import "./Profile.scss";
import { useAuthContext } from "../../../context/Auth";

interface IRole {
  [key: string]: string;
}
const getRole = (role: IRoles): string => {
  const roles: IRole = { ROLE_MODERATOR: "Moderador", ROLE_USER: "Usuário" };
  return roles[role];
};

const Profile = () => {
  const { userInfo } = useAuthContext();
  return (
    <div className="user-profile">
      <GetThumb src="./assets/user1.jpg" text={userInfo.name} size="large" />
      <h2 className="user-profile-name">{userInfo.name}</h2>
      <span className="user-profile-position">{userInfo.email}</span>
      <span className="user-profile-company">{getRole(userInfo.roles)}</span>
    </div>
  );
};

export default Profile;
