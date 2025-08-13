import { useState, useEffect } from 'react';
import client from '../api/client';
import Sidebar from '../components/Sidebar';
import '../styles/AdminProductsPage.css';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lowStockIds, setLowStockIds] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    brand: '',
    discount: '0%',
    imageUrl: '' // Nuevo campo
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

  const fetchLowStock = async () => {
    try {
      const res = await client.get('/products/low-stock');
      const ids = Array.isArray(res.data) ? res.data.map(p => p._id || p.id) : [];
      setLowStockIds(ids);
    } catch (error) {
      console.error('Error fetching low stock:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchLowStock();
  }, []);

  const updateProductField = async (id, field, value) => {
    try {
      const updated = products.map(p =>
        p._id === id ? { ...p, [field]: value } : p
      );
      setProducts(updated);
      await client.put(`/products/${id}`, { [field]: value });
      alert(`Producto actualizado correctamente (${field})`);
      fetchLowStock();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error al actualizar el producto');
    }
  };

  const handleDiscountChange = (id, value) => {
    updateProductField(id, 'discount', value);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    try {
      await client.delete(`/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
      alert("Producto eliminado correctamente");
      fetchLowStock();
    } catch (error) {
      alert("Error al eliminar el producto");
    }
  };

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
        discount: '0%',
        imageUrl: ''
      });
      fetchProducts();
      fetchLowStock();
    } catch (error) {
      alert('Error al agregar el producto');
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

          <label>Image URL</label>
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
            required
          />

          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />

          <label>Price ($)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />

          <label>Stock</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />

          <label>Discount</label>
          <select name="discount" value={formData.discount} onChange={handleChange}>
            {['0%', '5%', '10%', '15%', '20%', '50%'].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

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
        <table className="products-table inline-edit">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Image URL</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Discount</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => {
              const isLowStock = lowStockIds.includes(p._id);
              return (
                <tr key={p._id} className={isLowStock ? 'low-stock-row' : ''}>
                  <td>
                    <img
                      src={p.imageUrl || 'https://via.placeholder.com/60'}
                      alt={p.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => updateProductField(p._id, 'name', e.target.innerText)}
                  >
                    {p.name}
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => updateProductField(p._id, 'brand', e.target.innerText)}
                  >
                    {p.brand}
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => updateProductField(p._id, 'imageUrl', e.target.innerText)}
                  >
                    {p.imageUrl}
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => updateProductField(p._id, 'description', e.target.innerText)}
                  >
                    {p.description}
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => updateProductField(p._id, 'price', parseFloat(e.target.innerText))}
                  >
                    {p.price.toFixed(2)}
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => updateProductField(p._id, 'stock', parseInt(e.target.innerText))}
                  >
                    {isLowStock ? (
                      <span className="low-stock-badge" title="Low stock!">
                        <i className="fas fa-exclamation-triangle"></i> {p.stock}
                      </span>
                    ) : (
                      p.stock
                    )}
                  </td>
                  <td>
                    <select
                      value={p.discount || '0%'}
                      onChange={e => handleDiscountChange(p._id, e.target.value)}
                      className="discount-select"
                    >
                      {['0%', '5%', '10%', '15%', '20%', '50%'].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={p.categoryId?._id || ''}
                      onChange={e => updateProductField(p._id, 'categoryId', e.target.value)}
                    >
                      <option value="">Select</option>
                      {categories.map((cat, idx) => (
                        <option key={idx} value={cat._id}>{cat.categoryName}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button className="action-btn edit" title="Edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="action-btn delete" title="Delete" onClick={() => handleDelete(p._id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default AdminProductsPage;
