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
require("dotenv").config();


const app = express();


app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://youssefaboseif72:dbpCZYiVMdL3vmGq@cluster0.3cspypx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log(" MongoDB connected successfully");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  }
};
connectDB(); // Call the connection function

// Routers
const authRoutes = require('./routes/user');
const passwordRoutes = require('./routes/password');
const userRoutes = require('./routes/user');

const ordersRouter = require('./routes/orders.js');
const reviewsRouter = require('./routes/reviews.js');
const searchRouter = require('./routes/search.js');

// Test route
app.get('/', (req, res) => {
  res.send('Hello, your server is working with MongoDB!');
});

// Use routers
app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/user', userRoutes);

app.use('/orders', ordersRouter);
app.use('/reviews', reviewsRouter);
app.use('/search', searchRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
