import { API } from './API';

export const accessCreate = async (body) => {
    try {
      const token = localStorage.getItem('userToken');
  
      const { data } = await API(token).post('/api/chat', body);
      console.log(data);
      return data;
      
    } catch (error) {
      console.log('error in access create api');
    }
};