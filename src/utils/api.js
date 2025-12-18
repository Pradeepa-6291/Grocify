const API_BASE_URL = 'http://localhost:5000/api';

// Test backend connectivity
const testBackend = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/test`);
    const data = await response.json();
    console.log('✅ Backend test:', data);
    return true;
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    return false;
  }
};

// API utility functions
const api = {
  // Test connection
  testConnection: testBackend,
  // Products
  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
  },

  async getProductById(id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return response.json();
  },

  async createProduct(productData) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return response.json();
  },

  async deleteProduct(id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Users
  async registerUser(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  async loginUser(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Orders
  async createOrder(orderData, token) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    return response.json();
  },

  async getUserOrders(token) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  }
};

// Default products for fallback
export const products = [
  {
    id: 1,
    name: "Premium Dark Chocolate Bar",
    description: "Rich, smooth dark chocolate with 70% cocoa content.",
    price: 299,
    category: "chocolate",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&h=200&fit=crop",
    offer: "25% OFF"
  },
  {
    id: 2,
    name: "Instant Ramen Noodles Pack",
    description: "Quick and delicious instant noodles with authentic Asian flavors.",
    price: 45,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop",
    offer: "Buy 2 Get 1"
  },
  {
    id: 3,
    name: "Italian Penne Pasta",
    description: "Authentic Italian durum wheat pasta.",
    price: 180,
    category: "pasta",
    image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=300&h=200&fit=crop",
    offer: "15% OFF"
  },
  {
    id: 4,
    name: "Mixed Nuts Premium Pack",
    description: "A healthy mix of almonds, cashews, and walnuts.",
    price: 450,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=300&h=200&fit=crop",
    offer: "30% OFF"
  }
];

export default api;