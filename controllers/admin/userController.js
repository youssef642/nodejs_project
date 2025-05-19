const User = require("../../models/User");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, role, permissions } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { username, email, role, permissions },
      { new: true }
    ).select("-password");
    if (!user) throw new Error("User not found");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error("User not found");
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};
