import axios from "axios";
import { getToken } from "../utils/auth";
import axiosClient from "./SecurityAxios";

export const showMyOrder = (token) => {
  return axiosClient.get(`http://localhost:8080/order/api/my-order`);
};

export const addToOrder = (token) => {
  return axiosClient.post(`http://localhost:8080/api/v1/order`);
};

export const cancelOrder = (token, orderId) => {
  return axiosClient.delete(`http://localhost:8080/api/v1/order/cancel/${orderId}`);
};

export const showPendingOrder = (token) => {
  return axiosClient.get(`http://localhost:8080/api/v1/manage-order/seller/pending`);
};

export const acceptOrder = (token, orderId) => {
  return axiosClient.put(
    `http://localhost:8080/api/v1/manage-order/${orderId}/approve`
  );
};

export const rejectOrder = (token, orderId) => {
  return axiosClient.put(
    `http://localhost:8080/api/v1/manage-order/${orderId}/reject`
  );
};

export const showAllOrders=(type)=>{
  let token = getToken();
  return axiosClient.get(`http://localhost:8080/manage-order/api/get-all-orders?handle=${type}`)
}

export const updateOrderStatus =(orderId,type)=>{
  let token = getToken();
  return axiosClient.get(`http://localhost:8080/manage-order/api/update-status?id=${orderId}&status=${type}`);
}
