import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { decodeJwt } from "../utils/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../styles/styleUser.css";
import HeaderUser from "../components/HeaderUser";
import HeaderResponsiveUser from "../components/HeaderResponsiveUser";
import client from "../api/client";

const ProductsUserPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceFilteredProducts, setPriceFilteredProducts] = useState([]);
  const [loadingPriceFilter, setLoadingPriceFilter] = useState(false);
  const [errorPriceFilter, setErrorPriceFilter] = useState(null);
  const [userId, setUserId] = useState(null);
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

    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          client.get("/categories"),
          client.get("/products"),
        ]);
        setCategories(categoriesRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);


  const filteredProducts = products.filter((product) => {
    const categoryName = product.categoryId?.categoryName || "";
    const matchesCategory = selectedCategory === "all" || categoryName === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const fetchProductsByPriceRange = async () => {
    if (minPrice === "" || maxPrice === "") {
      alert("Please enter both min and max price.");
      return;
    }
    if (Number(minPrice) > Number(maxPrice)) {
      alert("Min price should be less or equal to max price.");
      return;
    }
    setLoadingPriceFilter(true);
    setErrorPriceFilter(null);

    try {
      const res = await client.get(`/products/price/${minPrice}/${maxPrice}`);
      setPriceFilteredProducts(res.data);
    } catch (err) {
      setErrorPriceFilter(err.message);
      setPriceFilteredProducts([]);
    } finally {
      setLoadingPriceFilter(false);
    }
  };

  const addToCart = async (productId, productName) => {
    console.log(userId, productId, productName);
    if (!window.confirm(`Do you want to add "${productName}" to your cart?`)) return;

    try {
      const productRes = await client.get(`/products/${productId}`);
      const currentStock = productRes.data.stock;

      if (currentStock <= 0) {
        alert("Sorry, this product is out of stock.");
        return;
      }

      let cartId;
      const cartRes = await client.get(`/carts/users/${userId}`);
      if (Array.isArray(cartRes.data) && cartRes.data.length > 0) {
        cartId = cartRes.data[0]._id;
      } else {
        const createCartRes = await client.post("/carts", { userId });
        console.log(`CartRes: "${createCartRes}"`);
        cartId = createCartRes.data._id;
      }

      await client.post("/cartProducts", {
        cartId,
        productId,
        quantity: 1,
      });

      const updatedStock = currentStock - 1;
      await client.put(`/products/${productId}/stock`, { stock: updatedStock });

      const updatedProducts = products.map(p =>
        p._id === productId ? { ...p, stock: updatedStock } : p
      );
      setProducts(updatedProducts);

      alert(`Added "${productName}" to cart!`);
    } catch (error) {
      console.error(error);
      alert("Failed to add product to cart.");
    }
  };

  const addToWishlist = async (productId, productName) => {
    console.log(userId, productId, productName);
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
        productId,
      });

      alert(`Added "${productName}" to wishlist!`);
    } catch (err) {
      console.error(err);
      alert("Failed to add to wishlist.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const displayedProducts = priceFilteredProducts.length > 0 ? priceFilteredProducts : filteredProducts;

  return (
    <>
      {isMobile ? <HeaderResponsiveUser /> : <HeaderUser />}

    <div style={{ marginTop: isMobile ? "4.5rem" : "0" }}>
        <div className="page-content container">
          <h1 className="text-center mb-4 fw-bold text-accent">Our Products</h1>

          {/* FILTROS DENTRO DE CARD */}
          <div className="card mb-4 shadow-sm p-3 border-0" style={{ borderRadius: '1.2rem', background: "#1a1026", color: "#fff" }}>
            <div className="row g-2 align-items-center justify-content-center">
              <div className="col-12 col-md-auto d-flex align-items-center">
                <label htmlFor="searchInput" className="me-2 mb-0">Search:</label>
                <input
                  type="text"
                  id="searchInput"
                  className="form-control"
                  placeholder="Search products by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ minWidth: "180px" }}
                />
              </div>
              <div className="col-12 col-md-auto">
                <select
                  id="categorySelect"
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.categoryName}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-auto d-flex align-items-center padding-2">
                <input
                  type="number"
                  placeholder="Min price"
                  className="form-control form-control-sm w-auto"
                  style={{ maxWidth: "100px", margin: "0 0.5rem"}}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  min={0}
                />
                <input
                  type="number"
                  placeholder="Max price"
                  className="form-control form-control-sm w-auto"
                  style={{ maxWidth: "100px", margin: "0 0.5rem"}}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  min={0}
                />
                <button className="btn btn-accent ms-2" onClick={fetchProductsByPriceRange}>
                  <i className="bi bi-funnel"></i> Filter by Price
                </button>
                <button
                  className="btn btn-secondary ms-2"
                  style={{ maxWidth: "100px" }}
                  onClick={() => {
                    setMinPrice("");
                    setMaxPrice("");
                    setPriceFilteredProducts([]);
                  }}
                >
                  <i className="bi bi-x-circle"></i> Clear
                </button>
              </div>
            </div>
          </div>

          {loadingPriceFilter && <p>Loading products by price range...</p>}
          {errorPriceFilter && <p className="text-danger">Error: {errorPriceFilter}</p>}

          {displayedProducts.length > 0 ? (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {displayedProducts.map((p) => {
                const categoryName = p.categoryId?.categoryName || "Uncategorized";
                return (
                  <div key={p._id} className="col product-card" data-name={p.name.toLowerCase()} data-category={categoryName}>
                    <div className="card bg-purple text-white h-100">
                      <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                          <h5 className="card-title text-accent">{p.name}</h5>
                          <p className="card-text">{p.description}</p>
                          <div className="mb-2">
                            <span className="badge bg-secondary">{categoryName}</span>
                            {p.stock > 0 ? (
                              <span className="badge bg-success ms-2">Stock: {p.stock}</span>
                            ) : (
                              <span className="badge bg-danger ms-2">Out of stock</span>
                            )}
                          </div>
                          <p className="h5 mt-2">
                            <span className="badge rounded-pill bg-accent">${p.price.toFixed(2)}</span>
                          </p>
                        </div>
                        <div className="mt-3 d-flex justify-content-between align-items-center gap-2">
                          <Link to={`/product/${p._id}`} className="btn btn-outline-light btn-sm" title="View">
                            <i className="bi bi-eye"></i>
                          </Link>
                          {p.stock <= 0 ? (
                            <button type="button" className="btn btn-secondary btn-sm" disabled>
                              <i className="bi bi-x-circle"></i>
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-accent btn-sm"
                              onClick={() => addToCart(p._id, p.name)}
                              title="Add to cart"
                            >
                              <i className="bi bi-cart-plus"></i>
                            </button>
                          )}
                          <button
                            type="button"
                            className="btn btn-outline-warning btn-sm"
                            onClick={() => addToWishlist(p._id, p.name)}
                            title="Add to wishlist"
                          >
                            <i className="bi bi-star"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-muted mt-4">No products found.</p>
          )}
        </div>
        </div>
    </>
  );
};

export default ProductsUserPage;
