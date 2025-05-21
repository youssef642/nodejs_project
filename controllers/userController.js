const User = require('../models/User');

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .populate('orders')
      .populate('wishlist')
      .exec();

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      email: user.email,
      name: user.name,
      orders: user.orders,
      wishlist: user.wishlist
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
