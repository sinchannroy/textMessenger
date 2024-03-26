import axios from "axios";
import { url } from "./url";

export const loginUser = async (body) => {
    try {
      const response = await axios.post(`${url}/auth/login`, body);
      return response.data; // Return response data instead of the entire response
    } catch (error) {
      console.log("Error in loginUser API:", error); // Output error message along with the error object
      throw error; // Re-throw the error to propagate it further if needed
    }
};