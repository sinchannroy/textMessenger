import user from "../models/userModel.js";

export const getUserById = async (req, res) => {
    const { id } = req.query;
    try {
        const selectedUser = await user.findOne({ _id: id }).select("-password");
        res.status(200).json(selectedUser);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};