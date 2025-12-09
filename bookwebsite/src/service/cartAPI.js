import axios from "axios";

export const addToCart = (bookId, quantity, token) => {
  return axios.post(
    "http://localhost:8080/cart/api/add-cart",
    { bookId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const showMyCart = (token) => {
  return axios.get("http://localhost:8080/cart/api/my-cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeItemFormCart = (cartId, token) => {
  console.log(token)
  return axios.post(
    `http://localhost:8080/cart/api/delete-item?cartId=${cartId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
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
