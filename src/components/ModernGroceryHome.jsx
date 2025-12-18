import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../utils/api';
import homeImg from "../assets/home.png";

export default function ModernGroceryHome({ cart, setCart }) {
  const navigate = useNavigate();

  // ✅ SAFE USER PARSING (FIXED)
  let user = null;
  try {
    const storedUser = localStorage.getItem('user');
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid user data in localStorage", error);
    localStorage.removeItem('user');
    user = null;
  }

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const featuredProducts = products.slice(0, 6);

  const categories = [
    { name: 'Vegetables & Fruits', icon: '🥬', color: 'bg-green-50', slug: 'fruits' },
    { name: 'Beverages', icon: '☕', color: 'bg-amber-50', slug: 'beverages' },
    { name: 'Meats & Seafood', icon: '🥩', color: 'bg-red-50', slug: 'meats' },
    { name: 'Frozen Foods', icon: '❄️', color: 'bg-blue-50', slug: 'frozen' },
    { name: 'Breakfast', icon: '🥞', color: 'bg-orange-50', slug: 'breakfast' },
    { name: 'Pet Food', icon: '🐕', color: 'bg-purple-50', slug: 'pet' },
    { name: 'Milk & Dairies', icon: '🥛', color: 'bg-pink-50', slug: 'dairy' },
    { name: 'Bakery', icon: '🍞', color: 'bg-yellow-50', slug: 'bakery' }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-emerald-600 to-green-500 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-white">🛒 GrociFy</Link>

            {user && (
              <div className="bg-white/20 px-4 py-2 rounded-full text-white text-sm">
                👋 Welcome, {user.firstName || user.email}
              </div>
            )}

            <div className="hidden md:flex gap-6 text-white font-medium">
              <Link to="/">Home</Link>
              <Link to="/products">Shop</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/add-products">Add Product</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('token');
                  window.location.reload();
                }}
                className="bg-gradient-to-r from-grocify-pink to-red-500 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-pulse"
              >
                🚪 Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-purple-600 text-white px-5 py-2 rounded-full font-bold"
              >
                Login
              </Link>
            )}

            <Link
              to="/cart"
              className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold"
            >
              🛍️ Cart ({cart.length})
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-20 right-10 animate-float">
          <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
            <img src="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=80&h=80&fit=crop" alt="Kiwi" className="w-12 h-12 rounded-lg" />
            <div>
              <p className="font-bold text-sm">Kiwi - 4 pcs</p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xs">★★★★★</span>
                <span className="text-xs text-gray-500">(2000 reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-60 right-32 animate-float-delayed">
          <div className="bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2">
            <div className="bg-green-500 rounded-full p-2">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
            </div>
            <span className="font-semibold text-sm">Delivery Done!</span>
          </div>
        </div>

        <div className="absolute top-32 right-20 animate-bounce-slow">
          <img src="https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=100&h=100&fit=crop" alt="Orange" className="w-20 h-20 rounded-full shadow-lg" />
        </div>

        <div className="absolute bottom-32 right-10 animate-float">
          <div className="bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2">
            <img src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=60&h=60&fit=crop" alt="Avocado" className="w-10 h-10 rounded-lg" />
            <div>
              <p className="font-bold text-xs">Avocado</p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xs">★★★★★</span>
                <span className="text-xs font-bold">4.5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="animate-slide-in-left">
            <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm mb-6 animate-pulse">
              Opening Sale Discount 50%
            </div>
            
            <h1 className="text-6xl font-black text-gray-900 mb-6 leading-tight">
              Fresh Food,<br />
              Fair Prices,<br />
              <span className="text-emerald-600">Fresh Grocery</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Fresh groceries delivered to your doorstep.<br />
              shopping and convenient home delivery.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Shop Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="flex justify-center relative animate-slide-in-right">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-30 animate-spin-slow"></div>
              <img
                src={homeImg}
                alt="Groceries"
                className="w-[500px] h-[500px] object-cover relative z-10 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">Shop by Category</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link
                key={i}
                to={`/products?category=${cat.slug}`}
                className="border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`${cat.color} w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 hover:rotate-12`}>
                  <span className="text-2xl">{cat.icon}</span>
                </div>
                <p className="font-semibold">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 animate-fade-in">Top Save Today</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-md hover:shadow-2xl p-4 transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-lg mb-3 group">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  {product.offer && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {product.offer}
                    </span>
                  )}
                  <button
                    onClick={() => navigate(`/delete-product/${product.id}`)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-7 h-7 rounded-full transition-all duration-300 transform hover:scale-110 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100"
                    title="Delete Product"
                  >
                    🗑️
                  </button>
                </div>
                <h3 className="font-semibold mt-3 text-sm line-clamp-2">{product.name}</h3>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-emerald-600 font-bold text-lg">₹{product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white w-8 h-8 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-90 flex items-center justify-center font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 py-10 text-center text-gray-600">
        © 2024 GrociFy. All rights reserved contact for any queries.
      </footer>

    </div>
  );
}
