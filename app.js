const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const orderRoutes = require("./routes/orders");
const paymentRoutes = require("./routes/payments");
const reviewRoutes = require("./routes/reviews");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log(`Server running on port 3000`));
