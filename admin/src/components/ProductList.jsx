import { Trash2 } from 'lucide-react';

export default function ProductList({ products, onRemoveProduct }) {

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">PRODUCTS LIST</h2>
      <div className="bg-white rounded-lg">
        {/* Table Header */}
        <div className="grid grid-cols-[auto,auto,auto,auto,auto,auto,auto,auto,auto] text-green-700 text-lg font-bold gap-4 p-4 border-b text-sm text-gray-500 justify-between">
        <div>Image</div>
          <div>Product Name</div>
          <div>Category</div>
          {/* <div>Description</div> */}
          <div>Price</div>
          <div>Old Price</div>
          <div>Color</div>
          <div>Rating</div>
          <div>Remove</div>
          <div>Edit</div>
        </div>


        {/* Product List */}
        {products.map((product) => (
          <div>
          <div
            key={product.id}
            className="grid grid-cols-[auto,auto,auto,auto,auto,auto,auto,auto] gap-4 p-4 items-center border-b last:border-none justify-between"
          >
            {/* Product Image */}
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border">
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

            {/* Product Title */}
            <div className="truncate">{product.name}</div>

            {/* Produc category */}
            <div>{product.category}</div>

            {/* Product description
            <div>${product.description}</div> */}

            {/* Product Price */}
            <div>${product.price}</div>

              {/* Product oldPrice */}
              <div>${product.oldPrice}</div>

               {/* Product color */}
               <div>{product.color}</div>

                {/* Product Rating*/}
              <div>{product.rating}</div>

            {/* Remove Button */}
            <button
              onClick={() => onRemoveProduct(product._id)}
              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          
          </div>
          <div className=''> <span className='text-grey-600'>Descriptions : </span>
               
         <span className='text-orange-700 text-xs'> {product.description}</span>
         </div>
          </div>
        ))}
      </div>
    </div>
  );
}
