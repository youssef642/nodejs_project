const mongoose = require('mongoose');
const Review = require('../models/Review');
const User = require('../models/User'); // تأكد إن عندك موديل User فيه name

// إرسال مراجعة جديدة
exports.submitReview = async (req, res) => {
  const { user_id, product_id, rating, comment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(product_id)) {
    return res.status(400).json({ error: 'Invalid user_id or product_id' });
  }

  try {
    const review = new Review({
      userId: user_id,
      productId: product_id,
      rating,
      comment
    });

    await review.save();
    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// جلب مراجعات منتج معين
exports.getProductReviews = async (req, res) => {
  const productId = req.params.productId;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const reviews = await Review.find({ productId })
      .populate({ path: 'userId', select: 'name' }) // جلب اسم المستخدم فقط
      .sort({ createdAt: -1 });

    // إعادة تشكيل النتيجة لتناسب SQL الشكل الأصلي
    const formatted = reviews.map(r => ({
      rating: r.rating,
      comment: r.comment,
      created_at: r.createdAt,
      name: r.userId?.name || 'Unknown'
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
