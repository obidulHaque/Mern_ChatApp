import userModel from "../model/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const allUser = await userModel
      .find({ _id: { $ne: userId } })
      .select("-password");
    res.status(200).json(allUser);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "All users get Fail" });
  }
};
