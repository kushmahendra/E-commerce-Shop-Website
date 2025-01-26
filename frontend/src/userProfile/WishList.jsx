import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddsToCartMutation } from "../redux/features/cart/cartApi";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from "../redux/features/cart/cartSlice";
// import { removeFromWishlist } from "../redux/features/wishlist/wishlistSlice";



export default function WishList() {
  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addsToCart, { isLoading }] = useAddsToCartMutation();
  const user = JSON.parse(localStorage.getItem("user")); 

  //addtocart
  const handleAddToCart = async (item) => {
    try {
      const response = await addsToCart({ ...item, userId: user._id }).unwrap();
      console.log("Product added to cart:", response);
  
      dispatch(addToCart({ ...item, userId: user._id }));
  
      toast.success(`${item.name} added to cart successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error(`Failed to add ${item.name} to cart. Please try again.`, {
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
  

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <ToastContainer />
 
    <div>
      <button
        onClick={handleBack}
        className="px-4 py-1 mt-1 mr-1 border hover:bg-green-700 text-black rounded-lg"
      >
        <i className="ri-arrow-left-line"></i> Back
      </button>
      <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>
          {wishlistItems?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Your wishlist is empty</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="aspect-square relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2">{item.name}</h3>
                    <p className="text-lg font-semibold mb-2">
                      ${item.price.toFixed(2)}
                    </p>
                    <p
                      className={`text-sm mb-4 ${
                        item.stock ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.stock ? "In Stock" : "Out of Stock"}
                    </p>
                    <div className="space-y-2">
                 
                       <button
                        className={`w-full py-2 px-4 rounded-md ${
                          item.stock
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!item.stock || isLoading}
                        onClick={() => handleAddToCart(item)}
                      >
                        {isLoading ? "Adding..." : "Add to Cart"}
                      </button>
                      {/* <button
                        onClick={() => dispatch(removeFromWishlist(item._id))}
                        className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Remove
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
