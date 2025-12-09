import axios from "axios";

export function searchBook(keyword) {
  return axios
    .get(`http://localhost:8080/search?keyword=${keyword}`, {})
    .catch((err) => {
      console.log(err);
    });
}
