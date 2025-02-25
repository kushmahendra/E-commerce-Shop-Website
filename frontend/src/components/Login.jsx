import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../redux/features/auth/authApi'
import { setUser } from '../redux/features/auth/authSlice'
import {  toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation()
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password
    }
    try {
      const response = await loginUser(data).unwrap();

      console.log('hey user', response)
      const { token, user } = response;
      if (token) {
        // Store token securely in localStorage
        localStorage.setItem('token', token);
        console.log('Token stored in localStorage');
      } else {
        console.warn('Token not received in the response');
      }
      dispatch(setUser({ user }))
      //  alert("Login successfully")
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      navigate('/')
    } catch (error) {
      // setMessage("Please provide a valid email and password")
      toast.error("Please provide a valid email and password", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }

  }
  return (

    <>
    <div className="bg-[url('https://static.vecteezy.com/system/resources/previews/004/299/830/non_2x/shopping-online-on-phone-with-podium-paper-art-modern-pink-background-gifts-box-illustration-free-vector.jpg')] bg-cover bg-center h-screen w-full">
     
      <section className='h-screen flex items-center justify-center'>
        <div className='max-w-sm border shadow bg-white mx-auto p-8'>
          <h2 className='text-2xl font-semibold pt-5'>Please Login</h2>
          <form onSubmit={handleLogin} className='space-y-5 max-w-sm max-auto pt-8' >

            <input type="email" name="email" id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address" required
              className='w-full bg-gray-100 focus:outline-none px-5 py-3'
            />

            <input type="password" name="password" id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password" required
              className='w-full bg-gray-100 focus:outline-none px-5 py-3'
            />
            <Link to='/forget' className='text-sm flex text-end text-blue-600'>forget password</Link>

            {
              message && <p className='text-red-500'>{message}</p>
            }
            <button type='submit'
              className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'>Login</button>
          </form>
          <p className='my-5 italic text-sm text-center'>Don't have an account ? <Link to='/register' className='text-red-700 px-1 underline'>Register</Link>  here.</p>
        </div>
      </section>
      </div>
    </>
  )
}

export default Login;