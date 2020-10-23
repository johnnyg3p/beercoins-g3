import axiosRequest from "../../config/axios";

export const configureGet = (url: string, token: string) =>
  axiosRequest.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
