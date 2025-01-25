// import React, { useState } from 'react';
// import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
// import { useEffect } from 'react';
// import { API_BASE_URL } from '../../constants/constant';
// import axios from 'axios';

// /** Mock Data */
// // const orders = [
// //   { id: '1', customer: 'John Doe', date: '2023-05-01', total: '$150.00', status: 'Completed' },
// //   { id: '2', customer: 'Jane Smith', date: '2023-05-02', total: '$89.99', status: 'Processing' },
// //   { id: '3', customer: 'Bob Johnson', date: '2023-05-03', total: '$249.50', status: 'Shipped' },
// //   { id: '4', customer: 'Alice Brown', date: '2023-05-04', total: '$75.25', status: 'Pending' },
// //   { id: '5', customer: 'Charlie Davis', date: '2023-05-05', total: '$199.99', status: 'Completed' },
// //   { id: '6', customer: 'Eve Wilson', date: '2023-05-06', total: '$120.00', status: 'Processing' },
// //   { id: '7', customer: 'Frank White', date: '2023-05-07', total: '$300.00', status: 'Shipped' },
// // ];

// /** OrderList Component */
// const OrderList = () => {
//   // States
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [orderData, setOrderData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const ordersPerPage = 5;

// //get all orders


// const userId = localStorage.getItem('userId');

// useEffect(() => {
//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/orders`);
//       setOrderData(response?.data); // Assuming the data structure is correct
//     } catch (error) {
//       console.error('Error while fetching orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (userId) {
//     fetchOrders();
//   }
// }, [userId]);

// // Render loading indicator if still fetching data
// if (loading) {
//   return <div>Loading...</div>;
// }

// console.log('orderDatasss',orderData)
//   // Search and Filter Logic
// // const filteredOrders = orderData.filter((order) => {
// //   const fullName = `${order.userId.firstName} ${order.userId.lastName}`;
// //   return (
// //     fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
// //     (filterStatus ? order.orderStatus === filterStatus : true)
// //   );
// // });
// const filteredOrders = orderData ? orderData.filter((order) => {
//   const fullName = `${order.userId.firstName} ${order.userId.lastName}`;
//   return (
//     fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (filterStatus ? order.orderStatus === filterStatus : true)
//   );
// }) : [];



//   // Pagination Logic
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

//   const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   // Filter Status Options
//   const statuses = ['All', 'Completed', 'Processing', 'Shipped', 'Pending'];

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
//       <div className="container mx-auto px-6 py-4">
//         {/* Title */}
//         <h1 className="text-4xl text-center font-extrabold text-purple-700 mb-8">🌟 Orders List 🌟</h1>

//         {/* Search and Filter */}
//         <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
//           {/* Search */}
//           <div className="relative w-full sm:w-64">
//             <input
//               type="text"
//               placeholder=" Search orders..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-12 pr-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
//             />
//             <Search className="absolute left-3 top-2.5 text-purple-400" size={24} />
//           </div>

//           {/* Filter */}
//           <div>
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-5 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
//             >
//               {statuses.map((status) => (
//                 <option key={status} value={status === 'All' ? '' : status}>
//                   {status}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Orders Table */}
//         <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
//           <table className="w-full table-auto">
//             <thead className="bg-purple-600 text-white">
//               <tr>
//                 {['Order ID', 'Customer', 'Date', 'Total', 'Status'].map((header) => (
//                   <th
//                     key={header}
//                     className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
//                   >
//                     {header}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {orderData.map((order) => (
//                 <tr key={order.id} className="hover:bg-purple-50">
//                   <td className="px-6 py-4 text-sm font-semibold">{order._id}</td>
//                   <td className="px-6 py-4 text-sm">{order.userId.firstName} {order.userId.lastName}</td>
//                   <td className="px-6 py-4 text-sm">  {new Date(order.orderDate).toLocaleDateString('en-US')}</td>
//                   <td className="px-6 py-4 text-sm font-bold text-blue-600">{order.totalAmount}</td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
//                         order.status === 'Completed'
//                           ? 'bg-green-100 text-green-700'
//                           : order.status === 'Processing'
//                           ? 'bg-yellow-100 text-yellow-700'
//                           : order.status === 'Shipped'
//                           ? 'bg-blue-100 text-blue-700'
//                           : 'bg-gray-100 text-gray-700'
//                       }`}
//                     >
//                       {order.orderStatus}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="mt-6 flex justify-between items-center">
//           <p className="text-sm text-gray-700">
//             Showing <span className="font-bold">{indexOfFirstOrder + 1}</span> to{' '}
//             <span className="font-bold">
//               {Math.min(indexOfLastOrder, filteredOrders.length)}
//             </span>{' '}
//             of <span className="font-bold">{filteredOrders.length}</span> results
//           </p>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={handlePreviousPage}
//               disabled={currentPage === 1}
//               className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50"
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <button
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50"
//             >
//               <ChevronRight size={20} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderList;


import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { API_BASE_URL } from '../../constants/constant';
import axios from 'axios';

const OrderList = () => {
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const ordersPerPage = 5;

  // get user ID from local storage
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/orders`);
        setOrderData(response?.data); // Assuming the data structure is correct
      } catch (error) {
        console.error('Error while fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  // Render loading indicator if still fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Apply search and filter logic
  const filteredOrders = orderData
    ? orderData.filter((order) => {
        const fullName = `${order.userId.firstName} ${order.userId.lastName}`;
        return (
          fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (filterStatus ? order.orderStatus === filterStatus : true)
        );
      })
    : [];

  // Pagination Logic (applied on filteredOrders)
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Filter Status Options
  const statuses = ['All', 'Completed', 'Processing', 'Shipped', 'Pending'];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-6 py-4">
        {/* Title */}
        <h1 className="text-4xl text-center font-extrabold text-purple-700 mb-8">🌟 Orders List 🌟</h1>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder=" Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <Search className="absolute left-3 top-2.5 text-purple-400" size={24} />
          </div>

          {/* Filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-5 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
            >
              {statuses.map((status) => (
                <option key={status} value={status === 'All' ? '' : status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
          <table className="w-full table-auto">
            <thead className="bg-purple-600 text-white">
              <tr>
                {['Order ID', 'Customer', 'Date', 'Total', 'Status'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentOrders.map((order) => (
                <tr key={order._id} className="hover:bg-purple-50">
                  <td className="px-6 py-4 text-sm font-semibold">{order._id}</td>
                  <td className="px-6 py-4 text-sm">{order.userId.firstName} {order.userId.lastName}</td>
                  <td className="px-6 py-4 text-sm">{new Date(order.orderDate).toLocaleDateString('en-US')}</td>
                  <td className="px-6 py-4 text-sm font-bold text-blue-600">{order.totalAmount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                        order.orderStatus === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : order.orderStatus === 'Processing'
                          ? 'bg-yellow-100 text-yellow-700'
                          : order.orderStatus === 'Shipped'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-700">
            Showing <span className="font-bold">{indexOfFirstOrder + 1}</span> to{' '}
            <span className="font-bold">{Math.min(indexOfLastOrder, filteredOrders.length)}</span> of{' '}
            <span className="font-bold">{filteredOrders.length}</span> results
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
