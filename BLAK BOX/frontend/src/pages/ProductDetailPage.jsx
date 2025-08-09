import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import  '../styles/styleDetailsProductPage.css';

import HeaderResponsiveUser from '../components/HeaderResponsiveUser';
import HeaderUser from '../components/HeaderUser';
import client from '../api/client'; 
import { decodeJwt } from '../utils/auth'; 

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [msg, setMsg] = useState('');
  const [userId, setUserId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    console.log('User ID:', decoded.id);
  }, [navigate]);

  useEffect(() => {
    client.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setNotFound(true));
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !userId) return;

    if (!window.confirm(`Do you want to add "${product.name}" to your cart?`)) return;

    try {
      const productRes = await client.get(`/products/${product._id}`);
      const currentStock = productRes.data.stock;

      if (currentStock <= 0) {
        setMsg("Sorry, this product is out of stock.");
        return;
      }

      const cartRes = await client.get(`/carts/users/${userId}`);
      let cartId;

      if (Array.isArray(cartRes.data) && cartRes.data.length > 0) {
        cartId = cartRes.data[0]._id;
      } else {
        const createRes = await client.post("/carts", { userId });
        cartId = createRes.data._id;
      }

      await client.post("/cartProducts", {
        cartId,
        productId: product._id,
        quantity: 1,
      });

      const updatedStock = currentStock - 1;
      await client.put(`/products/${product._id}/stock`, { stock: updatedStock });

      setProduct(prev => ({ ...prev, stock: updatedStock }));

      setMsg(`Added "${product.name}" to cart!`);
    } catch (error) {
      console.error(error);
      setMsg("Failed to add product to cart.");
    }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();

    if (!userId || !product) return;

    try {
      const res = await client.get(`/wishlists/users/${userId}`);
      let wishlistId;

      if (res.data && res.data._id) {
        wishlistId = res.data._id;
      } else {
        const createRes = await client.post("/wishlists", { userId });
        wishlistId = createRes.data._id;
      }

      await client.post("/wishlistProducts", {
        wishlistId,
        productId: product._id,
      });

      setMsg(`Added "${product.name}" to wishlist!`);
    } catch (err) {
      console.error(err);
      setMsg("Failed to add to wishlist.");
    }
  };

  if (notFound) {
    return (
      <div className="bg-purple-darker text-white min-vh-100 text-center p-5">
        <h2 className="text-danger">Product not found</h2>
        <Link to="/user/products" className="btn btn-outline-light mt-3">Back to Products</Link>
      </div>
    );
  }

  if (!product) {
    return <div className="text-white p-5">Loading...</div>;
  }

  return (
    <div className="product-detail-page">
      {isMobile ? <HeaderResponsiveUser /> : <HeaderUser />}
      <div className="layout" style={{ marginTop: isMobile ? "4.5rem" : "0" }}>
        <main className="main-content page-content container">
          <div className="container">
            <Link to="/user/products" className="back-link">
              ← Back to Products
            </Link>

            <div className="product-box">
              <div className="product-content">
                <h2 className="product-title">{product.name}</h2>
                <p>{product.description}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p><strong>Category:</strong> {product.category?.categoryName}</p>
                {product.category?.categoryDescription && (
                  <p><strong>Category Description:</strong> {product.category.categoryDescription}</p>
                )}
                <h4 className="product-price">${product.price.toFixed(2)}</h4>

                <div className="actions">
                  {product.stock <= 0 ? (
                    <button className="custom-btn btn-secondary small-btn" disabled>Out of Stock</button>
                  ) : (
                    <button className="custom-btn btn-accent small-btn" onClick={handleAddToCart}>
                      🛒 Add to Cart
                    </button>
                  )}

                  <form onSubmit={handleAddToWishlist}>
                    <button type="submit" className="custom-btn btn-outline-warning small-btn">
                      ⭐ Favorite
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {msg && (
              <div className="custom-alert">
                {msg}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductDetail;
