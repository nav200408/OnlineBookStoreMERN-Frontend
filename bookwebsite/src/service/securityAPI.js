import axios from "axios";

const postLogin = (username, password) => {
  return axios.post("http://localhost:8080/auth/api/login", {
    username,
    password,
  });
};
const postRegister = (data) => {
  return axios.post("http://localhost:8080/auth/api/register", data);
};
const postLogout = (token) => {
  return axios.post("http://localhost:8080/api/v1/auth/log-out", { token });
};

const refreshService = (refreshToken)=>{
  return axios.post("http://localhost:8080/auth/api/refresh-token",{refreshToken:refreshToken})
}
export { postLogin, postRegister,refreshService, postLogout };
