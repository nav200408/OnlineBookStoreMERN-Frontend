import axios from "axios";
import axiosClient from "./SecurityAxios";

const postLogin = (username, password) => {
  return axios.post("http://localhost:8080/auth/api/login", {
    username,
    password,
  });
};
const postRegister = (data) => {
  return axios.post("http://localhost:8080/auth/api/register", data);
};
const postLogout = () => {
  return axiosClient.get("http://localhost:8080/auth/api/logout");
};

const refreshService = (refreshToken)=>{
  return axios.post("http://localhost:8080/auth/api/refresh-token",{refreshToken:refreshToken})
}
export { postLogin, postRegister,refreshService, postLogout };
