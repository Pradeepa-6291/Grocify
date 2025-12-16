import { useEffect } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Products from './components/Products';
import ModernGroceryHome from './components/ModernGroceryHome';
import Product from './components/Product';
import Cart from './components/Cart';
import PremiumLogin from './components/PremiumLogin';
import PremiumAbout from './components/PremiumAbout';
import Contact from './components/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import OrderPlacement from './components/OrderPlacement';
import AddProducts from './components/AddProducts';

function App() {
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {!isHomePage && (
        <header className="bg-white shadow-2xl sticky top-0 z-50 border-b-4 border-gradient-to-r from-emerald-500 to-blue-500">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-5 py-4">
            <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
              🛒 GrociFy
            </Link>
            <nav className="flex items-center gap-8">
              <Link to="/" className="text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-emerald-600 hover:-translate-y-0.5 transition-all">Home</Link>
              <Link to="/products" className="text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-emerald-600 hover:-translate-y-0.5 transition-all">Shop</Link>
              <Link to="/about" className="text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-emerald-600 hover:-translate-y-0.5 transition-all">About</Link>
              <Link to="/contact" className="text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-emerald-600 hover:-translate-y-0.5 transition-all">Contact</Link>
              <Link to="/add-products" className="text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-emerald-600 hover:-translate-y-0.5 transition-all">Add Product</Link>
              <Link to="/login" className="text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-emerald-600 hover:-translate-y-0.5 transition-all">Login</Link>
              <Link to="/cart" className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-3 rounded-full font-semibold hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-orange-500/30">
                🛍️ Cart ({cart.length})
              </Link>
            </nav>
          </div>
        </header>
      )}

      <main className={isHomePage ? "" : "max-w-6xl mx-auto px-5 py-8"}>
        <Routes>
          <Route path="/" element={<ModernGroceryHome cart={cart} setCart={setCart} />} />
          <Route path="/products" element={<Products cart={cart} setCart={setCart} />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<PremiumAbout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart cart={cart} setCart={setCart} />
            </ProtectedRoute>
          } />
          <Route path="/buynow/:id" element={
            <ProtectedRoute>
              <OrderPlacement />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<PremiumLogin />} />
          <Route path="/add-products" element={<AddProducts />} />
          
        </Routes>
      </main>
    </div>
  );
}

export default App;
