import React, { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { IAuthContextProps } from "../../interfaces/IAuthContextProps";

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
  const sessionStorageInfo = sessionStorage.getItem("userInfo");

  if (sessionStorageInfo) {
    const parsedSessionStorageInfo: ISignInStatus = JSON.parse(sessionStorageInfo);

    return parsedSessionStorageInfo;
  }

  return initialStateObj;
};

export const AuthProvider = ({ children }: any) => {
  const [userInfo, setUserInfo] = useState(initialState());
  let history = useHistory();

  const signOut = () => {
    sessionStorage.removeItem("userInfo");
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
