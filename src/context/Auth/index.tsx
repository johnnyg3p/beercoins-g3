import React, { createContext, useContext, useState } from "react";
import { SignUpService, SignInService } from "../../services/Auth.service";
import { IAuthContextProps } from "../../Interfaces/IAuthContextProps";

const signUpService = new SignUpService();
const signInService = new SignInService();

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);
const initialState = {
  userInfo: {
    id: 71,
    username: "maria",
    email: "maria@gmail.com",
    roles: ["ROLE_MODERATOR"],
    hash: "c54caf29-184a-4706-9845-6672cbf0025d",
    accessToken:
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJpYSIsImlhdCI6MTYwMzMyNjE1OCwiZXhwIjoxNjAzNDEyNTU4fQ.P2-8L59AfTXm2w8XC5pi3np71HTg78NoVivXNhAIzwYHJAHdOeMhtJ66E_K-f3WSFPGUK10CqyM0Db5I0eFE_Q",
    tokenType: "Bearer",
  },
};

export const AuthProvider = ({ children }: any) => {
  const [userInfo, setUserInfo] = useState<ISignInStatus>(initialState.userInfo);

  const signIn = async (login: ISignIn) => {
    const { password, username } = login;

    await signInService
      .execute({ password, username })
      .then((response) => {
        const userInformation = response.data;

        setUserInfo(userInformation);
        sessionStorage.setItem("userInfo", JSON.stringify(response));
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  };

  const signUp = async (signUp: ISignUp) => {
    const { cnpj, email, nome, password, role, username } = signUp;

    await signUpService
      .execute({ cnpj, email, nome, password, role, username })
      .then((response) => {
        const userInformation = response.data;

        setUserInfo(userInformation);
        sessionStorage.setItem("userInfo", JSON.stringify(response));
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  };

  const signOut = () => {
    sessionStorage.removeItem("userInfo");
    setUserInfo(initialState.userInfo);
  };

  return <AuthContext.Provider value={{ signIn, signUp, signOut, userInfo }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("AuthContext must be used within a provider.");

  return context;
};
