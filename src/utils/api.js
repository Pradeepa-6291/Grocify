const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = {
  // 🔍 Test backend
  async testConnection() {
    const res = await fetch(`${API_BASE_URL}/api/test`);
    if (!res.ok) throw new Error("Backend not reachable");
    return res.json();
  },

  // 🛒 PRODUCTS
  async getProducts() {
    const res = await fetch(`${API_BASE_URL}/api/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  async getProductById(id) {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  },

  async createProduct(data) {
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create product");
    return res.json();
  },

  async deleteProduct(id) {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete product");
    return res.json();
  },

  // 👤 USERS
  async registerUser(data) {
    const res = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async loginUser(data) {
    const res = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // 📦 ORDERS
  async createOrder(order, token) {
    const res = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });
    return res.json();
  },

  async getUserOrders(token) {
    const res = await fetch(`${API_BASE_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
};

export default api;
