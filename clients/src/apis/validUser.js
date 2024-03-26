import { API } from "./API";

export const validUser = async () => {
  try {
    const token = localStorage.getItem("userToken");

    const { data } = await API(token).get(`/auth/valid`, {
      headers: { Authorization: token },
    });
    return data;

  } catch (error) {
    console.log("error in valid user api");
  }
};