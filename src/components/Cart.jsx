import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart({cart,setCart}) {
    const navigate = useNavigate();
    
    const removeItem = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    }

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
            <div className="max-w-4xl mx-auto px-5">
                {/* Cart Header */}
                <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                            🛒 Your Shopping Cart
                        </h1>
                        <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                            {cart.length} items
                        </div>
                    </div>
                </div>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-2xl p-16 shadow-xl text-center">
                        <div className="text-6xl mb-6">🛍️</div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty!</h2>
                        <p className="text-lg text-gray-600 mb-8">Add some delicious items to get started</p>
                        <Link 
                            to="/products" 
                            className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-bold hover:-translate-y-1 transition-all duration-300 shadow-lg"
                        >
                            🛒 Start Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className="space-y-6 mb-8">
                            {cart.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                                        <div className="w-24 h-24 mx-auto md:mx-0">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="w-full h-full object-cover rounded-xl"
                                            />
                                        </div>
                                        <div className="md:col-span-2 text-center md:text-left">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.description}</p>
                                            <div className="flex items-baseline justify-center md:justify-start">
                                                <span className="text-emerald-600 text-lg font-bold">₹</span>
                                                <span className="text-2xl font-extrabold text-gray-900 ml-1">{item.price}</span>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button 
                                                onClick={() => removeItem(index)}
                                                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-red-500/30"
                                                title="Remove item"
                                            >
                                                🗑️ Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-transparent bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-border">
                            <div className="bg-white rounded-xl p-6">
                                <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-slate-100">
                                    <div className="text-xl font-semibold text-gray-700">Total Amount:</div>
                                    <div className="flex items-baseline">
                                        <span className="text-2xl text-emerald-600 font-bold">₹</span>
                                        <span className="text-4xl font-extrabold text-gray-900 ml-2">{getTotalPrice()}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => navigate('/payment', { state: { totalAmount: getTotalPrice() } })}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 rounded-2xl font-bold text-xl hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
                                >
                                    💳 Proceed to Pay
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}