// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Ensure this matches your token key

  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
