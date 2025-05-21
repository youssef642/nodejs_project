const express = require("express");
const router = express.Router();
const userController = require("../../controllers/admin/userController");
const { verifyToken, restrictTo } = require("../../middlewares/auth");

router.get("/", verifyToken, restrictTo("admin"), userController.getAllUsers);
router.put("/:id", verifyToken, restrictTo("admin"), userController.updateUser);
router.delete(
  "/:id",
  verifyToken,
  restrictTo("admin"),
  userController.deleteUser
);

module.exports = router;
