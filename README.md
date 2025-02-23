# E-Commerce Shopping Website

## Overview
The E-Commerce Shopping Website is a full-featured online store that enables users to browse products, add items to their cart, and complete purchases securely. It is built using modern web technologies to provide a seamless shopping experience.

## Features
- User authentication (Sign up, Login, Logout)
- Product listing and search functionality
- Product categories and filtering options
- Shopping cart and wishlist management
- Secure checkout with payment integration
- Admin dashboard for product and order management
- Responsive design for mobile and desktop
- Reviews and ratings for products



<div style="display: flex; justify-content: center; gap: 20px;">
<div style="border: 2px solid #ddd; padding: 10px; border-radius: 10px; text-align: center;">
<img src="./screenshotsImages/Screenshot-Home2.png" alt="Screenshot" width="400"/>
<img src="./screenshotsImages/Screenshot-Home21.png" alt="Screenshot" width="400"/>
</div>
</div>

<div style="display: flex; justify-content: center; gap: 20px;">
<div style="border: 2px solid #ddd; padding: 10px; border-radius: 10px; text-align: center;">
<img src="./screenshotsImages/Screenshot-Home25.png" alt="Screenshot" width="400"/>
<img src="./screenshotsImages/Screenshot-Home23.png" alt="Screenshot" width="400"/>
</div>
</div>

<div style="display: flex; justify-content: center; gap: 20px;">
<div style="border: 2px solid #ddd; padding: 10px; border-radius: 10px; text-align: center;">
<img src="./screenshotsImages/Screenshot-Home24.png" alt="Screenshot" width="400"/>
<img src="./screenshotsImages/Screenshot-login.png" alt="Screenshot" width="400"/>
</div>
</div>


<div style="display: flex; justify-content: center; gap: 20px;">
<div style="border: 2px solid #ddd; padding: 10px; border-radius: 10px; text-align: center;">
<img src="./screenshotsImages/Screenshot-register.png" alt="Screenshot" width="400"/>
<img src="./screenshotsImages/Screenshot-Home1.png" alt="Screenshot" width="400"/>
</div>
</div>


<div style="display: flex; justify-content: center; gap: 20px;">
<div style="border: 2px solid #ddd; padding: 10px; border-radius: 10px; text-align: center;">
<img src="./screenshotsImages/Screenshot-product1.png" alt="Screenshot" width="400"/>
<img src="./screenshotsImages/Screenshot-product2.png" alt="Screenshot" width="400"/>
</div>
</div>

<div style="display: flex; justify-content: center; gap: 20px;">
<div style="border: 2px solid #ddd; padding: 10px; border-radius: 10px; text-align: center;">
<img src="./screenshotsImages/Screenshot-product3.png" alt="Screenshot" width="400"/>
<img src="./screenshotsImages/Screenshot-product31.png" alt="Screenshot" width="400"/>
</div>
</div>

<div style="display: flex; justify-content: center; gap: 20px;">
<div style="border: 2px solid #ddd; padding: 10px; border-radius: 10px; text-align: center;">
<img src="./screenshotsImages/Screenshot-search.png" alt="Screenshot" width="400"/>
<img src="./screenshotsImages/Screenshot-profile.png" alt="Screenshot" width="400"/>
</div>
</div>

<div style="display: flex; justify-content: center; gap: 20px;">
<div style="border: 2px solid #ddd; padding: 10px; border-radius: 10px; text-align: center;">
<img src="./screenshotsImages/Screenshot-page menue.png" alt="Screenshot" width="400"/>
<img src="./screenshotsImages/Screenshot-contact.png" alt="Screenshot" width="400"/>
</div>
</div>


<div style="display: flex; justify-content: center; gap: 20px;">
<div style="border: 2px solid #ddd; padding: 10px; border-radius: 10px; text-align: center;">
<img src="./screenshotsImages/Screenshot-addcard.png" alt="Screenshot" width="400"/>
<img src="./screenshotsImages/Screenshot-addcard2.png" alt="Screenshot" width="400"/>
</div>
</div>


<div style="display: flex; justify-content: center; gap: 20px;">
<div style="border: 2px solid #ddd; padding: 10px; border-radius: 10px; text-align: center;">
<img src="./screenshotsImages/Screenshot-cartp.png" alt="Screenshot" width="400"/>
<img src="./screenshotsImages/Screenshot-checkout.png" alt="Screenshot" width="400"/>
</div>
</div>

<div style="display: flex; justify-content: center; gap: 20px;">
<div style="border: 2px solid #ddd; padding: 10px; border-radius: 10px; text-align: center;">
<img src="./screenshotsImages/Screenshot-checkout4.png" alt="Screenshot" width="400"/>
<img src="./screenshotsImages/Screenshot-Blogs.png" alt="Screenshot" width="400"/>
</div>
</div>

<img src="./screenshotsImages/Screenshot-Footer.png" alt="Screenshot" width="800"/>



## Technologies Used
### Frontend:
- React.js 
- Redux Toolkit for state management
- Tailwind CSS for styling
- Axios for API requests

### Backend:
- Node.js with Express.js
- MongoDB with Mongoose ORM
- JSON Web Token (JWT) authentication
- Cloudinary for image storage


## Installation Guide
### Prerequisites:
- Node.js installed
- MongoDB database setup
- Cloudinary account for image storage

### Steps:
1. Clone the repository:

   git clone https://github.com/kushmahendra/ecommerce-website.git
   
   ```
      cd ecommerce-website

3. Install dependencies for frontend:

 
   ```
   cd frontend
   
   npm install


5. Install dependencies for backend:


   ```
   cd backend
   
   npm install


7. Set up environment variables:
   - Create a `.env` file in the backend directory and configure the following:
     ```env
     PORT=your_port
     MONGO_URI=your_mongodb_connection_string
     CLIENT_URL=client_url

     JWT_SECRET_KEY=your_jwt_secret_key
     JWT_EXPIRES_IN=your_jwt_expiry_time
     JWT_ALGORITHM=your_jwt_algorithm

     CLOUD_NAME=your_cloud_name
     CLOUD_API_KEY=your_cloud_api_key
     CLOUD_API_SECRET=your_cloud_api_secret
     EMAIL_USER=your_email_user
     EMAIL_PASS=your_email_password
     ```

   - Create a `.env` file in the frontend directory and configure the following:
     ```env
     VITE_CLOUD_NAME=your_cloud_name
     VITE_CLOUD_API_KEY=your_cloud_api_key
     VITE_CLOUD_API_SECRET=your_cloud_api_secret
     VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
     ```

8. Run the backend server:
 

   ```
   npm start

9. Run the frontend development server:


   ```
   npm run dev

## Deployment
For production deployment, you can use:
- **Frontend:** Vercel 
- **Backend:**  Render 
- **Database:** MongoDB Atlas

## Usage
- Register or log in as a user.
- Browse products by categories or search.
- Add products to the shopping cart and proceed to checkout.
- Make secure payments using Razorpay or cash on delivery.
- Track orders and view order history.
- Admin can manage products, orders, and users from the dashboard.


## Contact
For any queries, feel free to reach out:
- Email: kushwahamahendra691@gmail.com
- LinkedIn: https://www.linkedin.com/in/mahendra-333569259/
