import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { API_BASE_URL } from '../../constants/constant';

/** Mock Data */
const orders = [
  { id: '1', customer: 'John Doe', date: '2023-05-01', total: '$150.00', status: 'Completed' },
  { id: '2', customer: 'Jane Smith', date: '2023-05-02', total: '$89.99', status: 'Processing' },
  { id: '3', customer: 'Bob Johnson', date: '2023-05-03', total: '$249.50', status: 'Shipped' },
  { id: '4', customer: 'Alice Brown', date: '2023-05-04', total: '$75.25', status: 'Pending' },
  { id: '5', customer: 'Charlie Davis', date: '2023-05-05', total: '$199.99', status: 'Completed' },
  { id: '6', customer: 'Eve Wilson', date: '2023-05-06', total: '$120.00', status: 'Processing' },
  { id: '7', customer: 'Frank White', date: '2023-05-07', total: '$300.00', status: 'Shipped' },
];

/** OrderList Component */
const OrderList = () => {
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const [user, setUser] = useState(null);
  const ordersPerPage = 5;

//get user
// const localUser=JSON.parse(localStorage.getItem('user'))
// const userId=localUser._id
// console.log('userId',userId)

// useEffect(() => {
//   // Function to fetch user data
//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem("token");
    
//       const response = await fetch(API_BASE_URL+`/api/auth/user/${userId}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const userData = await response.json();
//       setUser(userData); // Update state with fetched data
//     } catch (error) {
//      console.error("error while fetching data",error)
    
//     }
//   }

//   if (userId) {
//     fetchUser(); // Call fetchUser when userId is available
//   }
// }, [userId]);

// console.log('userData',user)

  // Search and Filter Logic
  const filteredOrders = orders.filter((order) => {
    return (
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus ? order.status === filterStatus : true)
    );
  });

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
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
                <tr key={order.id} className="hover:bg-purple-50">
                  <td className="px-6 py-4 text-sm font-semibold">{order.id}</td>
                  <td className="px-6 py-4 text-sm">{order.customer}</td>
                  <td className="px-6 py-4 text-sm">{order.date}</td>
                  <td className="px-6 py-4 text-sm font-bold text-blue-600">{order.total}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                        order.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-700'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {order.status}
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
            <span className="font-bold">
              {Math.min(indexOfLastOrder, filteredOrders.length)}
            </span>{' '}
            of <span className="font-bold">{filteredOrders.length}</span> results
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
