import axiosRequest from "../../config/axios";
import Axios from "axios";

// TODO use if api didn't respond
const GetBalanceMocked = () => Axios.get("mockapi/balance.json");
// const GetBalanceApi = (hash: string) => axiosRequest.get(`/balance/${hash}`);

export const GetBalance = (hash: string) => {
  return new Promise<IBalance>((resolve, reject) => {
    GetBalanceMocked()
      // GetBalanceApi(hash)
      .then((response) => {
        return resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};
