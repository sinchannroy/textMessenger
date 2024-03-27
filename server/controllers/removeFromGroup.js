import Chat from '../models/chatModel.js';

export const removeFromGroup = async (req, res) => {
    const { userId, chatId } = req.body;
    const existing = await Chat.findOne({ _id: chatId });
    // console.log ("nnjjfnjn", existing);
    if (existing.users.includes(userId)) {
        Chat.findByIdAndUpdate(chatId, {
            $pull: { users: userId },
        })
        .populate('groupAdmin', '-password')
        .populate('users', '-password')
        .then((e) => res.status(200).send(e))
        .catch((e) => res.status(404));
    } 
    
    else {
        res.status(409).send('user doesnt exists');
    }
};

// export const removeContact = async (req, res) => {};