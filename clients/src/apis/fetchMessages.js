import { API } from './API';

export const fetchMessages = async (id) => {
  try {
    const token = localStorage.getItem('userToken');

    const { data } = await API(token).get(`/api/message/${id}`);
    return data;
    
  } catch (error) {
    console.log('error in fetch Message API ' + error);
  }
};
