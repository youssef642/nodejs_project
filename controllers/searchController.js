const Product = require('../models/Product'); // تأكد إن عندك الموديل ده

// بحث الاقتراحات (Autocomplete)
exports.searchSuggestions = async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) return res.json([]);

  try {
    const suggestions = await Product.find(
      { name: { $regex: `^${keyword}`, $options: 'i' } }, // يبدأ بـ keyword، غير حساس لحالة الأحرف
      { name: 1, _id: 0 }
    )
      .limit(10)
      .exec();

    res.json(suggestions.map(p => p.name));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// بحث المنتجات مع فلترة
exports.searchProducts = async (req, res) => {
  const { keyword, category, min_price, max_price } = req.query;

  let filter = {};

  if (keyword) {
    filter.$or = [
      { name: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } }
    ];
  }

  if (category) {
    filter.category_id = category; // لو category_id ObjectId تأكد من تحويله (مثلاً: mongoose.Types.ObjectId(category))
  }

  if (min_price && max_price) {
    filter.price = { $gte: Number(min_price), $lte: Number(max_price) };
  } else if (min_price) {
    filter.price = { $gte: Number(min_price) };
  } else if (max_price) {
    filter.price = { $lte: Number(max_price) };
  }

  try {
    const products = await Product.find(filter).exec();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
