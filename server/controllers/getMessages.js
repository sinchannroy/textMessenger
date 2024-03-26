import Message from '../models/messageModel.js';

export const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        let messages = await Message.find({ chatId })
        .populate({
            path: 'sender',
            model: 'User',
            select: 'name profilePic email',
        })
        .populate({
            path: 'chatId',
            model: 'Chat',
        });

        res.status(200).json(messages);
    } catch (error) {
        res.sendStatus(500).json({ error: error });
        console.log(error);
    }
};