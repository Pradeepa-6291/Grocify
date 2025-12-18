import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black text-gray-900">
            🗑️ Manage Products
          </h1>
          <button
            onClick={fetchProducts}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
          >
            🔄 Refresh
          </button>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 shadow-xl text-center">
            <div className="text-6xl mb-6">📦</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No products found</h2>
            <p className="text-lg text-gray-600">Add some products to get started</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id || product.id} className="bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition-all duration-300">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="h-40 w-full object-cover rounded-lg mb-3" 
                />
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-emerald-600 font-bold text-xl mb-4">₹{product.price}</p>
                <button
                  onClick={() => navigate(`/delete-product/${product._id || product.id}`)}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-2 px-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
                >
                  🗑️ Delete Product
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
