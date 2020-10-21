import axiosRequest from "../../config/axios";
import { AxiosResponse } from "axios";

export default class SignInService {
  async execute(login: ILogin) {
    return new Promise<AxiosResponse<ILoginStatus> | ILoginError>(
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
