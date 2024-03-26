import Chat from '../models/chatModel.js';

export const addToGroup = async (req, res) => {
    const { userId, chatId } = req.body;
    const existing = await Chat.findOne({ _id: chatId });
    if (!existing.users.includes(userId)) {
        const chat = await Chat.findByIdAndUpdate(chatId, {
            $push: { users: userId },
        })
        .populate('groupAdmin', '-password')
        .populate('users', '-password');
        if (!chat) res.status(404);
        res.status(200).send(chat);
    } 
    
    else {
        res.status(409).send('user already exists');
    }
};