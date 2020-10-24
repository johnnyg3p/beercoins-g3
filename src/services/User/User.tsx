import Axios from "axios";
import { configureGet } from "../../utils/formaters/configure-requests";

// TODO use if api didn't respond
const GetBalanceMocked = () => Axios.get("mockapi/balance.json");
const GetStatementMocked = () => Axios.get("mockapi/statement.json");

const GetBalanceApi = ({ hash, token }: IRequestInfo) => configureGet(`/balance/${hash}`, token);
const GetStatementApi = ({ hash, token }: IRequestInfo) => configureGet(`/bank-statement/${hash}`, token);

export const GetBalance = (requestProps: IRequestInfo) => {
  return new Promise<IBalance>((resolve, reject) => {
    // GetBalanceMocked()
    GetBalanceApi(requestProps)
      .then((response) => {
        return resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const GetStatement = (requestProps: IRequestInfo) => {
  return new Promise<IStatement[]>((resolve, reject) => {
    // GetStatementMocked()
    GetStatementApi(requestProps)
      .then((response) => {
        return resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};
