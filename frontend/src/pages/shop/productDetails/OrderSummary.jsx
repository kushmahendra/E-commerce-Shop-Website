import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { clearCart } from '../../../redux/features/cart/cartSlice';
import { useClearCartMutation } from '../../../redux/features/cart/cartApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const OrderSummary = () => {
  // const products=useSelector((store)=> store.cart.products);
  // console.log('prd',products)

  const navigate = useNavigate();

  const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector((store) => store.cart);
  console.log('tp', totalPrice);
  // const dispatch=useDispatch()


  const teno = JSON.parse(localStorage.getItem("user"))
  console.log('User:', teno);
  console.log('ajjj', teno._id)

  const [clearCart, { isLoading, isError }] = useClearCartMutation();

  const handleClearCart = async () => {
    if (!teno || !teno._id) {
      console.error('User not found or invalid ID');
      return;
    }

    try {
      await clearCart(teno._id).unwrap(); // Unwrap the result to handle errors explicitly
      // dispatch(clearCart())
      toast.success("Clear cart successfully!", {
        position: "top-right",
        autoClose: 3000, // Time in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light", // 'light', 'dark', or 'colored'
      });

    } catch (error) {
      console.error('Failed to clear the cart:', error);
      toast.error("Failed to clear the cart", {
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


  const handleProceedCheckout = () => {
    navigate('/checkout'); // Replace with your actual checkout route
  };

  return (
    <>
          <ToastContainer />
      <div className='bg-primary-light mt-5 rounded text-base'>
        <div className='px-6 py-4 space-y-5'>
          <h2 className='text-xl text-text-dark '>Order Summary</h2>
          <p className='text-text-dark  mt-2'>Selected Items : {selectedItems}</p>
          <p>Total Price : ${totalPrice.toFixed(2)}</p>
          <p>Tax ({taxRate * 100}%) : ${tax.toFixed(2)}</p>
          <h3 className='font-bold'>Grand Total : ${grandTotal.toFixed(2)}</h3>
        
          <div className='px-4 mb-6'>
            <button onClick={(e) => {
              e.stopPropagation();
              handleClearCart();
            }}
              disabled={isLoading}
              className='bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center  mb-4'>
              <span className='mr-2'>Clear Cart</span>
              <i className="ri-delete-bin-7-fill"></i>
            </button>
            <button
              onClick={handleProceedCheckout}
              className='bg-green-600 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center  '>
              <span className='mr-2'> Proceed Checkout</span>
              <i className="ri-bank-card-line"></i>
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default OrderSummary