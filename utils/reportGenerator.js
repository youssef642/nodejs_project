const Order = require("../models/Order");

exports.generateReport = async () => {
  const orders = await Order.find().populate(
    "userId products.productId",
    "username name"
  );
  const totalSales = await Order.aggregate([
    { $match: { status: "delivered" } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  return {
    totalOrders: orders.length,
    totalSales: totalSales[0]?.total || 0,
    orders,
  };
};
