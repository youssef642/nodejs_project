const express = require("express");
const router = express.Router();
const paymentController = require("../../controllers/admin/paymentController");
const { verifyToken, restrictTo } = require("../../middlewares/auth");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  verifyToken,
  restrictTo("admin", "manager"),
  [
    body("orderId").notEmpty().withMessage("Order ID is required"),
    body("amount")
      .isFloat({ min: 0 })
      .withMessage("Amount must be a positive number"),
    body("method")
      .optional()
      .isIn(["manual", "cash", "bank_transfer"])
      .withMessage("Invalid payment method"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    paymentController.createPayment(req, res, next);
  }
);

router.post(
  "/confirm",
  verifyToken,
  restrictTo("admin", "manager"),
  [body("paymentId").notEmpty().withMessage("Payment ID is required")],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    paymentController.confirmPayment(req, res, next);
  }
);

module.exports = router;
