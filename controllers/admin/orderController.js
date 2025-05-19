const Order = require("../../models/Order");
const { generateReport } = require("../../utils/reportGenerator");

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate(
      "userId products.productId",
      "username name"
    );
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) throw new Error("Order not found");
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

exports.generateOrderReport = async (req, res, next) => {
  try {
    const report = await generateReport();
    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};
