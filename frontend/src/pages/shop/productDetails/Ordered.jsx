import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Ordered = () => {

  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 1000); // Hide after 1s
    }, 2000); // Repeat every 2s

    return () => clearInterval(interval);
  }, []);
  

  return (  
  <>
   
     
     <div className="min-h-screen  pt-12  flex items-center justify-center bg-gradient-to-r from-red-100 via-purple-100 to-pink-300 p-6 animate-fade-in">
     
          {/* Fireworks Animation */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="firework left-[15%] top-[10%] animate-firework delay-75"></div>
          <div className="firework right-[30%] top-[20%] animate-firework delay-150"></div>
          <div className="firework left-[40%] bottom-[15%] animate-firework delay-300"></div>
          <div className="firework right-[10%] bottom-[5%] animate-firework delay-500"></div>
          <div className="firework left-[50%] top-[5%] animate-firework delay-700"></div>
        </div>
      )}

      <div className="max-w-4xl w-full bg-yellow-50 rounded-2xl animate-bounce shadow-xl p-8 transform transition-transform duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-6 drop-shadow-md animate-bounce-once">
          Thank You for Your Order! 🎉
        </h2>

        <div className="text-center text-gray-700">
          <p className="text-lg font-semibold">
            Your order has been placed successfully.
             {/* Check your email for details. */}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-block w-1/2 text-center px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white text-lg font-medium rounded-xl shadow-lg transition-all duration-300 transform hover:scale-110 hover:from-green-500 hover:to-green-700"
          >
            <span className="text-yellow-400">🛍️</span> Continue Shopping
          </Link>
        </div>
      </div>



  {/* Fireworks Animation (Tailwind CSS) */}
  <style>
        {`
          @keyframes firework {
            0% { transform: scale(0.3) translateY(20px); opacity: 1; }
            50% { transform: scale(1.2) translateY(-10px); opacity: 0.8; }
            100% { transform: scale(2) translateY(-30px); opacity: 0; }
          }

          .firework {
            position: absolute;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            opacity: 0;
            animation: firework 1.5s ease-out infinite;
          }

          .firework:nth-child(1) { background: rgba(255, 0, 0, 0.9); animation-delay: 0s; }
          .firework:nth-child(2) { background: rgba(0, 255, 0, 0.9); animation-delay: 0.2s; }
          .firework:nth-child(3) { background: rgba(0, 0, 255, 0.9); animation-delay: 0.4s; }
          .firework:nth-child(4) { background: rgba(255, 255, 0, 0.9); animation-delay: 0.6s; }
          .firework:nth-child(5) { background: rgba(255, 0, 255, 0.9); animation-delay: 0.8s; }
                
        `}
      </style>

    </div>

    </>
  );
};

export default Ordered;


// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// const Ordered = () => {

//   const orders = useSelector((state) => state.order.orders);
//   console.log('Orders:', orders);

//   const latestOrder = orders?.[orders.length - 1];
//   const totalAmount = latestOrder?.newOrder?.totalAmount || 0;

 {/* // <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-300 to-green-200 p-6">
    //   <div className="max-w-4xl w-full bg-yellow-100 rounded-xl shadow-lg p-8">
    //     <h2 className="text-4xl font-bold text-center text-orange-700 mb-6">
    //       Thank You for Your Order! 
    //     </h2>
    //     {/* {latestOrder ? (
    //       <div className="space-y-6 text-gray-800">
    //         <div className="bg-purple-50 p-4 rounded-md shadow-md">
    //           <p className="text-lg flex justify-between">
    //             <span className="font-medium text-purple-600">Order ID:</span>{' '}
    //             <span className="font-bold">{latestOrder.newOrder._id}</span>
    //           </p>
    //         </div>
    //         <div className="bg-purple-50 p-4 rounded-md shadow-md">
    //           <p className="text-lg  flex justify-between">
    //             <span className="font-medium text-purple-600">Total Amount:</span>{' '}
    //             <span className="font-bold text-green-600">${totalAmount.toFixed(2)}</span>
    //           </p>
    //         </div>
    //         <div className="bg-purple-50 p-4 rounded-md shadow-md">
    //           <p className="text-lg  flex justify-between">
    //             <span className="font-medium text-purple-600">Payment Status:</span>{' '}
    //             <span className="font-bold">
    //               {latestOrder.newOrder.paymentStatus || 'Pending'}
    //             </span>
    //           </p>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="text-center text-gray-700">
    //         <p className="text-lg font-semibold">
    //           We couldn't retrieve your order details. Please check your email for confirmation.
    //         </p>
    //       </div>
    //     )} 
    //     <div className="mt-8 flex justify-center">
    //       <Link
    //         to="/"
    //         className="inline-block w-1/2 text-center px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white text-lg font-medium rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition-all"
    //       >
    //       <span className='text-orange-600'>🛒 </span> Continue Shopping
    //       </Link>
    //     </div>
    //   </div>
    // </div>
     */}