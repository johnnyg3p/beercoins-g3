import cookieHandler from "../../utils/cookieHandler";
import { AxiosRequestConfig } from "axios";

export default class HttpConfig {
  private token: string;
  private userInfo: any;

  constructor() {
    this.userInfo = JSON.parse(cookieHandler.read("userInfo") || "");
    this.token = this.userInfo.accessToken;
  }

  getToken(): string {
    return this.token;
  }

  getUserInfo(): string {
    return this.token;
  }

  getHeader() {
    const header = (): AxiosRequestConfig => {
      const userInfo = new HttpConfig();

      return {
        headers: {
          Authorization: `Bearer ${userInfo.getToken()}`,
        },
      };
    };
  }
}

export const headerConfig = (): AxiosRequestConfig => {
  const userInfo = new HttpConfig();
  return {
    headers: {
      Authorization: `Bearer ${userInfo.getToken()}`,
    },
  };
};
