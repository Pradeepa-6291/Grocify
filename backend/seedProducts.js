const mongoose = require("mongoose");
const Product = require("./model/Product");
require("dotenv").config();

const products = [
  { 
    name: "Dairy Milk Chocolate", 
    price: 80, 
    description: "Smooth and creamy milk chocolate.", 
    offer: "10% OFF", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKDK_G4KwlqOWOSOWug8GxwSS58PiWUv0I2Q&s", 
    category: "chocolate",
    stock: 50
  },
  { 
    name: "KitKat", 
    price: 50, 
    description: "Crispy wafer coated with chocolate.", 
    offer: "5% OFF", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZEW0hfQz8AiVD25vW58sF5l880Vw2CfZR_Q&s", 
    category: "chocolate",
    stock: 75
  },
  { 
    name: "Maggi Noodles", 
    price: 14, 
    description: "2-minute instant noodles.", 
    offer: "15% OFF", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDso3eD2Aurqw7kYact-OHWwX-nHvP1vMT9g&s", 
    category: "noodles",
    stock: 100
  },
  { 
    name: "Top Ramen", 
    price: 20, 
    description: "Masala noodles pack.", 
    offer: "10% OFF", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMXyyXoOdwgMvgi4W4ZHVQwDGVDV4msr1Lqg&s", 
    category: "noodles",
    stock: 80
  },
  { 
    name: "Pasta Packet", 
    price: 45, 
    description: "Italian style raw pasta.", 
    offer: "12% OFF", 
    image: "https://www.mortonindia.com/wp-content/uploads/2022/01/1-14.jpg", 
    category: "pasta",
    stock: 60
  },
  { 
    name: "Sunfeast Dark Fantasy", 
    price: 40, 
    description: "Chocolate-filled cookies.", 
    offer: "8% OFF", 
    image: "https://rukminim2.flixcart.com/image/480/480/cms-rpd-images/a42ec455bd4940c29ce964ae217a6504_17ccc4f3f59_CKBFUQFEF55PGRSE_ImageMediaWidget_1.jpg.jpeg?q=90", 
    category: "snacks",
    stock: 40
  },
  { 
    name: "Oreos", 
    price: 35, 
    description: "Crunchy cookies with vanilla cream.", 
    offer: "10% OFF", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlEJ7hOmLoviSOc4c9xmtHKy4LOov_QJAJpg&s", 
    category: "snacks",
    stock: 90
  },
  { 
    name: "Toblerone", 
    price: 120, 
    description: "Swiss triangular chocolate.", 
    offer: "20% OFF", 
    image: "https://5.imimg.com/data5/SELLER/Default/2025/6/516304849/CT/TF/XX/155289408/toblerone-milk-honey-almond-chocolate-imported.jpeg", 
    category: "chocolate",
    stock: 25
  },
  { 
    name: "Kurkure Masala", 
    price: 20, 
    description: "Spicy crunchy snack.", 
    offer: "10% OFF", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt3Fg5m82xp4mmkxk-NaTRmncB2FYnBo76vw&s", 
    category: "snacks",
    stock: 70
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    await Product.insertMany(products);
    console.log("Products seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();