import axios from 'axios';
import { API_BASE_URL } from '../../constants/constant';


export const forgotPassword = async (email) => {
    await axios.post(
        API_BASE_URL + '/user/forgot-password',
        { email },
        {
            headers: {
                'Content-Type': 'application/json',

            }
        }
    );
};

export const resetPassword = async (email, password, otp) => {
    const response = await fetch(`${API_BASE_URL}/user/reset-password`, {
        method: "PUT",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({ password, email, otp })
    }

    )
    return response;
}


//contact
// export const sendContactData = async (contactData) => {
//     await axios.post(
//       `${API_BASE_URL}/api/contact`, // Adjust the endpoint as needed
//       contactData, // The contact data (e.g., { name, email, message })
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//   };

export const sendContactData = async (contactData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData), // Send the contact data as a JSON string
        });

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        const data = await response.json(); // Parse the JSON response
        return data; // Return the response data (e.g., { message: "Your message has been sent successfully" })
    } catch (error) {
        console.error("Error in sending contact data:", error);
        throw error; // Rethrow the error to be caught in handleSubmit
    }
};
