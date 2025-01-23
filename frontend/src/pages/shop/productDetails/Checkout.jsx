import { useState } from 'react';
import { CreditCard, Wallet, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../../../redux/features/orders/orderApi';
import { addOrder } from '../../../redux/features/orders/orderSlice';
import { useClearCartMutation } from '../../../redux/features/cart/cartApi';

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const navigate=useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation();

  const userId = useSelector((state) => state.auth.user._id);
  const totalAmount = useSelector((state) => state.cart.grandTotal);
  const cartId = useSelector((state) => state.cart.cartId);
  const addresses = useSelector((state) => state.auth.addresses);

    const [clearCart] = useClearCartMutation();
  
   const addressInfo=addresses[0];
   const items=[cartId]
  console.log('User ID:', userId);
  console.log('Total Amount:', totalAmount);
  console.log('items:', items);
  console.log('addressInfo:', addressInfo);

  const newOrder = {
    userId,
    items,
    totalAmount,
    addressInfo,
    paymentMethod: selectedMethod,
  };
  const teno = JSON.parse(localStorage.getItem("user"))
  const handleOrderSubmit = async () => {
    if (!selectedMethod) {
      alert('Please select a payment method.');
      return;
    }

    try {
      const result = await createOrder(newOrder).unwrap();
      console.log('Order created successfully:', result);
      dispatch(addOrder(result));
      alert('Order placed successfully!');
  
      navigate('/ordered');
      await clearCart(teno._id).unwrap(); 
    } catch (err) {
      console.error('Error creating order:', err);
      alert('Failed to place the order. Please try again.');
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
   <button onClick={handleBack} className='px-2 py-1 mt-2 mx-4 bg-green-500 hover:bg-orange-500 text-white rounded-lg '><i className="ri-arrow-left-line">Back</i></button>
    {/* payment */}
    <div className="min-h-screen bg-gray-50 py-1 ">
      <div className="max-w-md mx-auto bg-yellow-100 rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6">
          <h1 className="text-2xl font-bold text-white">Payment Method</h1>
          <p className="text-rose-100 mt-1">Choose how you'd like to pay</p>
        </div>

        {/* Order Summary */}
        <div className="p-6 bg-rose-50">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Order Total</span>
            <span className="text-xl font-bold text-gray-900">${totalAmount}</span>
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
            onClick={() => setSelectedMethod('card')}
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
            onClick={() => setSelectedMethod('cash')}
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
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!selectedMethod}
            onClick={handleOrderSubmit}
          >
            {selectedMethod === 'card'
              ? `Pay ${totalAmount}`
              : selectedMethod === 'cash'
              ? 'Place Order'
              : 'Select Payment Method'}
          </button>
        </div>
      </div>

    </div>
 
    </>
  );
}
