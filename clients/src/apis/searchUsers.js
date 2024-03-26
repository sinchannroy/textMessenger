import { API } from "./API";

export const searchUsers = async (id) => {
    try {
      const token = localStorage.getItem("userToken");
      return await API(token).get(`auth/api/user?.search=${id}`);
      
    } catch (error) {
      console.log("error in search users api");
    }
};