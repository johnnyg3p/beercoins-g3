import axios from "axios";

const axiosRequest = axios.create({
  baseURL: "https://beercoin-fusion-api.herokuapp.com/bankbeer/",
  /* headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJjZWxvIiwiaWF0IjoxNjAzMzIwMjc0LCJleHAiOjE2MDM0MDY2NzR9.lfcDl3z-uBQd_IGo1jW9FCN_jMLJNpF3VHSB8en1McrZvP2qu9WUhSYkkIKlKNqlfj6h9qM8QjnEXuOsrHgA7w`,
  }, */
});

export default axiosRequest;
