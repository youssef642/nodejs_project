const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.getOrderHistory = async (req, res) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const orders = await Order.find({ userId: userId })
      .populate({
        path: 'items.productId',
        select: 'name'
      })
      .sort({ createdAt: -1 });

    // Format response to match your original SQL output
    const formatted = orders.flatMap(order =>
      order.items.map(item => ({
        order_id: order._id,
        created_at: order.createdAt,
        total_amount: order.totalAmount,
        status: order.status,
        product_name: item.productId?.name || 'Unknown',
        quantity: item.quantity,
        price_at_purchase: item.priceAtPurchase
      }))
    );

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

