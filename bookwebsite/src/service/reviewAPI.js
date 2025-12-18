import axios from "axios";
import axiosClient from "./SecurityAxios";

const API_BASE = "http://localhost:8080/api/v1";

const authHeader = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getBookReviews = async (bookId) => {
  const res = await axios.get(`http://localhost:8080/review/api/get-review-by-bookId?bookId=${bookId}`);
  return res.data;
};

export const postReview = async (bookId, rating, comment) => {
  const res = await axiosClient.post(
    `http://localhost:8080/review/api/add-review`,
    { bookId:bookId, score:rating, content:comment }
  );
  return res.data;
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await axiosClient.delete(
      `${API_BASE}/reviews/book/${reviewId}`
    );
    console.log("Review deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw new Error("Failed to delete review");
  }
};

export const updateReview = async (reviewId, updatedReview) => {
  try {
    const response = await axiosClient.put(
      `http://localhost:8080/api/v1/reviews/book/${reviewId}`,
      updatedReview
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
