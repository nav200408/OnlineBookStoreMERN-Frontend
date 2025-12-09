import { useState, useEffect } from "react";
import { Container, Card, Table, Button, Alert, Form } from "react-bootstrap";
import coverIcon from "../../assets/staticImage/cover-page.jpg";
import {
  showMyCart,
  removeItemFormCart,
  editCartItem,
} from "../../service/cartAPI";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup";
import PaymentForm from "../Payment/PaymentFormComponent";
import { getToken } from "../../utils/auth";

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editQuantity, setEditQuantity] = useState(1);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await showMyCart(token);
        if (response.status === 200) {
          setCartItems(response.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Failed to fetch cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const handleRemoveItem = async (cartItemId) => {
    try {
      const token = getToken();
      console.log(token);
      const response = await removeItemFormCart(cartItemId, token);
      if (response.status == 200) {
        setCartItems(
          cartItems.filter((item) => item.cartId !== cartItemId)
        );
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCheckoutItem = (item) => {
    setSelectedBook({
      id: item.book._id,
      title: item.book.bookTitle,
      price: item.book.price,
      quantity: editQuantity,
    });
    setShowPaymentPopup(true);
  };
  const handlePaymentCancel = () => {
    setShowPaymentPopup(false);
  };
  const startEditing = (item) => {
    setEditingId(item.cartId);
    console.log(item);
    setEditQuantity(item.quantity);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditQuantity(1);
    setError(null);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setEditQuantity(value);
    }
  };

  const saveEdit = async (cartItemId) => {
    try {
      const token = getToken();
      const response = await editCartItem(cartItemId, token, editQuantity);
      if (response.status=== 200) {
        setCartItems(
          cartItems.map((item) =>
            item.cartId === cartItemId
              ? {
                  ...item,
                  quantity: editQuantity,
                  totalPrice: item.book.price * editQuantity,
                }
              : item
          )
        );
        setEditingId(null);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to update quantity");
    }
  };

  if (loading) {
    return (
      <div className="container cart-container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container cart-container">
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-container">
      <h2 className="cart-title" style={{ fontFamily: "Sans serif" }}>
        My Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="card empty-cart-card shadow-sm">
          <div className="card-body text-center">
            <h5>Your cart is empty</h5>
            <p className="text-muted">Start adding books to your cart!</p>
            <a href="/" className="btn btn-primary">
              Shop Now
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table cart-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Book Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.cartId} data-label="Cart Item">
                        <td className="book-image" data-label="Image">
                          <img
                            className="book-img img-fluid"
                            src={`http://localhost:8080/stream/api/image?filename=${item.book.bookImage}`}
                            alt={item.book.bookTitle}
                          />
                        </td>
                        <td
                          style={{ fontWeight: "bold" }}
                          className="book-title3 align-middle1"
                          data-label="Title: "
                        >
                          {item.book.bookTitle}
                        </td>
                        <td
                          className="price-text align-middle"
                          data-label="Price: "
                        >
                          ${item.book.price.toFixed(2)}
                        </td>
                        <td
                          className="quantity-text align-middle"
                          data-label="Quantity: "
                        >
                          {editingId === item.cartId ? (
                            <Form.Control
                              type="number"
                              min="1"
                              value={editQuantity}
                              onChange={handleQuantityChange}
                              style={{ width: "70px", margin: "0 auto" }}
                            />
                          ) : (
                            item.quantity
                          )}
                        </td>
                        <td
                          className="total-text align-middle"
                          data-label="Total: "
                          style={{ color: "#f16325" }}
                        >
                          $
                          {(
                            item.book.price *
                            (editingId === item.cartId
                              ? editQuantity
                              : item.quantity)
                          ).toFixed(2)}
                        </td>
                        <td
                          className="action-buttons1 align-middle"
                          // data-label="Actions"
                          style={{ color: "#555555" }}
                        >
                          {editingId === item.cartId ? (
                            <>
                              <Button
                                variant="success"
                                size="sm"
                                className="me-2"
                                onClick={() => saveEdit(item.cartId)}
                              >
                                Save
                              </Button>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={cancelEditing}
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => startEditing(item)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                className="me-2"
                                onClick={() =>
                                  handleRemoveItem(item.cartId)
                                }
                              >
                                Remove
                              </Button>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleCheckoutItem(item)}
                              >
                                Checkout
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <a href="/books" className="btn btn-outline-secondary">
              Continue Shopping
            </a>
          </div>
        </>
      )}
      {showPaymentPopup && selectedBook && (
        <Popup isOpen={showPaymentPopup} onClose={handlePaymentCancel}>
          <PaymentForm
            onCancel={handlePaymentCancel}
            bookDetails={selectedBook}
          />
        </Popup>
      )}
    </div>
  );
};
export default MyCart;
