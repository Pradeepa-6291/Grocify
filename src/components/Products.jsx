import React, { useState, useEffect } from "react";
import api, { products as fallbackProducts } from "../utils/api";
import { Link } from "react-router-dom";

const categoryIcons = {
  chocolate: '🍫',
  noodles: '🍜',
  pasta: '🍝',
  snacks: '🍪'
};

export default function Products({setCart,cart}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const categories = [...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grocify-green mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-16 text-center">
        <div className="max-w-6xl mx-auto px-5">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">🌟 Fresh Groceries Delivered! 🌟</h1>
          <p className="text-xl opacity-90">Premium quality products at unbeatable prices</p>
        </div>
      </div>

      {/* Categories */}
      <div className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(category => (
              <div key={category} className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl text-center hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer border-2 border-transparent hover:border-emerald-500">
                <span className="text-4xl block mb-3">{categoryIcons[category]}</span>
                <h3 className="font-bold text-gray-900">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">All Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-emerald-500">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500">
                    {categoryIcons[item.category]} {item.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    {item.offer}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.description}</p>
                  
                  <div className="flex items-baseline mb-6">
                    <span className="text-emerald-600 text-lg font-bold">₹</span>
                    <span className="text-2xl font-extrabold text-gray-900 ml-1">{item.price}</span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link 
                      to={`/product/${item._id}`} 
                      className="flex-1 bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white py-3 px-4 rounded-2xl font-bold text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-400/40"
                    >
                      View Details
                    </Link>
                    <button 
                      onClick={() => addToCart(item)}
                      className="flex-1 bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white py-3 px-4 rounded-2xl font-bold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-400/40"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}