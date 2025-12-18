import axios from "axios";
import axiosClient from "./SecurityAxios";

export const addToCart = (bookId, quantity, token) => {
  return axiosClient.post(
    "http://localhost:8080/cart/api/add-cart",
    { bookId, quantity }
  );
};

export const showMyCart = (token) => {
  return axiosClient.get("http://localhost:8080/cart/api/my-cart");
};

export const removeItemFormCart = (cartId, token) => {
  console.log(token)
  return axiosClient.post(
    `http://localhost:8080/cart/api/delete-item?cartId=${cartId}`
  );
};

export const editCartItem = (cartId, token, quantity) => {
  return axios.post(
    `http://localhost:8080/cart/api/update-quantity?quantity=${quantity}&cartId=${cartId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
