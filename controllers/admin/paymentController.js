const Payment = require("../../models/Payment");
const Order = require("../../models/Order");

exports.createPayment = async (req, res, next) => {
  try {
    const { orderId, amount, method } = req.body;
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    const payment = new Payment({
      orderId,
      userId: req.userId,
      amount,
      method: method || "manual", 
      status: "pending",
      transactionId: `TX-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`, 
    });
    await payment.save();

    res
      .status(200)
      .json({ payment, message: "Payment created, awaiting confirmation" });
  } catch (error) {
    next(error);
  }
};

exports.confirmPayment = async (req, res, next) => {
  try {
    const { paymentId } = req.body;
    const payment = await Payment.findById(paymentId);
    if (!payment) throw new Error("Payment not found");

    payment.status = "completed";
    await payment.save();

    const order = await Order.findById(payment.orderId);
    order.status = "processing";
    await order.save();

    res.status(200).json({ message: "Payment confirmed" });
  } catch (error) {
    next(error);
  }
};
