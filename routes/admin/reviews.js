const express = require("express");
const router = express.Router();
const reviewController = require("../../controllers/admin/reviewController");
const { verifyToken, restrictTo } = require("../../middleware/auth");
const { body, validationResult } = require("express-validator"); // Add this line

router.get(
  "/",
  verifyToken,
  restrictTo("admin", "manager"),
  reviewController.getAllReviews
);

router.put(
  "/:id/reply",
  verifyToken,
  restrictTo("admin", "manager"),
  [body("reply").notEmpty().withMessage("Reply is required")],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    reviewController.replyToReview(req, res, next);
  }
);

router.delete(
  "/:id",
  verifyToken,
  restrictTo("admin", "manager"),
  reviewController.deleteReview
);

module.exports = router;
