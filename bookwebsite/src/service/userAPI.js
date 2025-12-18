import axios from "axios";
import { getToken } from "../utils/auth";
import axiosClient from "./SecurityAxios";

const API_URL = "http://localhost:8080/api/v1/users";

const getAllUsers = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Array.isArray(response.data.data) ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};
const getUserById = async (token) => {
  try {
    const response = await axiosClient.get(`http://localhost:8080/user/api/get-user-by-id`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};

const deleteUser = async (userId, token) => {
  try {
    await axios.delete(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete user");
  }
};

const toggleUserStatus = async (userId, active, token) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/users/status/${userId}?isActive=${active}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to toggle user status";
    throw new Error(message);
  }
};

const updateUser = async (formData) => {
  try {
    let token = getToken();
    const response = await axiosClient.post(`http://localhost:8080/user/api/update-user`, formData);
    return response;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to update user";
    throw new Error(errorMessage);
  }
};

export { getUserById, getAllUsers, deleteUser, toggleUserStatus, updateUser };
