import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { forgotPassword, resetPassword } from '../services/emailService';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMode, setResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [otp,setOtp]=useState('')
  
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
      const response = await axios.post('http://localhost:8080/admin/login', { email, password });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("profile_img", response.data.profile_img);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
    setEmail('');
    setPassword('');
  };

  // Handle Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    await forgotPassword(resetEmail);
    alert('Reset link sent to your email.');
    
    setShowForgotPassword(false);setResetMode(true)
    
  };

  // Handle Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    await resetPassword(resetEmail, newPassword,otp);
    alert('Password reset successful');
  
    setResetMode(false)
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {resetMode ? 'Reset Password' : showForgotPassword ? 'Forgot Password' : 'Admin Login'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {resetMode ? (
            // Reset Password Form
            <form className="space-y-6" onSubmit={handleResetPassword}>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="new-otp" className="block text-sm font-medium text-gray-700">
                  otp
                </label>
                <input
                  id="new-otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
              >
                Reset Password
              </button>
            </form>
          ) : showForgotPassword ? (
            // Forgot Password Form
            <form className="space-y-6" onSubmit={handleForgotPassword}>
              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="reset-email"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
              >
                Send Reset Link
              </button>
            </form>
          ) : (
            // Login Form
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
              >
                Sign in
              </button>
            </form>
          )}

          {!resetMode && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowForgotPassword(!showForgotPassword)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {showForgotPassword ? 'Back to Login' : 'Forgot Password?'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function AdminLogin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [resetEmail, setResetEmail] = useState('');

//   const navigate = useNavigate();


//   const token = localStorage.getItem('token')
//   useEffect(()=>{
//     if(token){

//       navigate('/dashboard')
//     }
   
//   },[])

//   // Handle Login
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:8080/admin/login', {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         console.log('Login successful!',response);
//          localStorage.setItem("token",response.data.token)
//          localStorage.setItem("userId",response.data.id)
//          localStorage.setItem("profile_img",response.data.profile_img)
//         navigate('/dashboard'); // Redirect to Dashboard
//       } else {
//         console.error('Login failed:', response.data);
//         alert('Invalid credentials. Please try again.');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       alert('Login failed. Please check your credentials and try again.');
//     }

//     setEmail('');
//     setPassword('');
//   };

//   // Handle Reset Password
//   const handleResetPassword = (e) => {
//     e.preventDefault();
//     console.log('Password reset requested for:', resetEmail);
//     setResetEmail('');
//     setShowForgotPassword(false);
//     alert('If an account exists for ' + resetEmail + ', a password reset link will be sent.');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Admin Login
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {!showForgotPassword ? (
//             <form className="space-y-6" onSubmit={handleLogin}>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email address
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     autoComplete="current-password"
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Sign in
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <form className="space-y-6" onSubmit={handleResetPassword}>
//               <div>
//                 <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">
//                   Email address
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="reset-email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={resetEmail}
//                     onChange={(e) => setResetEmail(e.target.value)}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Reset Password
//                 </button>
//               </div>
//             </form>
//           )}

//           <div className="mt-6 text-center">
//             <button
//               onClick={() => setShowForgotPassword(!showForgotPassword)}
//               className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//             >
//               {showForgotPassword ? 'Back to Login' : 'Forgot Password?'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
