import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Link, useSearchParams } from "react-router-dom";

export default function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setFilteredProducts(products.filter(p => p.category === category));
    } else {
      setFilteredProducts(products);
    }
  }, [searchParams, products]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(item => (
          <div key={item._id} className="bg-white rounded-xl shadow p-4">
            <img src={item.image} alt={item.name} className="h-48 w-full object-cover rounded" />
            <h3 className="font-bold mt-2">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
            <div className="flex justify-between items-center mt-3">
              <span className="font-bold text-green-600">₹{item.price}</span>
              <button
                onClick={() => addToCart(item)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
            <Link to={`/product/${item._id}`} className="block mt-3 text-blue-600 font-bold">
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
