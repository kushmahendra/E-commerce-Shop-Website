import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './adminLogin/AdminLogin';
import Dashboard from './page/Dashboard';
import ProtectedRoute from './page/ProtectedRoute';
import UpdateProductUpload from './components/UpdateProductUpload';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path='/' element={<AdminLogin />} />
        
        {/* Protected Route */}
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
       />
          {/* Nested Route (Removed the leading slash) */}
          <Route path='/UpdateProduct' element={<UpdateProductUpload />} />
      
      </Routes>
    </Router>
  );
};

export default App;
