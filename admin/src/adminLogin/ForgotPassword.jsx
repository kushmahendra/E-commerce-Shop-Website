import React, { useState } from 'react';
import { forgotPassword } from '../services/emailService';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        alert('Reset link sent');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <button type="submit">Send Reset Link</button>
        </form>
    );
}