"use client"

import { useState } from "react"
import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function ProductList() {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Elegant Striped Flutter Sleeve Overlap Collar Fashion Mini Blouse",
      image: "/placeholder.svg",
      price: 20
    },
    // Add more products as needed
  ])

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-orange-500">SavvyShop.</h1>
            <span className="text-sm text-gray-500">Admin panel</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="/placeholder.svg"
              alt="Admin avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">PRODUCTS LIST</h2>
          
          <div className="space-y-4">
            {/* Header */}
            <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="font-medium text-sm text-gray-500">Products</div>
              <div className="font-medium text-sm text-gray-500">Title</div>
              <div className="font-medium text-sm text-gray-500">Price</div>
              <div className="font-medium text-sm text-gray-500">Remove</div>
            </div>

            {/* Product List */}
            {products.map((product) => (
              <div 
                key={product.id}
                className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-sm font-medium">{product.title}</div>
                <div className="text-sm">${product.price}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(product.id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sr-only">Delete product</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

