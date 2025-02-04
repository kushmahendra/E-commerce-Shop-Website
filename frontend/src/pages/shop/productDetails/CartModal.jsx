import React, { useEffect } from 'react'
import OrderSummary from './OrderSummary';
import { createDispatchHook, useDispatch, useSelector } from 'react-redux';
// import { updateQuantity, removeFromCart, addToCart, cartFetch, setProducts, setCartId } from '../../../redux/features/cart/cartSlice';
import { updateQuantity, removeFromCart, addToCart, setProducts, setCartId } from '../../../redux/features/cart/cartSlice';
import { useGetSingleCartQuery, useUpdateCartMutation, useRemoveCartItemMutation } from '../../../redux/features/cart/cartApi';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CartModal = ({products, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const teno = JSON.parse(localStorage.getItem("user"))

  const cart3=useSelector((state) => state?.cart)
  console.log('cart value',cart3)
  

  const { data: cart, isLoading, isError } = useGetSingleCartQuery(teno._id);

  const [updateCart] = useUpdateCartMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  

  // useEffect(() => {
  //   if (cart) {
  //     dispatch(setProducts(cart.items))
  //     dispatch(setCartId(cart._id)); // Store cartId in Redux
  //   }
  // }, [cart])
  console.log('ccartttt', products)
  console.log('bbbbbb', cart)

  const handleQuantity = async (type, id, quan) => {
    const payload = { type, id }

    try {
      if (type === 'decrement') {

        await updateCart({ productId: id, userId: teno._id, quantity: quan - 1 }).unwrap();
      }
      else {
        await updateCart({ productId: id, userId: teno._id, quantity: quan + 1 }).unwrap();

      }
      dispatch(updateQuantity(payload))
      // alert('Product quantity updated successfully!');
      toast.success("Product quantity updated successfully!", {
        position: "top-right",
        autoClose: 3000, // Time in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light", // 'light', 'dark', or 'colored'
      });
    } catch (error) {
      console.error('Error updating product quantity cart:', error);
      // alert('Failed to update product quantity in cart. Please try again.');
      toast.error("Failed to update product quantity in cart. Please try again.", {
        position: "top-right",
        autoClose: 3000, // Time in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light", // 'light', 'dark', or 'colored'
      });
    }

  }

  // const fetchCart = async()=>{
  //   try {
  //     const response =await getSingleCart(teno._id)
  //     console.log('fsf',response);
  //   } catch (error) {
  //     console.error('Error',error)
  //   }
  // }

  // useEffect(()=>{
  // fetchCart();
  // },[])

  const handleRemove = async (e, id) => {
    e.preventDefault()
    try {

      await removeCartItem({ productId: id, userId: teno._id }).unwrap();

      dispatch(removeFromCart({ id }))
      // alert('Product removed successfully!');
      toast.success("Product removed successfully!", {
        position: "top-right",
        autoClose: 3000, // Time in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light", // 'light', 'dark', or 'colored'
      });
    } catch (error) {
      console.error('Error removed product:', error);
      // alert('Failed to remove product. Please try again.');
      toast.error("Failed to remove product. Please try again", {
        position: "top-right",
        autoClose: 3000, // Time in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light", // 'light', 'dark', or 'colored'
      });
    }
  }

  if (isLoading) {
    return <p>Loading cart...</p>;
  }

  if (isError) {
    // return <p>Error fetching cart: {error?.data?.message || 'Something went wrong!'}</p>;
    return <p>Error fetching cart: {'Something went wrong!'}</p>;
  }

  // if (!products || products?.items?.length === 0) {
  //   return <p>Your cart is empty.</p>;
  // }
  // console.log('kuch to hua h',cart)
  // const n = 0;

  // console.log('\safhasjkfhsajkfhk', products[0]?.product?.images[0])
  return (
    <>
 
      <div
        className={`fixed z-[1000] inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className={`fixed right-0 top-0 md:w-1/2 w-full bg-white h-full overflow-y-auto transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        // style={{ transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
        >
          <div className='p-4 mt-4'>
            <div className='flex justify-between items-center mb-4'>
              <h4 className='text-xl font-semibold'>Your Cart</h4>
              <button onClick={() => onClose()} className='text-gray-600 hover:text-gray-900'>
                <i className="ri-xrp-fill bg-black p-1 text-white "></i>
              </button>
            </div>

            {/* cart details */}

            <div className='cart-items'>
              {(!cart || cart?.items?.length === 0) ? (<div>Your cart is empty</div>) : (

                cart?.items?.length>0 && cart?.items?.map((item, index) => (
                  <div key={index} className='flex flex-col md:flex-row md:item-center md:justify-between shadow-md md:p-5 p-2 mb-4
                items-center justify-between  '>

                    <div className='flex flex-row items-center justify-between ' >
                      <span className='mr-4 px-1 bg-primary text-white rounded-full'>0 {index + 1}</span>
                      {/* <img src={item.product.image} alt="" className='size-12 object-cover mr-4' /> */}
                      <img src={item && item?.product?.images[0]} alt="" className='size-16 object-cover mr-4' />

                     <div className='flex flex-col gap-'>

                      <div className='' >
                        <h5 className='text-xl font-medium'>{item?.product?.name}</h5>
                        {/* <h5 className='text-lg font-medium'>
                          {item.product.name.length > 16
                            ? `${item.product.name.slice(0, 16)}...`
                            : item.product.name}
                        </h5> */}
                        {/* <p className='text-gray-600 text-lg'>${Number(item?.product?.price).toFixed(2)}</p> */}
                      </div>

                      <div className='flex flex-row' >
                        <h5 className='text-sm font-medium text-gray-800'>Size : <span className='text-gray-500'>{item?.product?.sizes} , </span></h5>
                      
                        <p className='text-gray-800  font-medium  text-sm'> Color : <span className='text-gray-500'>{item?.product?.color}</span></p>
                      </div>

                      <p ><span className='text-gray-600 text-sm'>${Number(item?.product?.price).toFixed(2)}</span></p>
                      </div>
                    </div>

                    <div className='flex flex-row md:justify-start justify-end items-center mt-2'>

                      <button onClick={() => handleQuantity('decrement', item.product._id, item.quantity)} className='size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary 
                     hover:text-white ml-8'>-</button>

                      <span className='px-2  text-center mx-1'>{item.quantity}</span>
                      <button onClick={() => handleQuantity('increment', item.product._id, item.quantity)} className='size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary 
                     hover:text-white '>+</button>

                      <div className='ml-5'>
                        <button onClick={(e) => handleRemove(e, item.product._id)}
                          className='text-red-500 hover:text-red-800 mr-4'> <i className="ri-delete-bin-7-fill"></i></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* calculation */}
            {
              // products?.length > 0 && (<OrderSummary />)
              cart?.items?.length > 0 && (<OrderSummary />)
            }
          </div>
        </div>

      </div>
    </>
  );
}

export default CartModal





// import React, { useEffect } from 'react'
// import OrderSummary from './OrderSummary';
// import { createDispatchHook, useDispatch, useSelector } from 'react-redux';
// import { updateQuantity, removeFromCart, addToCart, cartFetch, setProducts, setCartId } from '../../../redux/features/cart/cartSlice';
// import { useGetSingleCartQuery, useUpdateCartMutation, useRemoveCartItemMutation } from '../../../redux/features/cart/cartApi';
// import {  toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const CartModal = ({ isOpen, onClose }) => {
//   const dispatch = useDispatch();
//   const teno = JSON.parse(localStorage.getItem("user"))
//   const products = useSelector((state) => state.cart.products)
//   const { data: cart, isLoading, isError } = useGetSingleCartQuery(teno._id);

//   const [updateCart] = useUpdateCartMutation();
//   const [removeCartItem] = useRemoveCartItemMutation();

//   useEffect(() => {
//     if (cart) {
//       dispatch(setProducts(cart.items))
//       dispatch(setCartId(cart._id)); // Store cartId in Redux
//     }
//   }, [cart])
//   console.log('cartttt',cart) 

//   const handleQuantity = async (type, id, quan) => {
//     const payload = { type, id }

//     try {
//       if (type === 'decrement') {

//         await updateCart({ productId: id, userId: teno._id, quantity: quan - 1 }).unwrap();
//       }
//       else {
//         await updateCart({ productId: id, userId: teno._id, quantity: quan + 1 }).unwrap();

//       }
//       dispatch(updateQuantity(payload))
//       // alert('Product quantity updated successfully!');
//       toast.success("Product quantity updated successfully!", {
//         position: "top-right",
//         autoClose: 3000, // Time in milliseconds
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "light", // 'light', 'dark', or 'colored'
//       });
//     } catch (error) {
//       console.error('Error updating product quantity cart:', error);
//       // alert('Failed to update product quantity in cart. Please try again.');
//       toast.error("Failed to update product quantity in cart. Please try again.", {
//         position: "top-right",
//         autoClose: 3000, // Time in milliseconds
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "light", // 'light', 'dark', or 'colored'
//       });
//     }

//   }

//   // const fetchCart = async()=>{
//   //   try {
//   //     const response =await getSingleCart(teno._id)
//   //     console.log('fsf',response);
//   //   } catch (error) {
//   //     console.error('Error',error)
//   //   }
//   // }

//   // useEffect(()=>{
//   // fetchCart();
//   // },[])

//   const handleRemove = async (e, id) => {
//     e.preventDefault()
//     try {

//       await removeCartItem({ productId: id, userId: teno._id }).unwrap();

//       dispatch(removeFromCart({ id }))
//       // alert('Product removed successfully!');
//       toast.success("Product removed successfully!", {
//         position: "top-right",
//         autoClose: 3000, // Time in milliseconds
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "light", // 'light', 'dark', or 'colored'
//       });
//     } catch (error) {
//       console.error('Error removed product:', error);
//       // alert('Failed to remove product. Please try again.');
//       toast.error("Failed to remove product. Please try again", {
//         position: "top-right",
//         autoClose: 3000, // Time in milliseconds
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "light", // 'light', 'dark', or 'colored'
//       });
//     }
//   }

//   if (isLoading) {
//     return <p>Loading cart...</p>;
//   }

//   if (isError) {
//     // return <p>Error fetching cart: {error?.data?.message || 'Something went wrong!'}</p>;
//     return <p>Error fetching cart: {'Something went wrong!'}</p>;
//   }

//   if (!products || products?.items?.length === 0) {
//     return <p>Your cart is empty.</p>;
//   }
//   // console.log('kuch to hua h',cart)
//   return (
//     <>
//   
//       <div
//         className={`fixed z-[1000] inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//           }`}
//       >
//         <div className={`fixed right-0 top-0 md:w-1/2 w-full bg-white h-full overflow-y-auto transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
//           }`}
//         // style={{ transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
//         >
//           <div className='p-4 mt-4'>
//             <div className='flex justify-between items-center mb-4'>
//               <h4 className='text-xl font-semibold'>Your Cart</h4>
//               <button onClick={() => onClose()} className='text-gray-600 hover:text-gray-900'>
//                 <i className="ri-xrp-fill bg-black p-1 text-white "></i>
//               </button>
//             </div>

//             {/* cart details */}

//             <div className='cart-items'>
//               {/* {products?.length === 0 ? (<div>Your cart is empty</div>) : ( */}
//               {(!products || products.length === 0) ? (<div>Your cart is empty</div>) : (

//                 products?.map((item, index) => (
//                   <div key={index} className='flex flex-col md:flex-row md:item-center md:justify-between shadow-md md:p-5 p-2 mb-4
//                 items-center justify-between  '>
              
//                     <div className='flex flex-row items-center justify-between ' > 
//                       <span className='mr-4 px-1 bg-primary text-white rounded-full'>0 {index + 1}</span>
//                       {/* <img src={item.product.image} alt="" className='size-12 object-cover mr-4' /> */}
//                       <img src={item.product.images[0]} alt="" className='size-12 object-cover mr-4' />
                    
//                       <div className='flex flex-col' >
//                         <h5 className='text-lg font-medium'>{item.product.name}</h5>
//                         {/* <h5 className='text-lg font-medium'>
//                           {item.product.name.length > 16
//                             ? `${item.product.name.slice(0, 16)}...`
//                             : item.product.name}
//                         </h5> */}
//                         <p className='text-gray-600 text-sm'>${Number(item.product.price).toFixed(2)}</p>
//                         </div>
//                       </div>

//                       <div className='flex flex-row md:justify-start justify-end items-center mt-2'>

//                         <button onClick={() => handleQuantity('decrement', item.product._id, item.quantity)} className='size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary 
//                      hover:text-white ml-8'>-</button>

//                         <span className='px-2  text-center mx-1'>{item.quantity}</span>
//                         <button onClick={() => handleQuantity('increment', item.product._id, item.quantity)} className='size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary 
//                      hover:text-white '>+</button>

//                         <div className='ml-5'>
//                           <button onClick={(e) => handleRemove(e, item.product._id)}
//                             className='text-red-500 hover:text-red-800 mr-4'> <i className="ri-delete-bin-7-fill"></i></button>
//                         </div>
//                       </div>
//                   </div>
//                 ))
//               )}
//             </div>
//             {/* calculation */}
//             {
//               products?.length > 0 && (<OrderSummary />)
//             }
//           </div>
//         </div>

//       </div>
//     </>
//   );
// }

// export default CartModal