import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);
    
    setTimeout(() => {
      alert('✅ Payment Successful!');
      setProcessing(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fade-in-up">
          <h1 className="text-4xl font-black text-gray-900 mb-8 text-center">
            💳 Payment
          </h1>

          {/* Amount Summary */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 mb-8 text-white">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Total Amount:</span>
              <span className="text-4xl font-black">₹{totalAmount}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Select Payment Method</h3>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  paymentMethod === 'card'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                <div className="text-3xl mb-2">💳</div>
                <div className="font-semibold text-sm">Card</div>
              </button>
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  paymentMethod === 'upi'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                <div className="text-3xl mb-2">📱</div>
                <div className="font-semibold text-sm">UPI</div>
              </button>
              <button
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  paymentMethod === 'cod'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                <div className="text-3xl mb-2">💵</div>
                <div className="font-semibold text-sm">COD</div>
              </button>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment}>
            {paymentMethod === 'card' && (
              <div className="space-y-4 mb-8">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="space-y-4 mb-8">
                <input
                  type="text"
                  placeholder="UPI ID (e.g., name@upi)"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-8">
                <p className="text-yellow-800 font-semibold">
                  💵 Cash on Delivery selected. Pay when you receive your order.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-4 px-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? '⏳ Processing...' : '✅ Complete Payment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
