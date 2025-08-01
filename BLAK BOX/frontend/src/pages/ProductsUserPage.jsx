import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/styleUser.css";
import HeaderUser from "./HeaderUser";
import HeaderResponsiveUser from "./HeaderResponsiveUser";
import client from "../api/client";

const ProductsPage = () => {
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

  const userId = "685bb91a0eeff8b08e0e130b"; // Diana

  useEffect(() => {
    const fetchData = async () => {
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        client.get("/blakbox/categories"),
        client.get("/blakbox/products"),
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
  }, []);

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
      const res = await client.get(`/blakbox/products/price/${minPrice}/${maxPrice}`);
      setPriceFilteredProducts(res.data);
    } catch (err) {
      setErrorPriceFilter(err.message);
      setPriceFilteredProducts([]);
    } finally {
      setLoadingPriceFilter(false);
    }
  };

  const addToCart = async (productId, productName) => {
    if (!window.confirm(`Do you want to add "${productName}" to your cart?`)) return;

    try {
      let cartId = null;

      const cartRes = await client.get(`/blakbox/carts/users/${userId}`);
      if (cartRes.data && cartRes.data.length > 0) {
        cartId = cartRes.data[0]._id;
      } else {
        const createCartRes = await client.post("/blakbox/carts", { userId });
        cartId = createCartRes.data._id;
      }

      await client.post("/blakbox/cartProducts", {
        cartId,
        productId,
        quantity: 1
      });

      alert(`Added "${productName}" to cart!`);
    } catch (error) {
      console.error(error);
      alert("Failed to add product to cart.");
    }
  };

  const addToWishlist = async (productId, productName) => {
    try {
      let wishlistId = null;

      const res = await client.get(`/blakbox/wishlist/users/${userId}`);
      if (res.data && res.data.length > 0) {
        wishlistId = res.data[0]._id;
      } else {
        const createRes = await client.post("/blakbox/wishlists", { userId });
        wishlistId = createRes.data._id;
      }

      await client.post("/blakbox/wishlistProducts", {
        wishlistId,
        productId
      });

      alert(`Added "${productName}" to wishlist!`);
    } catch (err) {
      console.error(err);
      alert("Failed to add to wishlist.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <HeaderResponsiveUser />

    <div className="d-flex flex-column flex-lg-row min-vh-100">
      
      <HeaderUser />

      <div className="container py-5">
        <h1 className="text-center text-accent mb-4">Our Products</h1>

        <div className="mb-4">
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

            <div className="col-12 col-md-auto d-flex align-items-center">
              <input
                type="number"
                placeholder="Min price"
                className="form-control form-control-sm w-auto"
                style={{ maxWidth: "100px" }}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                min={0}
              />
              <input
                type="number"
                placeholder="Max price"
                className="form-control form-control-sm w-auto"
                style={{ maxWidth: "100px" }}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                min={0}
              />
              <button className="btn btn-accent" onClick={fetchProductsByPriceRange}>
                Filter by Price
              </button>

              <button className="btn btn-secondary ms-2 " style={{ maxWidth: "100px" }} onClick={() => {
                setMinPrice("");
                setMaxPrice("");
                setPriceFilteredProducts([]);
              }}>
                Clear Price Filter
              </button>
            </div>
          </div>
        </div>

        {loadingPriceFilter && <p>Loading products by price range...</p>}
        {errorPriceFilter && <p className="text-danger">Error: {errorPriceFilter}</p>}

        {(priceFilteredProducts.length > 0 ? priceFilteredProducts : filteredProducts).length > 0 ? (
          <div className={`row g-4 justify-content-center ${
              (priceFilteredProducts.length > 0 ? priceFilteredProducts : filteredProducts).length === 1 || (priceFilteredProducts.length > 0 ? priceFilteredProducts : filteredProducts).length === 2
                ? "row-cols-1 row-cols-md-2"
                : "row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4"
            }`}
          >
            {(priceFilteredProducts.length > 0 ? priceFilteredProducts : filteredProducts).map((p) => {
              const categoryName = p.categoryId?.categoryName || "Uncategorized";
              return (
                <div
                  key={p._id}
                  className="col product-card"
                  data-name={p.name.toLowerCase()}
                  data-category={categoryName}
                >
                  <div className="card bg-purple text-white h-100">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title text-accent">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                        <p className="text-warning small">Stock: {p.stock}</p>
                        <p><strong>${p.price.toFixed(2)}</strong></p>
                      </div>
                      <div className="mt-3 d-flex justify-content-between align-items-center">
                        <Link to={`/product/${p._id}`} className="btn btn-outline-light btn-sm">
                          View
                        </Link>
                        {p.stock <= 0 ? (
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            disabled
                          >
                            Out of Stock
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-accent btn-sm"
                            onClick={() => addToCart(p._id, p.name)}
                          >
                            Add Cart
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn btn-outline-warning btn-sm"
                          onClick={() => addToWishlist(p._id, p.name)}
                        >
                          ⭐ Favorite
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No products match your filters.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default ProductsPage;