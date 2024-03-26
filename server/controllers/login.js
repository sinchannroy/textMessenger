import user from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await user.findOne({ email });
    
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isPasswordValid = bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await existingUser.generateAuthToken();
        res.cookie("userToken", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });

        res
            .status(200)
            .json({
            token,
            status: 200,
            id: existingUser._id,
            });
            
    } catch (error) {
        console.error("Error occurred during login:", error);
        return res.status(500).json({ error });
    }
};