import { API } from './API';

export const fetchAllChats = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await API(token).get('/api/chat');
      return data;
    } catch (error) {
      console.log('error in fetch all chats api');
    }
};