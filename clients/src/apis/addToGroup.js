import { API } from './API';

export const addToGroup = async (body) => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await API(token).patch('/api/chat/groupAdd', body);
      return data;
    } catch (error) {
      console.log('error in addtogroup api');
    }
};