import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/styleDetailsProductPage.css';

import HeaderResponsiveUser from '../components/HeaderResponsiveUser';
import HeaderUser from '../components/HeaderUser';
import client from '../api/client'; 
import { decodeJwt } from '../utils/auth'; 

const UNSPLASH_ACCESS_KEY = 'rQDRXnMfSfpBZukO6vyE24tEioc7CItd5kkoR2ZooMs'; 

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [averageRating, setAverageRating] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [hasDiscount, setHasDiscount] = useState(null);

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    console.log("Product received from API:", product);
    if (product?.ratings) {
      console.log("Ratings array:", product.ratings);
    }
  }, [product]);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const decoded = decodeJwt(token);
    if (!decoded?.id) return navigate('/login');
    setUserId(decoded.id);
  }, [navigate]);

  useEffect(() => {
    client.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setNotFound(true));
  }, [id]);

  useEffect(() => {
    client.get(`/products/${id}/average-rating`)
      .then(res => setAverageRating(res.data.averageRating))
      .catch(() => setAverageRating(null));
  }, [id]);

  useEffect(() => {
    client.get(`/products/similar/${id}`)
      .then(res => setSimilarProducts(res.data))
      .catch(() => setSimilarProducts([]));
  }, [id]);

  useEffect(() => {
    client.get("/products/discounted")
      .then(res => {
        const found = res.data.find(p => p._id === id || p.id === id);
        setHasDiscount(found ? found.discount : null);
      })
      .catch(() => setHasDiscount(null));
  }, [id]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const query = product?.name || product?.category?.categoryName || "product";
        if (!query) return;

        const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`);
        const data = await res.json();

        if (data.results && data.results.length > 0) {
          setImageUrl(data.results[0].urls.small);
        } else {
          setImageUrl(null);
        }
      } catch (error) {
        console.error("Error fetching image from Unsplash:", error);
        setImageUrl(null);
      }
    };

    fetchImage();
  }, [product]);

  const handleAddToCart = async () => {
    if (!product || !userId) return;
    if (!window.confirm(`Do you want to add "${product.name}" to your cart?`)) return;

    try {
      const productRes = await client.get(`/products/${product.id}`);
      const currentStock = productRes.data.stock;
      if (currentStock <= 0) {
        alert("Sorry, this product is out of stock.");
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
      await client.post("/cartProducts", { cartId, productId: product.id, quantity: 1 });
      const updatedStock = currentStock - 1;
      await client.put(`/products/${product.id}/stock`, { stock: updatedStock });
      setProduct(prev => ({ ...prev, stock: updatedStock }));
      alert(`Added "${product.name}" to cart!`);
    } catch (error) {
      console.error(error);
      alert("Failed to add product to cart.");
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
      await client.post("/wishlistProducts", { wishlistId, productId: product.id });
      alert(`Added "${product.name}" to wishlist!`);
    } catch (err) {
      console.error(err);
      alert("Failed to add to wishlist.");
    }
  };

  const submitRating = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("You must be logged in to submit a review.");
      return;
    }
    try {
      if (!rating || !comment) {
        alert("If you want to leave a rating or comment, both fields are required.");
      } else {
        await client.post(`/products/${id}/rating`, { rating, comment });
        alert("Thanks for your review!");
        setRating(5);
        setComment("");
      }
    } catch (err) {
      alert("Failed to submit review.");
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

  if (!product) return <div className="text-white p-5">Loading...</div>;

  return (
    <div className="product-detail-page full-height">
      {isMobile ? <HeaderResponsiveUser /> : <HeaderUser />}
      <div className="layout" style={{ marginTop: isMobile ? "4.5rem" : "0" }}>
        <main className="main-content page-content container">
          <Link to="/user/products" className="back-link">← Back to Products</Link>

          {/* Image + Details */}
          <div className="product-info-container">
            {imageUrl && (
              <div className="product-image-card card my-3">
                <img src={imageUrl} alt={product.name} />
              </div>
            )}

            <section className="product-details card p-4 my-3 bg-dark rounded text-white">
              <h3>Details</h3>
              {product?.discount && product.discount !== "0%" && (
                <p><span className="badge bg-warning">Discount: {product.discount}</span></p>
              )}
              <p><strong>Name:</strong> {product.name}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Category:</strong> {product.category?.categoryName}</p>
              {product.category?.categoryDescription && (
                <p><strong>Category Description:</strong> {product.category.categoryDescription}</p>
              )}
              {averageRating !== null && (
                <p><strong>Rating:</strong> ⭐ {averageRating.toFixed(1)} / 5</p>
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
            </section>
          </div>

          {/* Technical Features */}
          {(product?.features?.length ?? 0) > 0 && (
            <section className="card p-4 my-3 bg-dark rounded text-white">
              <h3>Technical Features</h3>
              <ul>
                {product.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Review Form + Reviews List */}
          <section className="card p-4 my-3 bg-dark rounded text-white">
            <h3>Leave Your Review</h3>
            <div className="d-flex flex-column flex-lg-row gap-4">
              {/* Left: Review Form */}
              <form 
                onSubmit={submitRating} 
                className="d-flex flex-column align-items-start gap" 
                style={{ flex: 1 }}
              >
                <label htmlFor="rating">Rating:</label>
                <select
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="form-select mb-2"
                  style={{ maxWidth: "100px" }}
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
                <label htmlFor="comment">Comment:</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Leave a comment..."
                  className="form-control mb-2"
                  rows={3}
                  style={{ maxWidth: "400px", width: "100%" }}
                />
                <button 
                  type="submit" 
                  className="custom-btn btn-accent small-btn" 
                  style={{ maxWidth: "150px" }}
                >
                  Submit Review
                </button>
              </form>

              {/* Right: Reviews List */}
              <div style={{ flex: 1 }}>
                <h5>Other Users' Reviews</h5>
                {(product?.ratings?.length ?? 0) > 0 ? (
                  product.ratings.map(r => (
                    <div key={r._id} className="border-bottom pb-2 mb-2">
                      <strong>⭐ {r.rating}</strong>
                      <p className="mb-1">{r.comment}</p>
                      <small className="text-muted">
                        {r.date ? new Date(r.date).toLocaleDateString() : ""}
                      </small>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            </div>
          </section>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <section className="card p-4 my-3 bg-dark rounded text-white">
              <h3>Similar Products</h3>
              <div className="row gap">
                {similarProducts.map(p => (
                  <div key={p._id || p.id} className="col-12 col-md-4">
                    <div className="card bg-secondary text-white mb-3 p-3 rounded">
                      <h6>{p.name}</h6>
                      <p>${p.price.toFixed(2)}</p>
                      <Link to={`/product/${p._id || p.id}`} className="btn btn-outline-light btn-sm">
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductDetail;
