import { toast } from "react-toastify";
import { API } from "./API";

export const updateUser = async (id, body) => {
    const { name, bio } = body;
    try {
      const token = localStorage.getItem("userToken");
      console.log(`id`, id);
  
      if (!token) {
        throw new Error("User token not found");
      }
  
      const { data } = await API(token).post(`/api/users/update`, {
        bio,
        name,
        id,
      });
      return data;
      
    } 
    catch (error) {
      console.error("Error in update user API:", error);
      toast.error("Something went wrong. Please try again."); // Show a toast notification for the user
      throw error; // Rethrow the error to be caught by the caller
    }
  };