import axios from "axios";
import { url } from "./url";

export const registerUser = async (body) => {
    // console.log ('body', body);
    try {
      return await axios.post(`${url}/auth/register`, body);
    } catch (error) {
      console.error("error in register api", error);
    }
};