require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/admin/auth");
const dashboardRoutes = require("./routes/admin/dashboard");
const userRoutes = require("./routes/admin/users");
const productRoutes = require("./routes/admin/products");
const categoryRoutes = require("./routes/admin/categories");
const orderRoutes = require("./routes/admin/orders");
const paymentRoutes = require("./routes/admin/payments");
const reviewRoutes = require("./routes/admin/reviews");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

connectDB();

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
