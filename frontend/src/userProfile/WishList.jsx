import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddsToCartMutation } from "../redux/features/cart/cartApi";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from "../redux/features/cart/cartSlice";
import { useGetAllWishlistItemsApiQuery, useRemoveFromWishlistApiMutation } from "../redux/features/wishlist/wishlistApi";
// import { removeFromWishlist } from "../redux/features/wishlist/wishlistSlice";


export default function WishList() {
  // const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);
  // const [wishlistItems, setWishlistItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addsToCart, { isLoading }] = useAddsToCartMutation();
  const user = JSON.parse(localStorage.getItem("user")); 
  const userId=user?._id
 
  
  const [wishlistItems, setWishlistItems] = useState([]);
  const {
    data: wishlistProductItems = { wishlist: { items: [] } },
    refetch,
    isLoading: isFetching,
  } = useGetAllWishlistItemsApiQuery(userId);

  const [removeFromWishlist, { isLoading: isRemoving }] = useRemoveFromWishlistApiMutation();
  // const { data: wishlistProductItems=[], isLoading: isFetching, error }= useGetAllWishlistItemsApiQuery(userId);
  // const { data: wishlistItems, isLoading: isFetching, error } = useGetAllWishlistItemsApiQuery(user?._id);
  // const [getAllWishlistItemsApi, {isLoading: isFetching }] = useGetAllWishlistItemsApiQuery();

  useEffect(() => {
    // Refetch wishlist data whenever backend data changes
    if (userId) {
      refetch(); // Refetch data to keep the UI updated whenever there are changes in the backend
    }
  }, [userId, refetch]); // Trigger refetch whenever userId changes or the refetch function itself changes
  
// Sync local wishlistItems state with fetched data
useEffect(() => {
  if (wishlistProductItems?.wishlist?.items) {
    setWishlistItems(wishlistProductItems?.wishlist?.items);
    
  }
}, [wishlistProductItems]);

//   useEffect(() => {
//     const fetchAllWishlistItems = async () => {
//       try {
//         const response = await getAllWishlistItemsApi(userId).unwrap();
//         setWishlistItems(response); // Set the fetched items to state
//       } catch (error) {
//         console.error("Error fetching wishlist items:", error);
//       }
//     };
//    fetchAllWishlistItems();
//   }, [getAllWishlistItemsApi, userId]);

// const wishlistItems=wishlistProductItems.wishlist ||[];
// const wishlistItems = wishlistProductItems?.wishlist?.items || []; 

// refetch(); // Refetch wishlist data to update the UI

//userId, productId, quantity=1, size = 'M',color = "black", image 

  //addtocart

  // const handleAddToCart = async (item.product._id,item.product.sizes[0],item.product.images[0],item.product.color) => {
  //   try {
  //     console.log('Items',item.product._id);
  //     console.log('Size',item.product.sizes[0]);
  //     console.log('image',item.product.images[0]);
  //     console.log('color',item.product.color);
      
  //     const response = await 
  //     addsToCart({ productId:item.product._id, userId,size:item.product.sizes[0],image:item.product.images[0],color:item.product.color}).unwrap();
  //     console.log("Product added to cart:", response);


  // const handleAddToCart = async (item) => {
  // if (!item?.product) return;
  // try {
  // const { _id, sizes, images, color } = item.product;
  //    const response= await addsToCart({
  //       productId: _id,
  //       userId,
  //       size: sizes?.[0] || "M",
  //       image: images?.[0] || "",
  //       color: color || "black",
  //     }).unwrap();
  //     console.log("Product added to cart:", response);
  
  //     // dispatch(addToCart({ ...item, userId: user._id }));
  //     dispatch(addToCart(response));
  
  //     toast.success(`${item?.product?.name} added to cart successfully!`, {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       theme: "light",
  //     });
  //   } catch (error) {
  //     console.error("Error adding product to cart:", error);
  //     toast.error(`Failed to add ${item?.product?.name} to cart. Please try again.`, {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       theme: "light",
  //     });
  //   }
  // };

  const handleVewToCart = async (productId) => {

    
       navigate(`/shop/${productId}`)
      
  };

   // Remove from wishlist
   const handleRemoveFromWishlist = async (item) => {
    try {
      const response = await removeFromWishlist({ productId: item?.product?._id, userId }).unwrap();
 
      
      toast.success(`${item?.product?.name} removed from wishlist`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      refetch(); // Refetch wishlist data to update the UI
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      toast.error(`Failed to remove ${item?.product?.name} from wishlist. Please try again.`, {
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
    navigate('/');
  };


  return (
    <> 
    <div className="mt-20">
      <button
        onClick={handleBack}
        className="px-4 py-1 mt-1 mr-1 border hover:bg-green-700 text-black rounded-lg hover:text-white "
      >
        <i className="ri-arrow-left-line"></i> Back
      </button>
      <div className="flex-1 bg-white rounded-lg shadow-sm  p-6">
        <div className="max-w-full mx-auto">
          <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>
          {wishlistItems?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Your wishlist is empty</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {wishlistItems?.map((item) => (
                <div
                  key={item?.product?._id}
                  // className="bg-white rounded-lg shadow-sm overflow-hidden"
                  className={`relative bg-gradient-to-r from-pink-50 via-pink-50 to-pink-50 text-white rounded-xl shadow-lg 
                    overflow-hidden hover:scale-105 transition-transform duration-300 `}
                >
                  <div className="aspect-square relative">
                    <img
                      src={item?.product?.images[0]}
                      alt={item?.product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-3 ">
                    <h3 className="text-gray-600 text-xl font-semibold">{item?.product?.name}</h3>
                    <p className="text-lg text-green-600">
                      ${item?.product?.price?.toFixed(2)}
                    </p>
                    {/* <p
                      className={`text-sm mb-4 ${
                        item?.product?.stock ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item?.product?.stock ? "In Stock" : "Out of Stock"}
                    </p> */}
                    <div className="flex flex-row justify-between items-center gap-2">
                 
                       <button
                        // className={`w-full py-2 px-4 rounded-md ${
                        //   item?.product?.stock
                        //     ? "bg-blue-600 text-white hover:bg-blue-700"
                        //     : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        // }`}
                        // disabled={!item?.product?.stock || isLoading}
                        onClick={() =>
                          handleVewToCart( item?.product?._id)
                          
                          //  handleAddToCart(item.product._id,item.product.sizes[0],item.product.images[0],item.product.color)
                          }
                          className=" w-full py-1 px-1 rounded-md bg-orange-600 hover:bg-red-600 text-white"
                      >
                        {isLoading ? "Adding..." :<i className="ri-shopping-cart-2-line">Vew</i> }
                      </button>
                      <button
                        // onClick={() => dispatch(removeFromWishlist(item._id))}
                         onClick={() => handleRemoveFromWishlist(item)}
                        className="w-full py-1 px-1 rounded-md bg-black hover:bg-green-600 text-white"
                      >
                    <i className="ri-delete-bin-6-line"></i>
                      </button>
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
