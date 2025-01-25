import React, { useEffect, useState } from "react"
import { CheckIcon, TruckIcon, CreditCardIcon } from "lucide-react"

const PaymentPage = () => {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                <CheckIcon className="w-12 h-12 text-green-500 animate-check" />
              </div>
              {showConfetti && <Confetti />}
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Payment Successful!</h1>
          <p className="text-center text-gray-600 mb-8">Thank you for your purchase. Your order is on its way!</p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <CreditCardIcon className="w-6 h-6 text-blue-500 mr-3" />
                <span className="font-medium">Payment Method</span>
              </div>
              <span className="text-gray-600">RazorPay ...</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <TruckIcon className="w-6 h-6 text-blue-500 mr-3" />
                <span className="font-medium">Estimated Delivery</span>
              </div>
              <span className="text-gray-600">June 24, 2024</span>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => (window.location.href = "/shop")}
              className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold transform transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">$89.99</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">$5.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">$7.20</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold">$102.19</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Confetti = () => (
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(50)].map((_, index) => (
      <div
        key={index}
        className="absolute w-2 h-2 bg-blue-500 rounded-full animate-confetti"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ))}
  </div>
)

export default PaymentPage

