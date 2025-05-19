const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/admin/orderController");
const { verifyToken, restrictTo } = require("../../middleware/auth");
const { body, validationResult } = require("express-validator"); 

router.get(
  "/",
  verifyToken,
  restrictTo("admin", "manager"),
  orderController.getAllOrders
);

router.put(
  "/:id/status",
  verifyToken,
  restrictTo("admin", "manager"),
  [
    body("status")
      .isIn(["processing", "shipped", "delivered", "cancelled"])
      .withMessage("Invalid status"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    orderController.updateOrderStatus(req, res, next);
  }
);

router.get(
  "/report",
  verifyToken,
  restrictTo("admin"),
  orderController.generateOrderReport
);

module.exports = router;
