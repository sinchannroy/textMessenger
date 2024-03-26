export const getChatName = (activeChat, activeUser) => {
  return (activeChat?.isGroup
    ? activeChat?.chatName
    : activeChat?.users[0]?._id === activeUser.id
    ? activeChat?.users[1]?.name
    : activeChat?.users[0]?.name
  );
};