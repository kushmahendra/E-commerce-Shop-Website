

import { useState } from "react"

export default function WishList() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 129.99,
      image: "/placeholder.svg?height=200&width=200",
      inStock: true
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 249.99,
      image: "/placeholder.svg?height=200&width=200",
      inStock: true
    },
    {
      id: 3,
      name: "Laptop Stand",
      price: 49.99,
      image: "/placeholder.svg?height=200&width=200",
      inStock: false
    }
  ])

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id))
  }

  return (
    // <div className="min-h-screen bg-gray-50 p-4 md:p-8">
    <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">{item.name}</h3>
                  <p className="text-lg font-semibold mb-2">${item.price.toFixed(2)}</p>
                  <p className={`text-sm mb-4 ${
                    item.inStock ? "text-green-600" : "text-red-600"
                  }`}>
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                  <div className="space-y-2">
                    <button
                      className={`w-full py-2 px-4 rounded-md ${
                        item.inStock 
                          ? "bg-blue-600 text-white hover:bg-blue-700" 
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!item.inStock}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
                    > 
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

