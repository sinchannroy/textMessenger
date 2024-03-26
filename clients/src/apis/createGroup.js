import { toast } from 'react-toastify';
import { API } from './API';

export const createGroup = async (body) => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await API(token).post('/api/chat/group', body);
      toast.success(`${data.chatName} Group Created`);
      return data;
    } catch (error) {
      console.log('error in create group api');
    }
};