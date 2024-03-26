import Message from '../models/messageModel.js';
import Chat from '../models/chatModel.js';

export const sendMessage = async (req, res) => {
    const { chatId, message } = req.body;
    try {
        let msg = await Message.create({ sender: req.rootUserId, message, chatId });
        msg = await (
        await msg.populate('sender', 'name profilePic email')
        ).populate({
            path: 'chatId',
            select: 'chatName isGroup users',
            model: 'Chat',
            populate: {
                path: 'users',
                select: 'name email profilePic',
                model: 'User',
            },
        });

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: msg,
        });
        res.status(200).send(msg);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};