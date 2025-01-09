"use client"

import { useState } from "react"

export default function Orders() {
  const [orders] = useState([
    {
      id: "ORD001",
      date: "2023-12-25",
      status: "Delivered",
      total: 199.99,
      items: [
        {
          id: 1,
          name: "Premium Headphones",
          price: 149.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80"
        },
        {
          id: 2,
          name: "Wireless Mouse",
          price: 49.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80"
        }
      ]
    },
    {
      id: "ORD002",
      date: "2024-01-05",
      status: "Processing",
      total: 299.99,
      items: [
        {
          id: 3,
          name: "Mechanical Keyboard",
          price: 299.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80"
        }
      ]
    }
  ])

  return (
    // <div className="min-h-screen bg-gray-50 p-4 md:p-8">
    <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">My Orders</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">Placed on {order.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "Delivered" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="divide-y">
                {order.items.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

