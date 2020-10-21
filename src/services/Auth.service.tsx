import axiosRequest from "../config/axios";
import { AxiosResponse } from "axios";

export class SignInService {
  async execute(login: ISignIn) {
    return new Promise<AxiosResponse<ISignInStatus>>(
      (resolve, reject) => {
        axiosRequest
          .post("auth/signin", login)
          .then((response) => {
            return resolve(response);
          })
          .catch((error) => reject(error));
      }
    );
  }
}

export class SignUpService {
    async execute(signUp: ISignUp) {
      return new Promise<AxiosResponse<ISignUpStatus>>(
        (resolve, reject) => {
          axiosRequest
            .post("auth/signup", signUp)
            .then((response) => {
              return resolve(response);
            })
            .catch((error) => reject(error));
        }
      );
    }
  }
  