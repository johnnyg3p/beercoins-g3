import axiosRequest from "../config/axios";

export default class SignInService {
  async execute(login: ILogin): Promise<ILoginStatus | ILoginError>{
    return new Promise((resolve, reject) => {
      axiosRequest
        .post("auth/signin", login)
        .then((response): ILoginStatus => (response.data))
        .catch((error) => reject(error));
    });
  }
}
