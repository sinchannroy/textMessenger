import { API } from './API';

export const renameGroup = async (body) => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await API(token).patch('/api/chat/group/rename', body);
      return data;
    } catch (error) {
      console.log('error in rename group api');
    }
};