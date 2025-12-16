import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

export default function OrderPlacement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  
  const [orderData, setOrderData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    address: user?.address || '',
    pincode: user?.pincode || '',
    location: ''
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value
    });
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setOrderData({
            ...orderData,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          });
        },
        (error) => {
          alert('Unable to detect location. Please enter manually.');
        }
      );
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to place order');
        navigate('/login');
        return;
      }

      const orderPayload = {
        items: [{
          product: product._id,
          quantity: 1,
          price: product.price
        }],
        totalAmount: product.price,
        deliveryAddress: orderData.address,
        phone: orderData.phone
      };

      const response = await api.createOrder(orderPayload, token);
      
      if (response._id) {
        setOrderPlaced(true);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Order placement error:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grocify-green"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link to="/products" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl p-12 shadow-2xl text-center max-w-2xl border-4 border-green-200">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Order Placed Successfully!
          </h2>
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 mb-8">
            <p className="text-xl text-gray-700 mb-4">
              Your order for <strong className="text-green-700">{product.name}</strong> has been confirmed!
            </p>
            <div className="text-6xl mb-4">🚚</div>
            <p className="text-2xl font-bold text-green-600 mb-2">
              ✨ Will be delivered in 15 minutes! ✨
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left space-y-3">
            <p className="text-gray-700 flex items-center gap-2">
              <span className="text-xl">📍</span>
              <strong>Delivery Address:</strong> {orderData.address}
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <span className="text-xl">📞</span>
              <strong>Phone:</strong> {orderData.phone}
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <span className="text-xl">⏰</span>
              <strong>Expected Delivery:</strong> <span className="text-green-600 font-bold">15 minutes</span>
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/')} 
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
            >
              🏠 Continue Shopping
            </button>
            <button 
              onClick={() => navigate('/products')} 
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
            >
              🛒 Shop More
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Summary */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-emerald-600 text-lg font-bold">₹</span>
                    <span className="text-2xl font-extrabold text-gray-900 ml-1">{product.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Information</h2>
              <form onSubmit={handleOrderSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={orderData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={orderData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address</label>
                  <textarea
                    name="address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={orderData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="location"
                        value={orderData.location}
                        onChange={handleInputChange}
                        placeholder="Latitude, Longitude"
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                      />
                      <button 
                        type="button" 
                        onClick={detectLocation} 
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-3 rounded-xl font-semibold hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
                      >
                        📍 Detect
                      </button>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 mt-8"
                >
                  🛒 Place Order - ₹{product.price}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}