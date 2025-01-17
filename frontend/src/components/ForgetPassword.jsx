import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetUserPasswordLinkMutation } from '../redux/features/auth/resetPasswordApi';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const [resetUserPasswordLink, { isLoading }] = useResetUserPasswordLinkMutation();
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            await resetUserPasswordLink(email).unwrap();
            // alert('Password reset link sent to your email');
            toast.success("Password reset link sent to your email", {
                position: "top-right",
                autoClose: 3000, // 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            navigate('/otp');
        } catch (error) {
            // setMessage(error?.data?.message || 'Failed to send reset link. Please try again.');
            toast.error("Failed to send reset link. Please try again.", {
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
            <ToastContainer />
            <section className='h-screen flex items-center justify-center'>
                <div className='max-w-sm border shadow bg-white mx-auto p-8'>
                    <h2 className='text-2xl font-semibold pt-5'>Reset Password</h2>
                    <form onSubmit={handleResetPassword} className='space-y-5 pt-8'>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email Address'
                            required
                            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                        />
                        {message && <p className='text-red-500'>{message}</p>}
                        <button
                            type='submit'
                            disabled={isLoading}
                            className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'
                        >
                            {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default ForgetPassword;
