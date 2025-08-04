// src/pages/AdminProfilePage.jsx
import Sidebar from '../components/Sidebar';

const AdminProfilePage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '220px', padding: '20px', flex: 1 }}>
        <h1>Perfil del Administrador</h1>
        {/* Tu contenido del perfil aquí */}
      </div>
    </div>
  );
};

export default AdminProfilePage;
