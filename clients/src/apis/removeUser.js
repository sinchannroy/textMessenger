import { API } from './API';

export const removeUser = async (body) => {
  try {
    const token = localStorage.getItem('userToken');
    const { data } = await API(token).patch('/api/chat/groupRemove', body);
    return data;
  } catch (error) {
    console.log('error in remove user api');
  }
};
