import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../../components/RatingStars';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useAddsToCartMutation } from '../../redux/features/cart/cartApi';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { addToWishlist } from '../../redux/features/wishlist/wishlistSlice';
import { useAddToWishlistApiMutation } from '../../redux/features/wishlist/wishlistApi';

const ProductCards = ({ products }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const [addsToCart, { isLoading }] = useAddsToCartMutation();
  const [addToWishlistApi, { isLoading: isAddingToWishlist }] = useAddToWishlistApiMutation();

  const handleAddToCart = async (product) => {
    try {
      const response = await addsToCart({ ...product, userId: user._id }).unwrap();
      console.log('Product:', product);
      console.log('Response:', response);

      dispatch(addToCart({ ...product, userId: user._id }));
      toast.success("Product added to cart successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error("Failed to add product to cart. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  // //add to wishlist
  // const handleAddToWishlist = (product) => {
  //   dispatch(addToWishlist(product));
  //   toast.success("Product added to wishlist!", {
  //     position: "top-right",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     theme: "light",
  //   });
  // };
 
   // Handle adding to wishlist with mutation
   const handleAddToWishlist = async (product) => {
    try {
      const newData={
        productId:product._id,
        userId: user._id 
      }
      const response = await addToWishlistApi(newData).unwrap(); // Use the mutation
      console.log('Response:', response);

      toast.success("Product added to wishlist!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      toast.error("Failed to add product to wishlist. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products && products.map((product, index) => (
          <div
            key={index}
            className={`relative bg-gradient-to-r from-blue-100 via-gray-200 to-blue-100 text-white rounded-xl shadow-lg 
              overflow-hidden hover:scale-105 transition-transform duration-300 
              ${product.stock === 0 ? 'opacity-75' : ''  }`}
          >
            <div className="relative">
              <Link to={`/shop/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-96 md:h-64 w-full object-cover hover-scale-105 transition-all duration-300"
                />
              </Link>
            </div>

            <div className="flex flex-col gap-2 p-4">
              <div className="flex justify-between">
                <h4 className="text-gray-600 font-semibold">{product.name}</h4>
                <p className={product.stock > 0 ? 'text-green-400' : 'text-red-400'}>
                  {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                </p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-green-400">${product.price}</p>
                {product.oldPrice && <p className="text-red-400"><s>${product.oldPrice}</s></p>}
              </div>
              <div className="flex justify-between items-center">
                <RatingStars rating={product.rating} />
                {product.stock > 0 && (
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={isLoading}
                    className="text-sm rounded-md bg-primary px-3 py-1 text-white hover:bg-primary-dark"
                  >
                    {isLoading ? 'Adding...' : <i className="ri-shopping-cart-2-line"></i>}
                  </button>
                )}
              </div>
              {/* add herat */}
              {/* <div className="mt-2 flex justify-center"> */}
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className="absolute top-0 right-2 text-  p-2 hover:text-green-600 text-red-800"
                >
                  <i className="ri-heart-line"></i> {/* Heart Icon */}
                </button>
              {/* </div> */}

            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCards;
