const mongoose = require("mongoose");
const User = require("./model/User");
require("dotenv").config();

const testUser = {
  email: "test@grocify.com",
  password: "123456",
  firstName: "Test",
  lastName: "User",
  phone: "9876543210",
  address: "123 Test Street, Test City",
  pincode: "123456"
};

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");

    const existingUser = await User.findOne({ email: testUser.email });
    if (existingUser) {
      console.log("Test user already exists");
      process.exit(0);
    }

    await User.create(testUser);
    console.log("Test user created successfully");
    console.log("Email: test@grocify.com");
    console.log("Password: 123456");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding user:", error);
    process.exit(1);
  }
};

seedUser();