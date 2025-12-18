const API_BASE_URL = "http://13.61.142.217:5000";

// Test backend connectivity
const testBackend = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/test`);
    const data = await response.json();
    console.log("✅ Backend test:", data);
    return true;
  } catch (error) {
    console.error("❌ Backend connection failed:", error);
    return false;
  }
};

const api = {
  testConnection: testBackend,

  // ✅ PRODUCTS
  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    return response.json();
  },

  async getProductById(id) {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
    return response.json();
  },

  async createProduct(productData) {
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    return response.json();
  },

  async deleteProduct(id) {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },

  // ✅ USERS
  async registerUser(userData) {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  async loginUser(credentials) {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  // ✅ ORDERS
  async createOrder(orderData, token) {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    return response.json();
  },

  async getUserOrders(token) {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

export default api;
