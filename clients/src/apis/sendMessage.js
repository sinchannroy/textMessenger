import { API } from './API';

export const sendMessage = async (body) => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await API(token).post('/api/message/', body);
      return data;
      
    } catch (error) {
      console.log('error in sendmessage api' + error);
    }
};