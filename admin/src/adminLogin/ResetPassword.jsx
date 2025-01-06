import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../services/emailService';

export default function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await resetPassword(token, password);
        alert('Password reset successful');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" required />
            <button type="submit">Reset Password</button>
        </form>
    );
} 
