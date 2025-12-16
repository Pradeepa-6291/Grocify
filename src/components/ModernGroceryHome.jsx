import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../utils/api';
import homeImg from "../assets/home.png";

export default function ModernGroceryHome({ cart, setCart }) {

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
    { name: 'Vegetables & Fruits', icon: '🥬', color: 'bg-green-50' },
    { name: 'Beverages', icon: '☕', color: 'bg-amber-50' },
    { name: 'Meats & Seafood', icon: '🥩', color: 'bg-red-50' },
    { name: 'Frozen Foods', icon: '❄️', color: 'bg-blue-50' },
    { name: 'Breakfast', icon: '🥞', color: 'bg-orange-50' },
    { name: 'Pet Food', icon: '🐕', color: 'bg-purple-50' },
    { name: 'Milk & Dairies', icon: '🥛', color: 'bg-pink-50' },
    { name: 'Bakery', icon: '🍞', color: 'bg-yellow-50' }
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
      <section className="pt-28 pb-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              Fresh Food,<br />
              Fair Prices,<br />
              <span className="text-emerald-600">Fast Delivery</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Fresh groceries delivered to your door in 30 minutes.
            </p>

            <Link
              to="/products"
              className="bg-red-500 text-white px-10 py-4 rounded-full font-bold"
            >
              Shop Now →
            </Link>
          </div>

          <div className="flex justify-center">
            <img
              src={homeImg}
              alt="Groceries"
              className="w-96 h-96 object-cover rounded-full shadow-xl"
            />
          </div>

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Shop by Category</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="border rounded-xl p-6 text-center hover:shadow-lg"
              >
                <div className={`${cat.color} w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-4`}>
                  <span className="text-2xl">{cat.icon}</span>
                </div>
                <p className="font-semibold">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12">Top Save Today</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow p-4">
                <img src={product.image} alt={product.name} className="h-32 w-full object-cover rounded" />
                <h3 className="font-semibold mt-3">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-emerald-600 font-bold">₹{product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-emerald-500 text-white w-8 h-8 rounded-full"
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
        © 2024 GrociFy. All rights reserved.
      </footer>

    </div>
  );
}
