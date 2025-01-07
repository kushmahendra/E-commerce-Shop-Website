import axios from 'axios';
import { API_BASE_URL } from '../../constants/constant';

export const forgotPassword = async (email) => {
    await axios.post(
        API_BASE_URL + '/api/forgot-password',
        { email },
        {
            headers: {
                'Content-Type': 'application/json',

            }
        }
    );
};

export const resetPassword = async (email, password, otp) => {
    const response = await fetch(`${API_BASE_URL}/api/reset-password`, {
        method: "PUT",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({ password, email, otp })
    }
    
)
return response;
}