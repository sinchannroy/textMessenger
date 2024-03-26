import Chat from '../models/chatModel.js';

export const createGroup = async (req, res) => {
    const { chatName, users } = req.body;
    if (!chatName || !users) {
        res.status(400).json({ message: 'Please fill the fields' });
    }
    const parsedUsers = JSON.parse(users);
    if (parsedUsers.length < 2) {
        res.send(400).send('Group should contain more than 2 users');
    }

    parsedUsers.push(req.rootUser);
    try {
        const chat = await Chat.create({
        chatName: chatName,
        users: parsedUsers,
        isGroup: true,
        groupAdmin: req.rootUserId,
        });
        const createdChat = await Chat.findOne({ _id: chat._id })
        .populate('users', '-password')
        .populate('groupAdmin', '-password');
        // res.status(200).json(createdChat);
        res.send(createdChat);
    } catch (error) {
        res.sendStatus(500);
    }
};