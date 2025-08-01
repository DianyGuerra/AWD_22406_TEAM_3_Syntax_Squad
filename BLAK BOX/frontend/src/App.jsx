// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Importa tus páginas
//import HomePage from './pages/HomePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProductsUserPage from './pages/ProductsUserPage';
import ProductDetail from './pages/ProductDetailPage';

function App() {
  return (
    <BrowserRouter>
      {/* Aquí iría tu Navbar, si ya lo tienes */}
      <Routes>
        {/*Rutas por parte de los clientes*/}
        <Route path="/productsUser" element={<ProductsUserPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/orders/history/:userId" element={<OrderHistoryPage />} />
        {/* otras rutas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
