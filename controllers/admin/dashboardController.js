const User = require("../../models/User");
const Order = require("../../models/Order");
const Product = require("../../models/Product");

exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const sales = await Order.aggregate([
      { $match: { status: "delivered" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    res.status(200).json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalSales: sales[0]?.total || 0,
    });
  } catch (error) {
    next(error);
  }
};
