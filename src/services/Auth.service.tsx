import axiosRequest from "../config/axios";
import { AxiosResponse } from "axios";

export class SignInService {
  async execute(login: ISignIn) {
    return new Promise<AxiosResponse<ISignInStatus>>((resolve, reject) => {
      axiosRequest
        .post("auth/signin", login)
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  mock(login: ISignIn) {
    return new Promise<ISignInStatus>((resolve, reject) => {
      setTimeout(() => {
        return resolve({
          id: 71,
          username: "maria",
          email: "maria@gmail.com",
          roles: "ROLE_MODERATOR",
          hash: "c54caf29-184a-4706-9845-6672cbf0025d",
          accessToken:
            "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJpYSIsImlhdCI6MTYwMzMyNjE1OCwiZXhwIjoxNjAzNDEyNTU4fQ.P2-8L59AfTXm2w8XC5pi3np71HTg78NoVivXNhAIzwYHJAHdOeMhtJ66E_K-f3WSFPGUK10CqyM0Db5I0eFE_Q",
          tokenType: "Bearer",
        });
      }, 1000);
    });
  }
}

export class SignUpService {
  async execute(signUp: ISignUp) {
    return new Promise<AxiosResponse<ISignUpStatus>>((resolve, reject) => {
      axiosRequest
        .post("auth/signup", signUp, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => reject(error));
    });
  }
}
