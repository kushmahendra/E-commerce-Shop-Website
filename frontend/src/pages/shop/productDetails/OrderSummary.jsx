import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { clearCart } from '../../../redux/features/cart/cartSlice';
import { useClearCartMutation, useGetSingleCartQuery } from '../../../redux/features/cart/cartApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const OrderSummary = () => {
  // const products=useSelector((store)=> store.cart.products);
  // console.log('prd',products)

  const navigate = useNavigate();
   const teno = JSON.parse(localStorage.getItem("user"))
    
    const { data: cart,  } = useGetSingleCartQuery(teno._id);
    console.log('cartdata',cart);
    

  const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector((store) => store.cart)


  // // Set tax rate (modify as needed)
  // const taxRate = 0.05; // 5%

  // // Ensure cart data exists before calculating
  // const selectedItems = cart?.items?.length || 0;

  // const totalPrice = cart?.items?.reduce(
  //   (total, item) => total + item.quantity * item.product.price, 
  //   0
  // ) || 0;

  // const tax = totalPrice * taxRate;
  // const grandTotal = totalPrice + tax;

  // console.log('Values:', selectedItems, totalPrice, tax, taxRate, grandTotal);

  console.log('tp', totalPrice);
  // const dispatch=useDispatch()
console.log('values', selectedItems, totalPrice, tax, taxRate, grandTotal);

  

  // const teno = JSON.parse(localStorage.getItem("user"))
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
  
           <div className="flex justify-between text-sm">
            <span>Selected Items : </span>
            <span>{selectedItems}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Total Price:</span>
            <span> ${totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Tax ({taxRate * 100}%):</span>
            <span> ${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-semibold pt-2 border-t">
            <span>Grand Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          {/* <div className='px-4 mb-6'> */}
          <div className="mt-6 space-y-3">
            <button onClick={(e) => {
              e.stopPropagation();
              handleClearCart();
            }}
              disabled={isLoading}
              className="w-full py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center space-x-2">
              <span className='mr-'>Clear Cart</span>
              <i className="ri-delete-bin-7-fill"></i>
            </button>
            <button
              onClick={handleProceedCheckout}
              // className='bg-green-600 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center  '>
              className="w-full py-1  bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center">
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