import { useState } from 'react'
import api from '../utils/api'

export default function AddProducts() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("chocolate")
  const [offer, setOffer] = useState("")
  const [stock, setStock] = useState("0")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const productData = {
        name,
        description,
        price: Number(price),
        image,
        category,
        offer,
        stock: Number(stock)
      }

      const result = await api.createProduct(productData)
      
      if (result._id) {
        alert("Product added successfully")
        setName("")
        setDescription("")
        setPrice("")
        setImage("")
        setCategory("chocolate")
        setOffer("")
        setStock("0")
      } else {
        alert("Failed to add product")
      }

    } catch (error) {
      console.log(error)
      alert("Server error")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-grocify-green">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Product Name" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-grocify-green"
          required
        />
        <textarea 
          placeholder="Product Description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-grocify-green h-24 resize-none"
          required
        />
        <input 
          type="number" 
          placeholder="Price" 
          value={price}
          onChange={(e) => setPrice(e.target.value)} 
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-grocify-green"
          required
        />
        <input 
          type="url" 
          placeholder="Image URL" 
          value={image}
          onChange={(e) => setImage(e.target.value)} 
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-grocify-green"
          required
        />
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)} 
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-grocify-green"
          required
        >
          <option value="chocolate">Chocolate</option>
          <option value="noodles">Noodles</option>
          <option value="pasta">Pasta</option>
          <option value="snacks">Snacks</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="dairy">Dairy</option>
          <option value="beverages">Beverages</option>
        </select>
        <input 
          type="text" 
          placeholder="Offer (e.g., 25% OFF)" 
          value={offer}
          onChange={(e) => setOffer(e.target.value)} 
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-grocify-green"
        />
        <input 
          type="number" 
          placeholder="Stock Quantity" 
          value={stock}
          onChange={(e) => setStock(e.target.value)} 
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-grocify-green"
          required
        />
        <button 
          type="submit"
          className="w-full bg-grocify-green text-white py-3 px-4 rounded-md hover:bg-green-600 transition duration-200 font-semibold"
        >
          Add Product
        </button>
      </form>
    </div>
  )
}