import { useState, useEffect } from 'react';
import client from '../api/client';
import Sidebar from '../components/Sidebar';
import '../styles/AdminProductsPage.css'; 

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    brand: '',
    discount: '0%'
  });

  const fetchProducts = async () => {
    try {
      const res = await client.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await client.get('/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.post('/products', formData);
      alert('Producto agregado exitosamente');
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        categoryId: '',
        brand: '',
        discount: '0%'
      });
      fetchProducts();
    } catch (error) {
      alert('Error al agregar el producto');
    }
  };

  return (
    <div className="products-page-container">
      <Sidebar />
      <div className="products-content">
        <h1>Product Manager</h1>

        <form className="product-form" onSubmit={handleSubmit}>
          <h2>Add New Product</h2>
          <label>Product Name</label>
          <input name="name" value={formData.name} onChange={handleChange} required />

          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />

          <label>Price ($)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />

          <label>Stock</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />

          <label>Category</label>
          <select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
            <option value="">Select a category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat._id}>{cat.categoryName}</option>
            ))}
          </select>

          <button type="submit">Add Product</button>
        </form>

        <table className="products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Descripción</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>{p.stock}</td>
                <td>{p.categoryId?.categoryName || 'Sin categoría'}</td>
                <td>
                  <button className="update-btn">Update</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default AdminProductsPage;
