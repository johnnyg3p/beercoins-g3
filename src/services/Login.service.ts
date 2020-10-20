import { ILogin, ILoginStatus } from "../Interfaces/ILogin";
export default class Animals {
  fakeLogin: ILogin = {
    user: "johnny",
    password: "12345",
  };

  // https://beercoin-fusion-api.herokuapp.com/bankbeer/auth/signup

  login(login: ILogin): Promise<ILoginStatus> {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            accessToken: "1212121",
            status: "200",
          }),
        1000
      );
    });
  }
}
