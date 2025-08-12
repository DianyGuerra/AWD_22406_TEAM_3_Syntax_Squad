import { useState, useEffect } from 'react';
import client from '../api/client';
import Sidebar from '../components/Sidebar';
import '../styles/AdminProductsPage.css';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editData, setEditData] = useState({});

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    try {
      await client.delete(`/products/${id}`);
      setProducts(products.filter(p => p._id !== id)); // Actualiza tabla sin recargar
      alert("Producto eliminado correctamente");
    } catch (error) {
      alert("Error al eliminar el producto");
    }
  };

  const handleEditChange = (e, field) => {
    setEditData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const startEditing = (product) => {
    setEditingProductId(product._id);
    setEditData(product);
  };

  const saveEdit = async (id) => {
    try {
      await client.put(`/products/${id}`, editData);
      setProducts(products.map(p => (p._id === id ? editData : p)));
      setEditingProductId(null);
      alert("Producto actualizado correctamente");
    } catch (error) {
      alert("Error al actualizar el producto");
    }
  };

  return (
    <div className="products-page-container">
      <Sidebar />
      <div className="products-content">
        <h1>Product Manager</h1>

        {/* Formulario para agregar producto */}
        <form className="product-form" onSubmit={handleSubmit}>
          <h2>Add New Product</h2>
          <label>Product Name</label>
          <input name="name" value={formData.name} onChange={handleChange} required />

          <label>Brand</label>
          <input name="brand" value={formData.brand} onChange={handleChange} required />

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

        {/* Tabla de productos */}
        <table className="products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                {editingProductId === p._id ? (
                  <>
                    <td><input value={editData.name} onChange={(e) => handleEditChange(e, 'name')} /></td>
                    <td><input value={editData.brand} onChange={(e) => handleEditChange(e, 'brand')} /></td>
                    <td><input value={editData.description} onChange={(e) => handleEditChange(e, 'description')} /></td>
                    <td><input type="number" value={editData.price} onChange={(e) => handleEditChange(e, 'price')} /></td>
                    <td><input type="number" value={editData.stock} onChange={(e) => handleEditChange(e, 'stock')} /></td>
                    <td>
                      <select value={editData.categoryId?._id || ''} onChange={(e) => handleEditChange(e, 'categoryId')}>
                        <option value="">Select</option>
                        {categories.map((cat, idx) => (
                          <option key={idx} value={cat._id}>{cat.categoryName}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button onClick={() => saveEdit(p._id)}><i className="fas fa-save"></i></button>
                      <button onClick={() => setEditingProductId(null)}><i className="fas fa-times"></i></button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{p.name}</td>
                    <td>{p.brand}</td>
                    <td>{p.description}</td>
                    <td>${p.price.toFixed(2)}</td>
                    <td>{p.stock}</td>
                    <td>{p.categoryId?.categoryName || 'Sin categoría'}</td>
                    <td>
                      <button onClick={() => startEditing(p)}><i className="fas fa-edit"></i></button>
                      <button onClick={() => handleDelete(p._id)}><i className="fas fa-trash-alt"></i></button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default AdminProductsPage;
