import UserModel from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCredits = async (req, res) => {
  try {
    const userId = req.userId;
    const { creditsToAdd } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.credits += creditsToAdd;
    await user.save();

    res.status(200).json({
      message: "Credits updated successfully",
      newCredits: user.credits,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
