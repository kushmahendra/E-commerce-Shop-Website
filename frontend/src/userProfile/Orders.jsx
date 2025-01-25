

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useGetSingleUserOrdersQuery } from '../redux/features/orders/orderApi';
import { useGetUserMutation } from '../redux/features/auth/authApi';

// Mock data based on the Mongoose schema

// const mockOrders = [
//   {
//     _id: '1',
//     user: { _id: 'user1', name: 'John Doe' },
//     products: [
//       { product: { _id: 'prod1', name: 'Product 1', price: 10 }, quantity: 2 },
//       { product: { _id: 'prod2', name: 'Product 2', price: 15 }, quantity: 1 },
//     ],
//     totalAmount: 35,
//     status: 'Pending',
//     createdAt: new Date('2023-06-01'),
//   },
//   {
//     _id: '2',
//     user: { _id: 'user2', name: 'Jane Smith' },
//     products: [
//       { product: { _id: 'prod3', name: 'Product 3', price: 20 }, quantity: 3 },
//     ],
//     totalAmount: 60,
//     status: 'Shipped',
//     createdAt: new Date('2023-06-02'),
//   },
// ];

const statusColors = {
  Pending: 'bg-yellow-500',
  Shipped: 'bg-blue-500',
  Delivered: 'bg-green-500',
  Cancelled: 'bg-red-500',
};

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //const  [ getSingleUserOrders]=useGetSingleUserOrdersQuery()
  const [userData, setUserData] = useState(null);
  const [getUser, { data, isLoading, isError, error }] = useGetUserMutation();
  
  const openDialog = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedOrder(null);
    setIsDialogOpen(false);
  };

  const localUser = JSON.parse(localStorage.getItem('user'));
  console.log('luu', localUser)
  const userId = localUser._id


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(userId).unwrap();
        console.log('responsesssss', response);
        setUserData(response)

      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId, getUser]);

  // console.log('responsedata', orders);

  const orderDetail = userData?.user.orders || [];
  console.log('resorderDetail', orderDetail);

  console.log('qqq', orderDetail[16]?.items[0]?.quantity);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>
      <div className="border rounded shadow">
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold">Orders</h2>
        </div>
        <div className="p-4">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Order ID</th>
                {/* <th className="border border-gray-300 px-4 py-2">Customer</th> */}
                <th className="border border-gray-300 px-4 py-2">Total Amount</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail.map((order) => (
                <tr key={order._id}>
                  {/* Display Order ID */}
                  <td className="border border-gray-300 px-4 py-2">{order._id}</td>

                  {/* Display User ID (Replace with actual user name if available in userData) */}
                  {/* <td className="border border-gray-300 px-4 py-2">{order.userId}</td> */}

                  {/* Display Total Amount */}
                  <td className="border border-gray-300 px-4 py-2">${order.totalAmount.toFixed(2)}</td>

                  {/* Display Order Status */}
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-2xl text-white ${statusColors[order.orderStatus] || 'bg-gray-500'
                        }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  {/* Display Order Date */}
                  <td className="border border-gray-300 px-4 py-2">
                    {format(new Date(order.orderDate), 'MMM dd, yyyy')}
                  </td>

                  {/* Actions */}
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => openDialog(order)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {isDialogOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-2xl max-w-lg w-full p-8 border border-gray-300">

            {/* Header */}
            <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-blue-200 pb-2">Order Details</h2>

            {/* Order Information */}
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong className="text-blue-600">Order ID:   </strong> {selectedOrder._id}
              </p>
              <p className="text-gray-700">
                <strong className="text-blue-600">Customer ID:    </strong> {selectedOrder.userId}
              </p>
              <p className="text-gray-700">
                <strong className="text-blue-600">Date:   </strong>{' '}
                {format(new Date(selectedOrder.orderDate), 'MMM dd, yyyy HH:mm')}
              </p>
              <p className="text-gray-700">
                <strong className="text-blue-600">Status:   </strong>{' '}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedOrder.orderStatus] || 'bg-gray-500 text-white'
                    }`}
                >
                  {selectedOrder.orderStatus}
                </span>
              </p>
            </div>

            {/* Products Table */}
            <h3 className="text-lg font-semibold text-blue-700 mt-6">Products</h3>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300 mt-3 text-sm">
                <thead className="bg-blue-100 text-blue-800">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Product</th>
                    <th className="border border-gray-300 px-4 py-2">Quantity</th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-4 py-2">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Replace this section with actual product mapping */}
              
                  {selectedOrder?.items?.map((item, index) => (
              <tr key={item._id} className="text-gray-700">
                <td className="border border-gray-300 px-4 py-2">Product{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">${item.totalPrice.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">${(item.quantity * item.totalPrice.toFixed(2))}</td>
              </tr>
            ))}
                </tbody>
              </table>
            </div>

            {/* Total Amount */}
            <p className="text-xl font-semibold text-blue-800 mt-4">
              Total: <span className="text-green-600">${selectedOrder.totalAmount.toFixed(2)}</span>
            </p>

            {/* Close Button */}
            <div className="mt-6 flex justify-end">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                onClick={closeDialog}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}




