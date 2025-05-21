const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const authController = require("../../controllers/admin/authController");
const { verifyToken, restrictTo } = require("../../middlewares/auth"); 

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    authController.registerAdmin(req, res, next);
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    authController.loginAdmin(req, res, next);
  }
);

router.post(
  "/logout",
  verifyToken,
  restrictTo("admin"),
  authController.logoutAdmin
);

module.exports = router;
