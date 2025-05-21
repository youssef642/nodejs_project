const express = require("express");
const router = express.Router();
const productController = require("../../controllers/admin/productController");
const { verifyToken, restrictTo } = require("../../middlewares/auth");
const { body, validationResult } = require("express-validator");

// Create a new product
router.post(
  "/",
  verifyToken,
  restrictTo("admin", "manager"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("category").notEmpty().withMessage("Category is required"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    productController.createProduct(req, res, next);
  }
);

// Get all products
router.get(
  "/",
  verifyToken,
  restrictTo("admin", "manager"),
  productController.getAllProducts
);

// Get a single product by ID
router.get(
  "/:id",
  verifyToken,
  restrictTo("admin", "manager"),
  productController.getProductById
);

// Update a product
router.put(
  "/:id",
  verifyToken,
  restrictTo("admin", "manager"),
  [
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("price")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("category").optional().notEmpty().withMessage("Category is required"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    productController.updateProduct(req, res, next);
  }
);

router.delete(
  "/:id",
  verifyToken,
  restrictTo("admin", "manager"),
  productController.deleteProduct
);

module.exports = router;
