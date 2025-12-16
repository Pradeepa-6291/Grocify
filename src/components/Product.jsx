import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";

const categoryColors = {
  chocolate: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
  noodles: 'linear-gradient(135deg, #FF6B35 0%, #FCD34D 100%)',
  pasta: 'linear-gradient(135deg, #00D084 0%, #3B82F6 100%)',
  snacks: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)'
};

const categoryIcons = {
  chocolate: '🍫',
  noodles: '🍜',
  pasta: '🍝',
  snacks: '🍪'
};

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🚫 Product not found</h2>
          <Link to="/products" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:-translate-y-1 transition-all duration-300 shadow-lg">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-5">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-8 flex items-center justify-center relative">
              <div className="relative max-w-md">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-2xl shadow-xl"
                />
                <div 
                  className="absolute top-4 left-4 px-4 py-2 rounded-full text-white font-bold backdrop-blur-sm"
                  style={{ background: categoryColors[product.category] }}
                >
                  {categoryIcons[product.category]} {product.category}
                </div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold animate-bounce">
                  🎉 {product.offer}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-12 flex flex-col justify-center">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-4">
                {product.name}
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">{product.description}</p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-2xl text-emerald-600 font-bold">₹</span>
                <span className="text-5xl font-extrabold text-gray-900 ml-2">{product.price}</span>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-lg font-semibold text-gray-700">
                  <span className="text-2xl">✅</span>
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center gap-3 text-lg font-semibold text-gray-700">
                  <span className="text-2xl">🚚</span>
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-3 text-lg font-semibold text-gray-700">
                  <span className="text-2xl">💯</span>
                  <span>100% Fresh</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Link 
                  to={`/buynow/${product._id}`} 
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 rounded-2xl font-bold text-lg text-center hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
                >
                  ⚡ Buy Now
                </Link>
                <Link 
                  to="/products" 
                  className="flex-1 bg-gradient-to-r from-purple-500 to-yellow-400 text-white py-4 px-6 rounded-2xl font-bold text-lg text-center hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
                >
                  ← Back to Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}