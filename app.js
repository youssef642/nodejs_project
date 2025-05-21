require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/admin/adminauth.js");
const dashboardRoutes = require("./routes/admin/admindashboard.js");
const userRoutes = require("./routes/admin/adminusers.js");
const productRoutes = require("./routes/admin/adminproducts.js");
const categoryRoutes = require("./routes/admin/admincategories.js");
const orderRoutes = require("./routes/admin/adminorders.js");
const paymentRoutes = require("./routes/admin/adminpayments.js");
const reviewRoutes = require("./routes/admin/adminreviews.js");
const errorHandler = require("./middlewares/errorHandler.js");
const userauthRoutes = require("./routes/auth.js");
const userpasswordRoutes = require("./routes/password.js");
const useruserRoutes = require("./routes/user.js");
const userordersRouter = require("./routes/orders.js");
const userreviewsRouter = require("./routes/reviews.js");
const usersearchRouter = require("./routes/search.js");
const app = new express();

app.use(morgan("dev"));
app.use(express.json());

connectDB();

//admin routes
app.use("/api/adminauth", authRoutes);
app.use("/api/admindashboard", dashboardRoutes);
app.use("/api/adminusers", userRoutes);
app.use("/api/adminproducts", productRoutes);
app.use("/api/admincategories", categoryRoutes);
app.use("/api/adminorders", orderRoutes);
app.use("/api/adminpayments", paymentRoutes);
app.use("/api/adminreviews", reviewRoutes);

//user routes
app.use("/api/auth", userauthRoutes);
app.use("/api/password", userpasswordRoutes);
app.use("/api/user", useruserRoutes);

app.use("/orders", userordersRouter);
app.use("/reviews", userreviewsRouter);
app.use("/search", usersearchRouter);

app.use(errorHandler);

const mongoose = require("mongoose");
const cors = require("cors");

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static("public"));


// Test route
app.get("/", (req, res) => {
  res.send("Hello, your server is working with MongoDB!");
});


app.listen(3000, () => console.log(`Server running on port 3000`));
