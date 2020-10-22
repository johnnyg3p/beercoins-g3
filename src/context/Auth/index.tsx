import React, { createContext, useContext, useState } from "react";
import { SignUpService, SignInService } from "../../services/Auth.service";
import { IAuthContextProps } from "../../interfaces/IAuthContextProps";

const signUpService = new SignUpService();
const signInService = new SignInService();

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [userInfo, setUserInfo] = useState<ISignInStatus>();

  const signIn = async (login: ISignIn) => {
    const { password, username } = login;

    await signInService.execute({ password, username }).then(response => {
      const userInformation = response.data;
      
      setUserInfo(userInformation);
      sessionStorage.setItem('userInfo', JSON.stringify(response));
    }).catch(error => {
      console.log('error :>> ', error);
    })
  };

  const signUp = async (signUp: ISignUp) => {
    const { cnpj, email, nome, password, role, username } = signUp;

    await signUpService.execute({ cnpj, email, nome, password, role, username }).then(response => {
      const userInformation = response.data;
      
      setUserInfo(userInformation);
      sessionStorage.setItem('userInfo', JSON.stringify(response));
    }).catch(error => {
      console.log('error :>> ', error);
    })
  };

  const signOut = () => {
    sessionStorage.removeItem('userInfo');
    setUserInfo(undefined);
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut, userInfo }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("AuthContext must be used within a provider.");

  return context;
};
