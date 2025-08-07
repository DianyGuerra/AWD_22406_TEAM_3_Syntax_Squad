import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styleUser.css";
import HeaderUser from "./HeaderUser";
import HeaderResponsiveUser from "./HeaderResponsiveUser";
import client from "../api/client";
import { decodeJwt } from "../utils/auth"; 

const ProfileUserPage = () => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [profileMsg, setProfileMsg] = useState("");
  const [groupedWishlistItems, setGroupedWishlistItems] = useState(new Map());
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const decoded = decodeJwt(token);
    if (!decoded?.id) {
      navigate('/login');
      return;
    }

    setUserId(decoded.id);
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  const groupOrderProducts = (products) => {
    const grouped = {};

    products.forEach((product) => {
      const key = product.name;

      if (!grouped[key]) {
        grouped[key] = {
          ...product,
          quantity: product.quantity,
          totalPrice: product.price * product.quantity
        };
      } else {
        grouped[key].quantity += product.quantity;
        grouped[key].totalPrice += product.price * product.quantity;
      }
    });

    return Object.values(grouped);
  };

  const fetchProfileData = async () => {
    try {
      const userRes = await client.get(`/users/${userId}`);
      const wishlistRes = await client.get(`/wishlists/users/${userId}`);
      const ordersRes = await client.get(`/orders/user/${userId}`);

      console.log(userRes, wishlistRes, ordersRes);
      setUser(userRes.data);

      const enrichedOrders = await Promise.all(
        ordersRes.data.map(async (order) => {
          try {
            const prodRes = await client.get(`/orderProducts/${order._id}`);
            return {
              ...order,
              products: prodRes.data?.products || [],
            };
          } catch (error) {
            console.error(`Error fetching products for order ${order._id}:`, error);
            return {
              ...order,
              products: [],
            };
          }
        })
      );

      setOrders(enrichedOrders);

      const productFetchPromises = wishlistRes.data.map(async (wishlist) => {
        try {
          const response = await client.get(`/wishlistProducts/wishlist/${wishlist._id}`);
          return Array.isArray(response.data)
            ? response.data.filter(item => item?.productId)
            : [];
        } catch (err) {
          console.warn(`Error fetching wishlist ${wishlist._id}:`, err);
          return [];
        }
      });

      const allWishlistProductsArrays = await Promise.all(productFetchPromises);
      const allProducts = allWishlistProductsArrays.flat();

      const productIdToItems = new Map();
      allProducts.forEach((item) => {
        const productKey = item.productId?._id;
        if (productKey) {
          if (!productIdToItems.has(productKey)) {
            productIdToItems.set(productKey, []);
          }
          productIdToItems.get(productKey).push(item);
        }
      });

      const uniqueProducts = Array.from(productIdToItems.values()).map(items => items[0]);

      setWishlistProducts(uniqueProducts);
      setGroupedWishlistItems(productIdToItems);

    } catch (err) {
      console.error("Error loading profile:", err);
      setProfileMsg("There was an error loading your profile.");
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const items = groupedWishlistItems.get(productId);
      if (!items || items.length === 0) return;

      for (const item of items) {
        await client.delete(`/wishlistProducts/${item.wishlistId}/${productId}`);
        await client.delete(`/wishlists/${item.wishlistId}`);
      }

      await fetchProfileData(); 
    } catch (err) {
      console.error("Error removing item from all wishlists:", err);
      alert("Failed to remove item from wishlists.");
    }
  };

  if (!user) return <div className="text-white p-5">Loading profile...</div>;

  return (
    <>
      <HeaderResponsiveUser />
      <div className="d-flex flex-column flex-lg-row min-vh-100 bg-purple-darker text-white">
        <HeaderUser />
        <div className="container py-5">
          <h1 className="text-center text-accent">User Profile</h1>

          <div className="text-box bg-purple">
            <h5 className="card-title text-accent ms-3">Personal Information</h5>
            <p><strong className="text-accent">Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong className="text-accent">Email:</strong> {user.email}</p>
            <p><strong className="text-accent">Phone number:</strong> {user.phoneNumber}</p>
            <p><strong className="text-accent">Order History: </strong> 
              <Link to={`/orders/history`} style={{color: "white"}}>Order History</Link>
            </p>
          </div>

          <h2 className="text-center text-accent mt-4">Wish List</h2>
          <div className="table-responsive">
            <table className="wishlist-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {wishlistProducts.length > 0 ? (
                  wishlistProducts.map((item) => (
                    <tr key={item._id}>
                      <td>{item.productId?.name}</td>
                      <td>{item.productId?.brand}</td>
                      <td>${item.productId?.price?.toFixed(2)}</td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleRemoveFromWishlist(item.productId?._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">Your wish list is empty.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {profileMsg && (
              <div className="alert alert-info text-center mt-3">{profileMsg}</div>
            )}
          </div>

          <h2 className="text-center text-accent mt-4">Purchase History</h2>
          <div className="table-responsive">
            <table className="wishlist-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Products</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td>{order.status}</td>
                      <td>
                        {order.products.length > 0 ? (
                          <ul className="mb-0">
                            {groupOrderProducts(order.products).map((prod, idx) => (
                              <li key={idx}>
                                {prod.name} (x{prod.quantity}) - ${prod.totalPrice.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          "No product info"
                        )}
                      </td>
                      <td>${order.total.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No purchase history available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUserPage;
