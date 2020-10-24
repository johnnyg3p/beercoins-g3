import axios from "axios";

const axiosRequest = axios.create({
  baseURL: "https://beercoin-fusion-api.herokuapp.com/beercoin/",
});

export default axiosRequest;


