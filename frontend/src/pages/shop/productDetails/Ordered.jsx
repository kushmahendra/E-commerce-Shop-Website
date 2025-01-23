import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Ordered = () => {
  const orders = useSelector((state) => state.order.orders);
  console.log('Orders:', orders);

  const latestOrder = orders?.[orders.length - 1];
  const totalAmount = latestOrder?.newOrder?.totalAmount || 0;
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-300 to-green-200 p-6">
      <div className="max-w-4xl w-full bg-yellow-100 rounded-xl shadow-lg p-8">
        <h2 className="text-4xl font-bold text-center text-orange-700 mb-6">
          Thank You for Your Order! 
        </h2>
        {latestOrder ? (
          <div className="space-y-6 text-gray-800">
            <div className="bg-purple-50 p-4 rounded-md shadow-md">
              <p className="text-lg flex justify-between">
                <span className="font-medium text-purple-600">Order ID:</span>{' '}
                <span className="font-bold">{latestOrder.newOrder._id}</span>
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-md shadow-md">
              <p className="text-lg  flex justify-between">
                <span className="font-medium text-purple-600">Total Amount:</span>{' '}
                <span className="font-bold text-green-600">${totalAmount.toFixed(2)}</span>
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-md shadow-md">
              <p className="text-lg  flex justify-between">
                <span className="font-medium text-purple-600">Payment Status:</span>{' '}
                <span className="font-bold">
                  {latestOrder.newOrder.paymentStatus || 'Pending'}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-700">
            <p className="text-lg font-semibold">
              We couldn't retrieve your order details. Please check your email for confirmation.
            </p>
          </div>
        )}
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-block w-1/2 text-center px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white text-lg font-medium rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition-all"
          >
          <span className='text-orange-600'>🛒 </span> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Ordered;
