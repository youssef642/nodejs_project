const Review = require("../../models/Review");

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate(
      "userId productId",
      "username name"
    );
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

exports.replyToReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    const review = await Review.findByIdAndUpdate(id, { reply }, { new: true });
    if (!review) throw new Error(" cujo não encontrado");
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) throw new Error("Review not found");
    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    next(error);
  }
};
