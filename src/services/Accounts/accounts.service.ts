import axiosRequest from "../../config/axios";
import { AxiosResponse } from "axios";

export default class AccountsService {
  async getAccounts() {
    return new Promise<AxiosResponse<IAccount>>(
      (resolve, reject) => {
        axiosRequest
          .get("auth/accounts")
          .then((response) => {
            return resolve(response);
          })
          .catch((error) => reject(error));
      }
    );
  }

  async deposit(value: number) {
    return new Promise<AxiosResponse<IAccount>>(
      (resolve, reject) => {
        axiosRequest
          .post("auth/deposit", {value: value})
          .then((response) => {
            return resolve(response);
          })
          .catch((error) => reject(error));
      }
    );
  }

}