import React, { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { IAuthContextProps } from "../../interfaces/IAuthContextProps";
import cookieHandler from '../../utils/cookieHandler'

// const initialState = {
//   userInfo: {
//     id: 71,
//     username: "maria",
//     email: "maria@gmail.com",
//     roles: ["ROLE_MODERATOR"],
//     hash: "c54caf29-184a-4706-9845-6672cbf0025d",
//     accessToken:
//       "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJpYSIsImlhdCI6MTYwMzMyNjE1OCwiZXhwIjoxNjAzNDEyNTU4fQ.P2-8L59AfTXm2w8XC5pi3np71HTg78NoVivXNhAIzwYHJAHdOeMhtJ66E_K-f3WSFPGUK10CqyM0Db5I0eFE_Q",
//     tokenType: "Bearer",
//   },
// };

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

const initialState = () => {
  const userInfo = cookieHandler.read("userInfo");

  if (userInfo) {
    const parsedUserInfo: ISignInStatus = JSON.parse(userInfo);

    return parsedUserInfo;
  }

  return {
    id: null,
    username: "",
    email: "",
    roles: [],
    accessToken: "",
    tokenType: "",
    hash: "",
  };
};

export const AuthProvider = ({ children }: any) => {
  const [userInfo, setUserInfo] = useState(initialState());
  let history = useHistory();

  const signOut = () => {
    cookieHandler.remove("userInfo");
    setUserInfo(initialState());

    history.push('/login');
  };

  return <AuthContext.Provider value={{ signOut, userInfo, setUserInfo }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("AuthContext must be used within a provider.");

  return context;
};
