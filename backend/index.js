const express = require("express");
const ProductRoute = require("./routes/productRoute");
const UserRoute = require("./routes/userRoute");
const OrderRoute = require("./routes/orderRoute");
const dotenv = require("dotenv");
const connectdb = require("./config/db");

dotenv.config();
connectdb();

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", ProductRoute);
app.use("/api/users", UserRoute);
app.use("/api/orders", OrderRoute);

// Test endpoint
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is working!", timestamp: new Date() });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
});