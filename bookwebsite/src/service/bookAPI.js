import axios from "axios";
import { getToken } from "../utils/auth";

export const getBooks = () => {
  return axios.get("http://localhost:8080/api/v1/book");
};

export const getBookDetails = (bookId) => {
  return axios.get(`http://localhost:8080/book/api/get-book-by-id?id=${bookId}`);
};

export const requestToAddNewBook = (formData, token) => {
  return axios.post("http://localhost:8080/manage-book/api/add-book", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const myRequestAddNewBook = (token) => {
  return axios.get("http://localhost:8080/api/v1/add-book/my-requests", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const cancelRequestAddNewBook = (token, bookId) => {
  return axios.delete(`http://localhost:8080/api/v1/add-book/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const showMyShop = (token) => {
  return axios.get("http://localhost:8080/api/v1/manage-book/my-shop", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editMyBookShop = (token, bookId, formData) => {
  return axios.put(
    `http://localhost:8080/api/v1/manage-book/${bookId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const changeBookStatus = (token, bookId, isActive) => {
  return axios.patch(
    `http://localhost:8080/api/v1/manage-book/${bookId}/status?isActive=${isActive}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteBook = (bookId) => {
  let token = getToken();
  console.log(token);
  return axios.post(
    `http://localhost:8080/manage-book/api/delete-book?bookId=${bookId}`,null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const bookByReview = (pageNumber, numberOfBookEachPage) => {
  return axios
    .get(
      `http://localhost:8080/book/api/get-best-review?page=${pageNumber}&limit=${numberOfBookEachPage}`,
      {}
    )
    .catch((err) => {
      console.log(err);
    });
};

export const bookByDiscount = (pageNumber, numberOfBookEachPage) => {
  return axios
    .get(
      `http://localhost:8080/book/api/get-best-discount?page=${pageNumber}&limit=${numberOfBookEachPage}`,
      {}
    )
    .catch((err) => {
      console.log(err);
    });
};

export const newestBooks = (pageNumber, numberOfBookEachPage) => {
  return axios
    .get(
      `http://localhost:8080/book/api/get-all-books?page=${pageNumber}&limit=${numberOfBookEachPage}`,
      {}
    )
    .catch((err) => {
      console.log(err);
    });
};
const API_URL = "http://localhost:8080/api/v1";

export const filterBooksByCategories = async (category) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/book/api/get-by-category?category=${category}`);
    return response.data;
  } catch (error) {
    console.error("Error filtering books by categories:", error);
    throw error;
  }
};
const BASE_URL = "http://localhost:8080/api/v1/admin/books";

export const getAllPendingBooks = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/pending`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch pending books"
    );
  }
};

export const approveBook = async (token, bookId) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${bookId}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to approve book");
  }
};
export const rejectBook = async (token, bookId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${bookId}/reject`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to reject book");
  }
};
export const updateBookStatus = async (bookId, isActive) => {
  const token = getToken();
  return await axios.patch(
    `${BASE_URL}/${bookId}/status?isActive=${isActive}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getBookAdmin = async() =>{
  const token = getToken();
  return await axios.get("http://localhost:8080/manage-book/api/get-all-book",{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}

export const updateBookAdmin = async(dataForm)=>{
  const token = getToken();
  return await axios.post('http://localhost:8080/manage-book/api/update-book',
  dataForm,{
    headers:{
      Authorization:`Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  })
}
