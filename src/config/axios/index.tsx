import axios from "axios";

const axiosRequest = axios.create({
  baseURL: "https://beercoin-fusion-api.herokuapp.com/bankbeer/",
});

export default axiosRequest;
