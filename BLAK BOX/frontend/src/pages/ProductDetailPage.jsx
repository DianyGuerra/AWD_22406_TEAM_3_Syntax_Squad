import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/styleUser.css';

import HeaderResponsiveUser from './HeaderResponsiveUser';
import HeaderUser from './HeaderUser';
import client from '../api/client'; 

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [msg, setMsg] = useState('');

  const userId = "685bb91a0eeff8b08e0e130b"; // Diana

  useEffect(() => {
    client.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setNotFound(true));
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    if (!window.confirm(`Do you want to add "${product.name}" to your cart?`)) return;

    try {
      const productRes = await client.get(`/products/${product.id}`);
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
        productId: product.id,
        quantity: 1,
      });

      const updatedStock = currentStock - 1;
      await client.put(`/products/${product.id}/stock`, { stock: updatedStock });

      setProduct(prev => ({ ...prev, stock: updatedStock }));

      setMsg(`Added "${product.name}" to cart!`);
    } catch (error) {
      console.error(error);
      setMsg("Failed to add product to cart.");
    }
  };


  const handleAddToWishlist = async (e) => {
    e.preventDefault();

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
        productId: product.id,
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
        <Link to="/products" className="btn btn-outline-light mt-3">Back to Products</Link>
      </div>
    );
  }

  if (!product) {
    return <div className="text-white p-5">Loading...</div>;
  }

  return (
    <div className="bg-purple-darker text-white min-vh-100">
      <HeaderResponsiveUser />

      <div className="d-flex flex-column flex-lg-row min-vh-100">
        <HeaderUser />

        <main className="flex-fill p-4">
          <div className="container">
            <Link to="/productsUser" className="text-accent mb-4 d-inline-block text-decoration-none">
              ← Back to Products
            </Link>

            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh', minWidth: '160vh' }}>
              <div className="row">
                <div className="text-center d-flex flex-column align-items-center">
                  <h2 className="text-accent">{product.name}</h2>
                  <p>{product.description}</p>
                  <p><strong>Stock:</strong> {product.stock}</p>
                  <p><strong>Category:</strong> {product.category?.categoryName}</p>
                  {product.category?.categoryDescription && (
                    <p><strong>Category Description:</strong> {product.category.categoryDescription}</p>
                  )}
                  <h4>${product.price.toFixed(2)}</h4><br />

                  <div className="d-flex mt-3 gap-2">
                    {product.stock <= 0 ? (
                      <button className="btn btn-secondary btn-sm" disabled>Out of Stock</button>
                    ) : (
                      <button className="btn btn-accent btn-sm" onClick={handleAddToCart}>
                        🛒Add to Cart
                      </button>
                    )}

                    <form onSubmit={handleAddToWishlist}>
                      <button type="submit" className="btn btn-outline-warning">
                        ⭐ Favorite
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {msg && (
              <div className="alert alert-info text-center mt-4">
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
