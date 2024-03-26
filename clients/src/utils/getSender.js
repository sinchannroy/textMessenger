
export const getSender = (activeUser, users) => {
    return activeUser.id === users[0]._id ? users[1].name : users[0].name;
};