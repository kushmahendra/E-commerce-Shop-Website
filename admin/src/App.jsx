import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import AdminLogin from './adminLogin/AdminLogin';
import Page from './page/Page';
import ProtectedRoute from './page/ProtectedRoute';

const App = () => {
 
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<AdminLogin />} />
       
          <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Page />
            </ProtectedRoute>
          }
        />
        </Routes>
      </Router>
    </>
  );
};

export default App;

