import { useEffect, useState } from "react";
import { showMyOrder } from "../../service/orderAPI";
import { getToken } from "../../utils/auth";
import "../../assets/styles/NewMyOrder.css";

export function NewMyOrder() {
  let [orders, setOrders] = useState([]);
  let [payments, setPayments] = useState([]);
  let [books, setBooks] = useState([]);
  let [quantity, setQuantity] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let token = getToken();
    let res = await showMyOrder(token);
    // Ensure we handle potential null responses safely
    setOrders(res.data.orders || []);
    setBooks(res.data.books || []);
    setPayments(res.data.payment || []);
    setQuantity(res.data.quantities || []);
  }

  // Helper to dynamically color the status
  const getStatusClass = (status) => {
    const s = status ? status.toLowerCase() : "";
    if (s === "paid" || s === "success") return "status-paid";
    if (s === "pending") return "status-pending";
    if (s === "failed") return "status-failed";
    return "";
  };

  return (
    <div className="order-container">
      <h1 className="table-title">Recent Book Orders</h1>

      <div className="table-wrapper">
        <table className="order-table">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Quantity</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => {
              // Safety check to ensure data exists at this index
              const currentBook = books[index];
              const currentPayment = payments[index];
              const currentQty = quantity[index];

              if (!currentBook || !currentPayment) return null;

              return (
                <tr key={index}>
                  <td className="book-title">{currentBook.bookTitle}</td>
                  <td className="qty-cell">{currentQty}</td>
                  <td>{currentPayment.paymentMethod}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(currentPayment.paymentStatus)}`}>
                      {currentPayment.paymentStatus}
                    </span>
                  </td>
                  <td className="price-cell">{currentPayment.paymentAmount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}