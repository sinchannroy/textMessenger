import Chat from '../models/chatModel.js';

export const renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body;
    if (!chatId || !chatName) {
        res.status(400).send('Provide Chat id and Chat name');
    }

    try {
        const chat = await Chat.findByIdAndUpdate(chatId, {
            $set: { chatName },
        })
        .populate('users', '-password')
        .populate('groupAdmin', '-password');
        if (!chat) res.status(404);
        res.status(200).send(chat);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
};
