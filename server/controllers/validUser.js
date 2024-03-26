import user from "../models/userModel.js";

export const validUser = async (req, res) => {
    try {
        const validuser = await user
            .findOne({ _id: req.rootUserId })
            .select("-password");

        if (!validuser) return res.json({ message: "user is not valid" });
        
        return res.status(201).json({
            user: validuser,
            token: req.token,
        });
    } catch (error) {
        return res.status(500).json({ error: error });
        // console.log(error);
    }
};