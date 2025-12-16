# Grocify - Full Stack E-commerce Application

A modern e-commerce supermarket application built with React + Vite frontend and Node.js + Express + MongoDB backend.

## Features

- 🛒 Product browsing and shopping cart
- 📱 Responsive design with Tailwind CSS
- 🔐 User authentication and protected routes
- 📦 Product management (Add/View products)
- 🎨 Modern UI with animations and gradients
- 🌐 Full-stack MERN integration

## Tech Stack

### Frontend
- React 19.2.0
- Vite 7.2.4
- Tailwind CSS 4.1.17
- React Router DOM 7.10.1

### Backend
- Node.js
- Express.js 5.2.1
- MongoDB with Mongoose 9.0.1
- CORS enabled
- dotenv for environment variables

## Project Structure

```
ecom_supermarket/
├── backend/                 # Backend API server
│   ├── config/
│   │   └── db.js           # Database connection
│   ├── controller/
│   │   └── productController.js
│   ├── model/
│   │   └── Product.js      # Product schema
│   ├── routes/
│   │   └── ProductRoute.js # API routes
│   ├── .env               # Environment variables
│   ├── index.js           # Server entry point
│   └── package.json
├── src/
│   ├── components/
│   │   ├── AddProducts.jsx    # Add new products
│   │   ├── Products.jsx       # Product listing
│   │   ├── Cart.jsx          # Shopping cart
│   │   ├── Login.jsx         # Authentication
│   │   └── ...
│   ├── utils/
│   │   └── api.js            # API integration
│   └── App.jsx
└── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```
   PORT=5000
   DB_URL=mongodb://localhost:27017/ecommerece
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Install frontend dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/getProducts` - Fetch all products
- `POST /api/postProduct` - Add new product

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start server with nodemon

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
DB_URL=mongodb://localhost:27017/ecommerece
```

## Features Overview

### Product Management
- Add new products with name, description, price, and image
- View products in a responsive grid layout
- Category-based product organization

### Shopping Experience
- Add products to cart
- View cart with product details
- Protected checkout process

### Authentication
- User login system
- Protected routes for cart and checkout

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.