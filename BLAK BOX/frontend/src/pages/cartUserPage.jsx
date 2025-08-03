import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/styleUser.css";
import client from "../api/client";
import HeaderUser from "./HeaderUser";
import HeaderResponsiveUser from "./HeaderResponsiveUser";

const CartUserPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderMsg, setOrderMsg] = useState("");
  const [error, setError] = useState(null);

  const userId = "685bb91a0eeff8b08e0e130b"; // Diana

  useEffect(() => {
    fetchCart();
  }, []);

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
      const res = await client.get(`/blakbox/carts/users/${userId}`);
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
            const res = await client.get(`/blakbox/cartProducts/${cart._id}`);
            const data = res.data;

            if (Array.isArray(data) && data.length > 0) {
            const itemsWithCartId = data.map(item => ({ ...item, cartId: cart._id }));
            allCartItems = allCartItems.concat(itemsWithCartId);

            const cartTotal = data.reduce((sum, item) => {
                return sum + item.productId.price * item.quantity;
            }, 0);

            totalAmount += cartTotal;
            } else {
            console.log(`Cart ${cart._id} is empty or has invalid data.`);
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
      await client.delete(`/blakbox/cartProducts/${cartid}/${productId}`);

      const productStockRes = await client.get(`/blakbox/products/${productId}`);
      const currentStock = productStockRes.data.stock;
      const newStock = currentStock + quantity;

      await client.put(`/blakbox/products/${productId}/stock`, { stock: newStock });

      fetchCart();
    } catch (err) {
      console.error(err);
      alert("Error removing item from cart.");
    }
  };


  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }

    try {
        const res = await client.post(`/blakbox/carts/checkout`, { cartId });
        setOrderMsg(res.data.message || "Order placed successfully!");

        await Promise.all(
          cartId.map(id => client.delete(`/blakbox/carts/${id}`))
        );
        
        setCartItems([]);
        setTotal(0);
        fetchCart(); 
    } catch (err) {
        console.error(err);
        setError("Checkout failed.");
    }
    };


  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger text-center mt-3">Error: {error}</div>;

  return (
    <>
      <HeaderResponsiveUser />
      <div className="d-flex flex-column flex-lg-row min-vh-100">
        <HeaderUser />
        <div className="container py-5">
          <h1 className="text-center text-accent mb-4">Your Cart</h1>

          {cartItems.length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => {
                const {productId, quantity } = item;
                const subtotal = productId.price * quantity;

                return (
                  <div key={productId._id} className="card bg-purple text-white mb-3">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="card-title">{productId.name}</h5>
                        <p className="card-text">Price: ${productId.price.toFixed(2)} x {quantity}</p>
                        <p className="card-text">Subtotal: ${subtotal.toFixed(2)}</p>
                      </div>
                      <button className="btn btn-danger btn-sm" onClick={() => removeItem(productId._id, 1, item.cartId)}>
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="d-flex justify-content-between align-items-center flex-column flex-md-row gap-3 mt-4">
                <h4>Total: ${total.toFixed(2)}</h4>
                <form onSubmit={handleCheckout} className="d-flex flex-column flex-md-row align-items-center gap-2">
                  <select
                    className="form-select bg-dark text-white border-secondary"
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
                  <button type="submit" className="btn btn-accent">Proceed to Payment</button>
                </form>
              </div>
            </>
          )}

          {orderMsg && (
            <div className="alert alert-info text-center mt-4">
              {orderMsg}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartUserPage;
