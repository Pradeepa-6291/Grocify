import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import homeImg from "../assets/home.png";

export default function ModernGroceryHome({ cart, setCart }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Safe user parsing
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem("user");
  }

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const featuredProducts = products.slice(0, 6);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-emerald-600 to-green-500 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">🛒 GrociFy</Link>

          <div className="flex items-center gap-4">
            {user ? (
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-full font-bold"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="bg-purple-600 text-white px-4 py-2 rounded-full font-bold">
                Login
              </Link>
            )}

            <Link to="/cart" className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold">
              🛍️ Cart ({cart.length})
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-black mb-6">
              Fresh Grocery Delivered
            </h1>
            <Link
              to="/products"
              className="bg-black text-white px-6 py-3 rounded-lg font-bold"
            >
              Shop Now →
            </Link>
          </div>
          <img src={homeImg} alt="Groceries" className="w-full max-w-md mx-auto" />
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-6 gap-6">
          {featuredProducts.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-xl shadow">
              <img src={product.image} alt={product.name} className="h-32 w-full object-cover rounded" />
              <h3 className="font-bold mt-2">{product.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-green-600">₹{product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
