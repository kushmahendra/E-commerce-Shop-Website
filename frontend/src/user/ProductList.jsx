export default function ProductList({ products, handleDeleteProduct }) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-6">PRODUCTS LIST</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-4 py-2 bg-gray-50 rounded-lg">
            <div className="font-medium text-sm text-gray-500">Image</div>
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
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="p-2 text-gray-500 hover:text-red-500 rounded-lg hover:bg-gray-100"
              >
                {/* Trash Icon SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                  <path d="M10 11v6"></path>
                  <path d="M14 11v6"></path>
                </svg>
                <span className="sr-only">Delete product</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  