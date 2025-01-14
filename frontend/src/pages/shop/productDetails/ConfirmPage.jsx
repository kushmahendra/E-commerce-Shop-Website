import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ConfirmPage= () => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Thank You for Your Order!</h2>
      {orderDetails ? (
        <div className="space-y-4">
          <p>Order ID: <strong>{orderDetails.orderId}</strong></p>
          <p>Total Amount: <strong>${orderDetails.totalAmount.toFixed(2)}</strong></p>
          <p>Payment Status: <strong>{orderDetails.paymentStatus}</strong></p>
        </div>
      ) : (
        <p>We couldn't retrieve your order details. Please check your email for confirmation.</p>
      )}
      <div className="mt-6">
        <Link to="/" className="bg-green-600 px-4 py-2 text-white rounded-md">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ConfirmPage;
