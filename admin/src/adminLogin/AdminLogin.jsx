import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { forgotPassword, resetPassword } from '../services/emailService';
import { API_BASE_URL } from '../../constants/constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Don't forget to import the CSS!

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMode, setResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  const navigate = useNavigate();
  const { token } = useParams();

  const tokenFromStorage = localStorage.getItem('token');
  
  useEffect(() => {
    if (tokenFromStorage) {
      navigate('/dashboard');
    }
    if (token) {
      setResetMode(true);
    }
  }, [token, navigate, tokenFromStorage]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_BASE_URL+'/admin/login', { email, password });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("profile_img", response.data.profile_img);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials and try again.', {
        autoClose: 5000,
        hideProgressBar: false,
      });
    }
    setEmail('');
    setPassword('');
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(resetEmail);
      toast.success('Reset link sent to your email!', {
        autoClose: 5000,
        hideProgressBar: false,
      });
      setShowForgotPassword(false);
      setResetMode(true);
    } catch (error) {
      toast.error('Failed to send reset link. Please try again.', {
        autoClose: 5000,
        hideProgressBar: false,
      });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();  
    try {
      const response = await resetPassword(resetEmail, newPassword, otp);
      if (response.status === 400) {
        toast.error('The OTP has expired. Please request a new one.', {
          autoClose: 5000,
          hideProgressBar: false,
        });
        setOtp(''); 
        return; 
      }
      toast.success('Password reset successful', {
        autoClose: 5000,
        hideProgressBar: false,
      });
      setResetMode(false);  
    } catch (error) {
      toast.error("An error occurred during the password reset process.", {
        autoClose: 5000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div
    //  className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    className="bg-cover bg-center bg-no-repeat h-screen w-full fixed top-0 left-0"
    style={{ backgroundImage: 'url("img3.avif")' }}
     >
       <div>
      
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full mt-12 pt-12 sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-600">
          {resetMode ? 'Reset Password' : showForgotPassword ? 'Forgot Password' : 'Admin Login'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {resetMode ? (
            <form className="space-y-6" onSubmit={handleResetPassword}>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-purple-600">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="new-otp" className="block text-sm font-medium text-purple-600">
                  OTP
                </label>
                <input
                  id="new-otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-md hover:bg-gradient-to-l focus:outline-none"
              >
                Reset Password
              </button>
            </form>
          ) : showForgotPassword ? (
            <form className="space-y-6" onSubmit={handleForgotPassword}>
              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-blue-600">
                  Email address
                </label>
                <input
                  id="reset-email"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-md hover:bg-gradient-to-l focus:outline-none"
              >
                Send Reset Link
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-green-600">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-yellow-600">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-md hover:bg-gradient-to-l focus:outline-none"
              >
                Sign in
              </button>
            </form>
          )}

          {!resetMode && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowForgotPassword(!showForgotPassword)}
                className="text-sm font-medium text-purple-600 hover:text-purple-500"
              >
                {showForgotPassword ? 'Back to Login' : 'Forgot Password?'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
   </div>
  );
}








