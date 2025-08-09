import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styleCartPage.css";
import client from "../api/client";
import HeaderUser from "../components/HeaderUser";
import HeaderResponsiveUser from "../components/HeaderResponsiveUser";
import { decodeJwt } from "../utils/auth";

const CartUserPage = () => {
  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderMsg, setOrderMsg] = useState("");
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const decoded = decodeJwt(token);
    if (!decoded?.id) {
      navigate("/login");
      return;
    }

    setUserId(decoded.id);
  }, [navigate]);

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  const groupCartItems = (items) => {
    const grouped = {};

    items.forEach(item => {
      const key = item.productId._id;
      if (grouped[key]) {
        grouped[key].quantity += item.quantity;
        grouped[key].cartProductIds.push(item._id);
      } else {
        grouped[key] = {
          ...item,
          quantity: item.quantity,
          cartProductIds: [item._id],
        };
      }
    });

    return Object.values(grouped);
  };

  const fetchCart = async () => {
    try {
      const res = await client.get(`/carts/users/${userId}`);
      const carts = res.data;

      if (!carts || carts.length === 0) {
        setCartItems([]);
        setCartId(null);
        setTotal(0);
        setLoading(false);
        return;
      }

      let allCartItems = [];
      let totalAmount = 0;

      for (const cart of carts) {
        try {
          const res = await client.get(`/cartProducts/${cart._id}`);
          const data = res.data;

          if (Array.isArray(data) && data.length > 0) {
            const itemsWithCartId = data.map(item => ({ ...item, cartId: cart._id }));
            allCartItems = allCartItems.concat(itemsWithCartId);

            const cartTotal = data.reduce((sum, item) => {
              return sum + item.productId.price * item.quantity;
            }, 0);

            totalAmount += cartTotal;
          }
        } catch (err) {
          console.log(`Error loading cart ${cart._id}:`, err.response?.data || err.message);
        }
      }

      const groupedItems = groupCartItems(allCartItems);

      setCartItems(groupedItems);
      setTotal(totalAmount);
      setCartId(carts.map(c => c._id));
    } catch (err) {
      console.error(err);
      setError("Failed to load carts.");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId, quantity, cartid) => {
    if (!window.confirm("Are you sure you want to remove this item?")) return;

    try {
      await client.delete(`/cartProducts/${cartid}/${productId}`);

      const productStockRes = await client.get(`/products/${productId}`);
      const currentStock = productStockRes.data.stock;
      const newStock = currentStock + quantity;

      await client.put(`/products/${productId}/stock`, { stock: newStock });

      fetchCart();
    } catch (err) {
      console.error(err);
      alert("Error removing item from cart.");
    }
  };

  const handleCheckout = async (e, total) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    try {
      const res = await client.post(`/carts/checkout`, { cartId });
      console.log(res.data);
      setOrderMsg(res.data.message || "Order placed successfully!");

      const orderId = res.data.orderId;
      const transactionId = paymentMethod + userId + orderId + total;
      const paymentRes = await client.post(`/payments`, {userId, orderId, total, paymentMethod, transactionId});
      console.log(paymentRes);
      await Promise.all(cartId.map(id => client.delete(`/carts/${id}`)));

      setCartItems([]);
      setTotal(0);
      fetchCart();
    } catch (err) {
      console.error(err);
      setError("Checkout failed.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-center mt-3 text-danger">Error: {error}</div>;

  return (
    <>
      <div className="cart-user-page">
      {isMobile ? <HeaderResponsiveUser /> : <HeaderUser />}

      <div
        className="d-flex flex-column flex-lg-row min-vh-100"
        style={{ marginTop: isMobile ? "4.5rem" : "0" }}
      >
        <div className="page-content container py-4">
          <h1 className="text-center mb-4">Your Cart</h1>

          {cartItems.length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => {
                const { productId, quantity } = item;
                const subtotal = productId.price * quantity;

                return (
                  <div key={productId._id} className="card mb-3">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h5>{productId.name}</h5>
                        <p className="mb-1">Price: ${productId.price.toFixed(2)} x {quantity}</p>
                        <p className="mb-0 fw-bold">Subtotal: ${subtotal.toFixed(2)}</p>
                      </div>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeItem(productId._id, 1, item.cartId)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 mt-4">
                <h4>Total: ${total.toFixed(2)}</h4>
                <form
                  onSubmit={(e) => handleCheckout(e, total.toFixed(2))}
                  className="d-flex flex-column flex-md-row align-items-center gap-2"
                >
                  <select
                    className="form-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select Payment Method</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                  <button type="submit" className="btn btn-accent">
                    Proceed to Payment
                  </button>
                </form>
              </div>
            </>
          )}

          {orderMsg && (
            <div className="alert alert-success text-center mt-4">
              {orderMsg}
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default CartUserPage;
