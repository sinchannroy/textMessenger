import user from "../models/userModel.js";
import { OAuth2Client } from "google-auth-library";

export const googleAuth = async (req, res) => {
    try {
        const { tokenId } = req.body;
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const verify = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.CLIENT_ID,
        });
        const { email_verified, email, name, picture } = verify.payload;
    
        if (!email_verified) res.json({ message: "Email Not Verified" });
        const userExist = await user.findOne({ email }).select("-password");
    
        if (userExist) {
            res.cookie("userToken", tokenId, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json({ token: tokenId, user: userExist });
        } 
        
        else {
            const password = email + process.env.CLIENT_ID;
            const newUser = await user({
                name: name,
                profilePic: picture,
                password,
                email,
            });
    
            await newUser.save();
            res.cookie("userToken", tokenId, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
    
            res
                .status(200)
                .json({ message: "User registered Successfully", token: tokenId });
        }

    } catch (error) {
      res.status(500).json({ error: error });
      console.log("error in googleAuth backend" + error);
    }
};