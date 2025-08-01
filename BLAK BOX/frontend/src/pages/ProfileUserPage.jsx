import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styleUser.css";
import HeaderUser from "./HeaderUser";
import HeaderResponsiveUser from "./HeaderResponsiveUser";
import client from "../api/client";

const ProfileUserPage = () => {
  const [user, setUser] = useState(null);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [profileMsg, setProfileMsg] = useState("");

  const userId = "685bb91a0eeff8b08e0e130b"; // Diana

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userRes = await client.get(`/blakbox/users/${userId}`);
        const wishlistRes = await client.get(`/blakbox/wishlists/users/${userId}`);
        const ordersRes = await client.get(`/blakbox/history/user/${userId}`);

        setUser(userRes.data);
        setWishlistProducts(wishlistRes.data[0]?.products || []);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error("Error loading profile:", err);
        setProfileMsg("There was an error loading your profile.");
      }
    };

    fetchProfileData();
  }, [userId]);

  const handleRemoveFromWishlist = async (wishlistProductId) => {
    try {
      await client.delete(`/blakbox/wishlistProducts/${wishlistProductId}`);
      setWishlistProducts(prev => prev.filter(item => item._id !== wishlistProductId));
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item from wishlist.");
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
          </div>

          <h2 className="text-center text-accent mt-4">Wish List</h2>
          <div className="table-responsive">
            <table className="wishlist-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {wishlistProducts.length > 0 ? (
                  wishlistProducts.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleRemoveFromWishlist(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">Your wish list is empty.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {profileMsg && (
              <div className="alert alert-info text-center mt-3">{profileMsg}</div>
            )}
          </div>
          <Link to={`/orders/history/${userId}`} lassName="text-accent mb-4 d-inline-block text-decoration-none">
            Order History
          </Link>
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
                        <ul className="mb-0">
                          {order.products.map((prod, idx) => (
                            <li key={idx}>
                              {prod.productName} (x{prod.quantity}) - ${prod.price.toFixed(2)}
                            </li>
                          ))}
                        </ul>
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
