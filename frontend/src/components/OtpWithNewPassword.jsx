import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetUserPasswordMutation } from '../redux/features/auth/resetPasswordApi';
import {  toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const OtpWithNewPassword = () => {
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');


    const [resetUserPassword, { isLoading }] = useResetUserPasswordMutation();
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            await resetUserPassword({ email, otp, password }).unwrap();
            // alert('Password reset successfully');
            toast.success("Password reset successful!", {
                position: "top-right",
                autoClose: 3000, // 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            navigate('/login');
        } catch (error) {
            // setMessage(error?.data?.message || 'Failed to reset password. Please try again.');
            console.error('Failed to reset password. Please try again.!',error)
            toast.error("Failed to reset password. Please try again.!", {
                position: "top-right",
                autoClose: 3000, // 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        }
    };

    return (
        <>

       <main className='bg-[url("https://plus.unsplash.com/premium_photo-1672883551967-ab11316526b4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D")] 
       bg-cover bg-center bg-no-repeat bg-fixed h-screen w-full'>
   
           <section className='h-screen flex items-center justify-center'>
                <div className='max-w-sm border shadow bg-white mx-auto p-8'>
                    <h2 className='text-2xl font-semibold pt-5'>Reset Your Password</h2>
                    <form onSubmit={handleResetPassword} className='space-y-5 pt-8'>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email'
                            required
                            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                        />
                        <input
                            type='password'
                            name='password'
                            id='password'
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter new password'
                            required
                            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                        />
                        <input
                            type='text'
                            name='otp'
                            id='otp'
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder='Enter OTP'
                            required
                            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                        />
                        {message && <p className='text-red-500'>{message}</p>}
                        <button
                            type='submit'
                            disabled={isLoading}
                            className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'
                        >
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </section>
            </main>
        </>
    );
};

export default OtpWithNewPassword;
