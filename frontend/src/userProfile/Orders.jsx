

import { useState } from 'react';
import { format } from 'date-fns';

// Mock data based on the Mongoose schema
const mockOrders = [
  {
    _id: '1',
    user: { _id: 'user1', name: 'John Doe' },
    products: [
      { product: { _id: 'prod1', name: 'Product 1', price: 10 }, quantity: 2 },
      { product: { _id: 'prod2', name: 'Product 2', price: 15 }, quantity: 1 },
    ],
    totalAmount: 35,
    status: 'Pending',
    createdAt: new Date('2023-06-01'),
  },
  {
    _id: '2',
    user: { _id: 'user2', name: 'Jane Smith' },
    products: [
      { product: { _id: 'prod3', name: 'Product 3', price: 20 }, quantity: 3 },
    ],
    totalAmount: 60,
    status: 'Shipped',
    createdAt: new Date('2023-06-02'),
  },
];

const statusColors = {
  Pending: 'bg-yellow-500',
  Shipped: 'bg-blue-500',
  Delivered: 'bg-green-500',
  Cancelled: 'bg-red-500',
};

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedOrder(null);
    setIsDialogOpen(false);
  };

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
                <th className="border border-gray-300 px-4 py-2">Customer</th>
                <th className="border border-gray-300 px-4 py-2">Total Amount</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order._id}>
                  <td className="border border-gray-300 px-4 py-2">{order._id}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {format(order.createdAt, 'MMM dd, yyyy')}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => openDialog(order)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isDialogOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p>
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p>
              <strong>Customer:</strong> {selectedOrder.user.name}
            </p>
            <p>
              <strong>Date:</strong>{' '}
              {format(selectedOrder.createdAt, 'MMM dd, yyyy HH:mm')}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              <span
                className={`px-2 py-1 rounded text-white ${statusColors[selectedOrder.status]}`}
              >
                {selectedOrder.status}
              </span>
            </p>
            <h3 className="text-lg font-semibold mt-4">Products</h3>
            <table className="table-auto w-full border-collapse border border-gray-300 mt-2">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Product</th>
                  <th className="border border-gray-300 px-4 py-2">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.products.map((item) => (
                  <tr key={item.product._id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.product.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${item.product.price.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${(item.quantity * item.product.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-lg font-semibold mt-4">
              Total: ${selectedOrder.totalAmount.toFixed(2)}
            </p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={closeDialog}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


// import { useState } from "react"

// export default function Orders() {
//   const [orders] = useState([
//     {
//       id: "ORD001",
//       date: "2023-12-25",
//       status: "Delivered",
//       total: 199.99,
//       items: [
//         {
//           id: 1,
//           name: "Premium Headphones",
//           price: 149.99,
//           quantity: 1,
//           image: "/placeholder.svg?height=80&width=80"
//         },
//         {
//           id: 2,
//           name: "Wireless Mouse",
//           price: 49.99,
//           quantity: 1,
//           image: "/placeholder.svg?height=80&width=80"
//         }
//       ]
//     },
//     {
//       id: "ORD002",
//       date: "2024-01-05",
//       status: "Processing",
//       total: 299.99,
//       items: [
//         {
//           id: 3,
//           name: "Mechanical Keyboard",
//           price: 299.99,
//           quantity: 1,
//           image: "/placeholder.svg?height=80&width=80"
//         }
//       ]
//     }
//   ])

//   return (
//     // <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//     <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-2xl font-semibold mb-6">My Orders</h1>
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
//               <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Order #{order.id}</p>
//                   <p className="text-sm text-gray-500">Placed on {order.date}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className={`px-3 py-1 rounded-full text-sm ${
//                     order.status === "Delivered" 
//                       ? "bg-green-100 text-green-800" 
//                       : "bg-blue-100 text-blue-800"
//                   }`}>
//                     {order.status}
//                   </span>
//                 </div>
//               </div>
              
//               <div className="divide-y">
//                 {order.items.map((item) => (
//                   <div key={item.id} className="py-4 flex gap-4">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-20 h-20 object-cover rounded"
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-medium">{item.name}</h3>
//                       <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
//                       <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="mt-4 pt-4 border-t">
//                 <div className="flex justify-between">
//                   <span className="font-medium">Total</span>
//                   <span className="font-medium">${order.total.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

