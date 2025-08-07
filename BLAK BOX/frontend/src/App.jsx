import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PublicLayout     from './layouts/PublicLayout';
import LoginPage        from './pages/LoginPage';
import SignUpPage       from './pages/SignUpPage';
import HomePage         from './pages/HomePage';

import HomeUserPage     from './pages/HomeUserPage';
import ProductsUserPage from './pages/ProductsUserPage';
import ProductDetail    from './pages/ProductDetailPage';
import CartUserPage     from './pages/cartUserPage';
import ProfileUserPage  from './pages/ProfileUserPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import AuthSuccessPage  from './pages/AuthSuccessPage';
import AdminProfilePage from './pages/AdminProfilePage';
import AdminProductsPage from './pages/AdminProductsPage';

export default function App() {
  return (
    
    <Routes>
      {/* Rutas públicas con PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/"          element={<HomePage />} />
        <Route path="/about"     element={<HomePage />} />
        <Route path="/store"     element={<HomePage />} />
        <Route path="/contact"   element={<HomePage />} />
        <Route path="/login"     element={<LoginPage />} />
        <Route path="/signup"    element={<SignUpPage />} />
      </Route>

      <Route path="/auth-success" element={<AuthSuccessPage />} />

      <Route path="/admin/profile"          element={<AdminProfilePage />} />
      <Route path="/admin/products" element={<AdminProductsPage />} />
      <Route path="/user/home"               element={<HomeUserPage />} />
      <Route path="/user/products"           element={<ProductsUserPage />} />
      <Route path="/product/:id"            element={<ProductDetail />} />
      <Route path="/user/cart"               element={<CartUserPage />} />
      <Route path="/user/profile"            element={<ProfileUserPage />} />
      <Route path="/orders/history" element={<OrderHistoryPage />} />

    </Routes>
  );
}
