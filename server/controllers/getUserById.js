import user from "../models/userModel.js";

export const getUserById = async (req, res) => {
    const { id } = req.query;
    
    try {
        const selectedUser = await user.findOne({ _id: id }).select("-password");
        if (!selectedUser) {
        return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(selectedUser);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};