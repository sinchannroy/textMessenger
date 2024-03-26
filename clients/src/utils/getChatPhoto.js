
export const getChatPhoto = (activeChat, activeUser) => {
  return (activeChat?.isGroup
    ? activeChat.photo
    : activeChat?.users[0]?._id === activeUser?.id
    ? activeChat?.users[1]?.profilePic
    : activeChat?.users[0]?.profilePic
  );
};
