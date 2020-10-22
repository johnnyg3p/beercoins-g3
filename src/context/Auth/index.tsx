import React, { createContext, useContext, useState } from "react";
import { IAuthContextProps } from "../../interfaces/IAuthContextProps";

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [userInfo, setUserInfo] = useState<ISignInStatus>();

  const signOut = () => {
    sessionStorage.removeItem('userInfo');
    setUserInfo(undefined);
  }

  return (
    <AuthContext.Provider value={{ signOut, userInfo, setUserInfo }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("AuthContext must be used within a provider.");

  return context;
};
