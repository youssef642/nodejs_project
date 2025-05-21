const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      password,
      role: "admin",
      permissions: ["manage_users", "manage_products", "manage_orders"],
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .status(201)
      .json({
        token,
        user: { id: user._id, username, email, role: user.role },
      });
  } catch (error) {
    next(error);
  }
};

exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.role !== "admin")
      throw new Error("Invalid email or role");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res
      .status(200)
      .json({
        token,
        user: { id: user._id, username: user.username, email, role: user.role },
      });
  } catch (error) {
    next(error);
  }
};

exports.logoutAdmin = async (req, res, next) => {
  res.status(200).json({ message: "Logged out successfully" });
};
