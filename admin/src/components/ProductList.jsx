import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductList({ products, onRemoveProduct, onUpdateProduct }) {
  console.log('fsaf',products)
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-lg shadow-lg">
      {/* Title */}
      <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">🛍️ PRODUCTS LIST</h2>

      {/* Table Container */}
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        {/* Table Header */}
        <div className="grid grid-cols-[80px,1fr,1fr,1fr,1fr,1fr,1fr,80px,80px] bg-purple-600 text-white font-semibold text-center py-3 px-4">
          <div>Image</div>
          <div>Product Name</div>
          <div>Category</div>
          <div>Price</div>
          <div>Old Price</div>
          <div>Color</div>
          <div>Rating</div>
          <div>Stock</div>
          <div>Remove</div>
          <div>Edit</div>
        </div>

        {/* Product List */}
        {/* {products.products.map((product) => ( */}
        {products.map((product) => (
          <div key={product.id} className="border-b last:border-none">
            <div className="grid grid-cols-[80px,1fr,1fr,1fr,1fr,1fr,1fr,80px,80px] gap-4 py-4 px-4 items-center text-center hover:bg-purple-50 transition-all duration-300">
              {/* Product Image */}
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border shadow-md mx-auto">
                {product.image ? (
                  <img
                    src={
                      typeof product.image === 'string'
                        ? product.image
                        : URL.createObjectURL(product.image)
                    }
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Product Name */}
              <div className="truncate text-gray-800 font-medium">{product.name}</div>

              {/* Product Category */}
              <div className="text-gray-600">{product.category}</div>

              {/* Product Price */}
              <div className="text-green-600 font-semibold">${product.price}</div>

              {/* Product Old Price */}
              <div className="text-red-500 line-through">${product.oldPrice}</div>

              {/* Product Color */}
              <div className="text-gray-700">{product.color}</div>

              {/* Product Rating */}
              <div className="text-yellow-500 font-bold">{product.rating}</div>

                 {/* Product Stock */}
                 <div className="text-yellow-500 font-bold">{product.stock}</div>

              {/* Remove Button */}
              <button
                onClick={() => onRemoveProduct(product._id)}
                className="p-2 rounded-md bg-red-100 hover:bg-red-200 transition-colors"
                aria-label="Remove Product"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>

              {/* Edit Button */}
              <Link
                to="/UpdateProduct"
                state={product}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
              >
                Edit
              </Link>
            </div>

            {/* Product Description */}
            <div className="bg-gray-50 px-4 py-2 text-sm text-gray-700">
              <span className="font-semibold text-gray-600">Description:</span>{' '}
              <span className="text-orange-700">{product.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
