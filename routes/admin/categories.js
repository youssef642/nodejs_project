const express = require("express");
const router = express.Router();
const productController = require("../../controllers/admin/productController");
const { verifyToken, restrictTo } = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

// Create a new category
router.post(
  "/",
  verifyToken,
  restrictTo("admin", "manager"),
  [
    body("name").notEmpty().withMessage("Category name is required"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    productController.createCategory(req, res, next);
  }
);

// Get all categories
router.get(
  "/",
  verifyToken,
  restrictTo("admin", "manager"),
  productController.getAllCategories
);

// Get a single category by ID
router.get(
  "/:id",
  verifyToken,
  restrictTo("admin", "manager"),
  productController.getCategoryById
);

// Update a category
router.put(
  "/:id",
  verifyToken,
  restrictTo("admin", "manager"),
  [
    body("name").optional().notEmpty().withMessage("Category name is required"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    productController.updateCategory(req, res, next);
  }
);

// Delete a category
router.delete(
  "/:id",
  verifyToken,
  restrictTo("admin", "manager"),
  productController.deleteCategory
);

module.exports = router;
