// import React from 'react'
// import { Navigate } from 'react-router-dom'


// const ProtectedRoute = ({children}) => {
 
// const token = localStorage.getItem('token');
  
//  return token ? children : <Navigate to="/" replace />;
  
// }

// export default ProtectedRoute
import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.warn("Please login to continue!", {
      position: "top-right",
      autoClose: 3000, // Closes after 3 seconds
    });
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
