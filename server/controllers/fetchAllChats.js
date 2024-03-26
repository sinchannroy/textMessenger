import Chat from '../models/chatModel.js';
import user from '../models/userModel.js';

export const fetchAllChats = async (req, res) => {
    try {
        const chats = await Chat.find({
            users: { $elemMatch: { $eq: req.rootUserId } },
        })
        .populate('users')
        .populate('latestMessage')
        .populate('groupAdmin')
        .sort({ updatedAt: -1 });
        const finalChats = await user.populate(chats, {
            path: 'latestMessage.sender',
            select: 'name email profilePic',
        });
        res.status(200).json(finalChats);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
};