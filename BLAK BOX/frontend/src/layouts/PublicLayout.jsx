// src/layouts/PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import HomeNavBar from '../components/HomeNavBar';

export default function PublicLayout() {
  return (
    <>
      <HomeNavBar />
      <Outlet />
    </>
  );
}
