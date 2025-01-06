import axios from 'axios';

export const forgotPassword = async (email) => {
    await axios.post('http://localhost:8080/api/forgot-password', { email });
};

export const resetPassword = async (email, password,otp) => {
    await axios.put(`http://localhost:8080/api/reset-password`, { password,email,otp });
};