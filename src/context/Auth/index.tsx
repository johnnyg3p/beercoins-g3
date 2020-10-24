import React, { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { IAuthContextProps } from "../../interfaces/IAuthContextProps";
import cookieHandler from '../../utils/cookieHandler'

const initialStateObj: ISignInStatus = {
  id: null,
  username: "",
  email: "",
  roles: "",
  hash: "",
  accessToken: "",
  tokenType: "",
};

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

const initialState = () => {
  const userInfo = cookieHandler.read("userInfo");

  if (userInfo) {
    const parsedUserInfo: ISignInStatus = JSON.parse(userInfo);

    return parsedUserInfo;
  }

  return initialStateObj;
};

export const AuthProvider = ({ children }: any) => {
  const [userInfo, setUserInfo] = useState(initialState());
  let history = useHistory();

  const signOut = () => {
    cookieHandler.remove("userInfo");
    setUserInfo(initialState());

    history.push("/login");
  };

  return <AuthContext.Provider value={{ signOut, userInfo, setUserInfo }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("AuthContext must be used within a provider.");

  return context;
};
