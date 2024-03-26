import user from "../models/userModel.js";

export const updateInfo = async (req, res) => {
  // const { id } = req.params;
  const { id, bio, name } = req.body;
  console.log("body",req.body);

  try {
    const updatedUser = await user.findByIdAndUpdate(
      id,
      { name, bio },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(updatedUser);

  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating user" });
  }
};
