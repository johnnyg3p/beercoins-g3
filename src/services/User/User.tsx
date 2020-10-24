import Axios from "axios";
import { configureGet } from "../../utils/formaters/configure-requests";

// TODO use if api didn't respond
const GetBalanceMocked = () => Axios.get("mockapi/balance.json");
const GetStatementMocked = () => Axios.get("mockapi/statement.json");

const GetBalanceApi = ({ token }: IRequestInfo) => configureGet(`/balance/`, token);
const GetStatementApi = ({ token }: IRequestInfo) => configureGet(`/bank-statement/`, token);

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
