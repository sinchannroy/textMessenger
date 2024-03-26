import user from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const fullname = `${firstname} ${lastname}`;
        const hashedPassword = await bcrypt.hash(password, 10); // Added await here
        const newUser = new user({
            email,
            password: hashedPassword,
            name: fullname,
        });

        const token = await newUser.generateAuthToken();
        await newUser.save();
        res.json({ message: "success", token});

    } catch (error) {
        console.log("Error in register", error);
        return res.status(500).send(error);
    }
};