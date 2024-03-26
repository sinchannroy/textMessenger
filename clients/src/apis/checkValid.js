
export const checkValid = async () => {
    const data = await validUser();
    if (!data?.user) {
      window.location.href = "/login";
    } else {
      window.location.href = "/chats";
    }
};