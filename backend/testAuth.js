const mongoose = require("mongoose");
const User = require("./model/User");
require("dotenv").config();

const testAuth = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");

    // Check if test user exists
    const user = await User.findOne({ email: "test@grocify.com" });
    if (user) {
      console.log("✅ Test user found:");
      console.log("Email:", user.email);
      console.log("Name:", user.firstName, user.lastName);
      
      // Test password comparison
      const isPasswordValid = await user.comparePassword("123456");
      console.log("✅ Password validation:", isPasswordValid ? "PASSED" : "FAILED");
    } else {
      console.log("❌ Test user not found");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

testAuth();