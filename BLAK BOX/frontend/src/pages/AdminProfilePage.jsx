import { useEffect, useState } from 'react';
import client from '../api/client'; // Usas el axios configurado
import './AdminProfilePage.css'; // Si quieres estilos

const AdminProfilePage = () => {
  const [admin, setAdmin] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  // Suponiendo que guardas el ID del admin en localStorage
  const adminId = localStorage.getItem('userId'); // o usa AuthContext si tienes uno

  useEffect(() => {
    if (!adminId) return;

    client.get(`/users/${adminId}`)
      .then(res => {
        setAdmin(res.data);
        setFormData({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          phoneNumber: res.data.phoneNumber,
        });
      })
      .catch(err => console.error('Error al obtener perfil:', err));
  }, [adminId]);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    client.put(`/users/${adminId}`, formData)
      .then(() => alert('Perfil actualizado correctamente'))
      .catch(() => alert('Error al actualizar el perfil'));
  };

  if (!admin) return <p>Cargando perfil...</p>;

  return (
    <div className="admin-profile">
      <h2>Perfil del Administrador</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input name="firstName" value={formData.firstName} onChange={handleChange} />
        <label>Apellido:</label>
        <input name="lastName" value={formData.lastName} onChange={handleChange} />
        <label>Email:</label>
        <input name="email" value={formData.email} onChange={handleChange} />
        <label>Teléfono:</label>
        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default AdminProfilePage;
