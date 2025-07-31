// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Importa tus páginas
//import HomePage from './pages/HomePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProductsUserPage from './pages/ProductsUserPage';

function App() {
  return (
    <BrowserRouter>
      {/* Aquí iría tu Navbar, si ya lo tienes */}
      <Routes>
        <Route path="/productsUser" element={<ProductsUserPage />} />
        <Route path="/orders/history/:userId" element={<OrderHistoryPage />} />
        {/* otras rutas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
