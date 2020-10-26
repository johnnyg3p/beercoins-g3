import axiosRequest from "../../config/axios";
import { headerConfig } from "../../config/axios/httpConfig";

// TODO use if api didn't respond
// const GetBalanceMocked = () => Axios.get("mockapi/balance.json");
// const GetStatementMocked = () => Axios.get("mockapi/statement.json");

export const GetBalance = (requestProps: IRequestInfo) => {
  return new Promise<IBalance>((resolve, reject) => {
    // GetBalanceMocked()
    axiosRequest
      .get("/balance/", headerConfig())
      .then((response) => {
        return resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const GetStatement = (requestProps: IRequestInfo) => {
  return new Promise<IStatement[]>((resolve, reject) => {
    // GetStatementMocked()
    axiosRequest
      .get("/bank-statement/", headerConfig())
      .then((response) => {
        return resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const PostPayment = (barcode: string) => {
  return new Promise<IStatement[]>((resolve, reject) => {
    axiosRequest
      .post("/bill", { barcode }, headerConfig())
      .then((response) => {
        console.log("response post bil", response);
        return resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};
