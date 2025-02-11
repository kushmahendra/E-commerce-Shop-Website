import { useState } from 'react';
import { CreditCard, Wallet, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../../../redux/features/orders/orderApi';
import { addOrder } from '../../../redux/features/orders/orderSlice';
import { useClearCartMutation, useGetSingleCartQuery } from '../../../redux/features/cart/cartApi';
import PlaceHolder from './PlaceHolder';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // adresss
  // const addresses = useSelector((state) => state.auth.addresses);
  const  localUser=JSON.parse(localStorage.getItem('user'))
  const addresses =localUser.addresses
  console.log('add',addresses );
  
  const [selectedAddress, setSelectedAddress] = useState(null); 
 

  const [formData, setFormData] = useState({
    address:"",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressSelect = (address) => {
    setFormData({
      address:address.addressName,
      streetAddress: address.streetAddress,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
    });
    setIsPopupOpen(false);
  };
//address

  const navigate=useNavigate();
  const dispatch = useDispatch();



 const teno = JSON.parse(localStorage.getItem("user"))
     
     const { data: cart,  } = useGetSingleCartQuery(teno._id);
     console.log('checkout cartdata',cart);

    const userId=teno._id

  const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation();
  
    const [clearCart] = useClearCartMutation();
  


const addressInfo2= localUser.addresses[0];
  console.log('User ID:', userId);
  // console.log('Total Amount:', cart.grandTotal);


// Ensure `cart` exists before accessing properties
const items = cart?.items?.map((item) => ({
  product: { ...item.product }, // Spread product properties
  quantity: item.quantity || 1,
  totalPrice: item.totalPrice || item.product.price * (item.quantity || 1),
})) || [];

const taxRate = 0.05;
const grandTotal=cart?.totalCartPrice + taxRate

console.log('grandTotal',grandTotal);

console.log("Items:", items);

  // Function to handle address selection
  const handleAddressSelected = (address) => {
    setSelectedAddress(address);
  };


  const newOrder = {
    userId,
    items, // Array of items from the products
    totalAmount: grandTotal,
    addressInfo:selectedAddress || addressInfo2,
    paymentMethod: selectedMethod,
  };
  console.log('addressInfo:', selectedAddress);
  

//   const userId = useSelector((state) => state.auth.user._id);
//   const cart = useSelector((state) => state.cart); 
//   // const addresses = useSelector((state) => state.auth.addresses);
//   // const addressInfo=addresses[0];
// console.log('cc',cart);

//   console.log('cccrtid',cart.cartId);
//   console.log('crtuserid',cart.user);
  
  
//     const [clearCart] = useClearCartMutation();
  
// const  localUser=JSON.parse(localStorage.getItem('user'))

// const addressInfo= localUser.addresses[0];
//   console.log('User ID:', userId);
//   console.log('Total Amount:', cart.grandTotal);
//   console.log('addressInfo:', addressInfo);

// const items = cart.products.map((product) => ({
//   product: {
//     ...product, // Spread the product object to directly copy all its properties
//   },
//   quantity: product.quantity || 1,
//   totalPrice: product.totalPrice || product.price * (product.quantity || 1),
// }));


// console.log('Items:', items);


//   const newOrder = {
//     userId,
//     items, // Array of items from the products
//     totalAmount: cart.grandTotal, 
//     addressInfo,
//     paymentMethod: selectedMethod,
//   };
  


  // const teno = JSON.parse(localStorage.getItem("user"))
  const handleOrderSubmit = async () => {
    if (!selectedMethod) {
      // alert('Please select a payment method.');
      toast.info("Please select a payment method.", { position: "top-right", autoClose: 2000 });

      return;
    }

    try {
      const result = await createOrder(newOrder).unwrap();
      console.log('Order created successfully:', result);
      dispatch(addOrder(result));
      // alert('Order placed successfully!');
          toast.success("Order placed successfully!", { position: "top-right", autoClose: 2000 });

  
      navigate('/ordered');
      await clearCart(userId).unwrap(); 
    } catch (err) {
      console.error('Error creating order:', err);
      // alert('Failed to place the order. Please try again.');
        toast.error("Failed to place the order. Please try again.", { position: "top-right", autoClose: 2000 });
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.join(' ');
  };

  const handleBack=()=>
  {
    navigate('/')
  }

  return (
    <>  
    <div className='mt-20'>
   <button onClick={handleBack} className='px-2 py-1 mt-2 mx-4 bg-green-500 hover:bg-orange-500 text-white rounded-lg '><i className="ri-arrow-left-line">Back</i></button>
    
    <div className='flex flex-row justify-between mx-24 px-24 md:flex-row-2 '>


      {/* address */}
      <div>
      <div className="max-w-xl bg-red-50 rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-red-500 p-6">
        <h2 className="text-2xl font-bold text-white">Address</h2>
      </div>

      {/* Form */}
      <form className="p-6 space-y-6">
      <div>
          <input
            type="text"
            name="Address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={formData.streetAddress}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Select Address Button */}
        <button
          type="button"
          onClick={() => setIsPopupOpen(true)}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Select Address
        </button>
      </form>

      {/* Address Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-800  bg-opacity-60 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-98">
            <h2 className="text-xl font-bold mb-4">Select an Address</h2>
            <ul className="space-y-2">
              {addresses.map((address, index) => (
                <div className="flex flex-row gap-2">
                  <div className="font-semibold px-4 pt-2 border bg-yellow-100 text-center">{index + 1} </div>
                  <li
                    key={index}
                    className="p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
                    onClick={() =>{ handleAddressSelect(address);
                      handleAddressSelected(address);
                    }}
                   

                  >
                    {address.addressName}: {address.streetAddress}, {address.city}, {address.state}, {address.zipCode}, {address.country}

                  </li>
                </div>
              ))}
            </ul>
            <button
              onClick={() => setIsPopupOpen(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
      </div>
 
    
    {/* payment */}
    <div className=" bg-gray-50 py-1 ">
      <div className="max-w-full mx-auto mx-6 bg-red-50 rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6  ">
          <h1 className="text-2xl font-bold text-white ">Payment Method</h1>
          <p className="text-rose-100 mt-1">Choose how you'd like to pay</p>
        </div>

        {/* Order Summary */}
        <div className="p-6 bg-rose-100 ">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Order Total</span>
            <span className="text-xl font-bold text-gray-900">${grandTotal}</span>
          </div>
        </div>
       
        {/* Payment Methods */}
        <div className="p-6 space-y-4">
          {/* Credit Card Option */}
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedMethod === 'card'
                ? 'border-rose-500 bg-rose-50'
                : 'border-gray-200 hover:border-rose-200'
            }`}
            onClick={() => setSelectedMethod('Credit Card')}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-rose-100 p-2 rounded-full">
                <CreditCard className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Credit Card</h3>
                <p className="text-sm text-gray-500">Pay with Visa, Mastercard</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
            </div>
          </div>

          {/* Cash on Delivery */}
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedMethod === 'cash'
                ? 'border-rose-500 bg-rose-50'
                : 'border-gray-200 hover:border-rose-200'
            }`}
            onClick={() => setSelectedMethod('Cash On Delivery')}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-rose-100 p-2 rounded-full">
                <Wallet className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Cash on Delivery</h3>
                <p className="text-sm text-gray-500">Pay when you receive</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
            </div>
          </div>

          {/* Credit Card Form */}
          {selectedMethod === 'card' && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    maxLength={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Pay Button */}
          <button
            className={`w-full mt-6 py-3 px-4 rounded-lg text-white font-medium transition-colors ${
              selectedMethod
                ? 'bg-rose-500 hover:bg-rose-600'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!selectedMethod}
            onClick={handleOrderSubmit}
          >
            {selectedMethod === 'Credit Card'
              ? `Pay ${grandTotal}`
              : selectedMethod === 'Cash On Delivery'
              ? 'Place Order'
              : 'Select Payment Method'}
          </button>
        </div>
      </div>

    </div>
 </div>
 </div>
    </>
  );
}
