import user from "../models/userModel.js";

export const searchUsers = async (req, res) => {
    // const { search } = req.query;
    const search = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await user.find(search).find({ _id: { $ne: req.rootUserId } });
    res.status(200).send(users);
};