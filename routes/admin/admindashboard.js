const express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/admin/dashboardController");
const { verifyToken, restrictTo } = require("../../middlewares/auth");

router.get(
  "/stats",
  verifyToken,
  restrictTo("admin", "manager"),
  dashboardController.getDashboardStats
);

module.exports = router;
