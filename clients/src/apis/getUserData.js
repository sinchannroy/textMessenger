import { API } from "./API";

export const getUserData = async () => {
  try {
    const token = localStorage.getItem("userToken");
    const id = localStorage.getItem("id");

    if (!token) {
      throw new Error("User token not found");
    }

    if (!id) {
      throw new Error("User id not found");
    }
    const { data } = await API(token).get(`/api/users/profile`, {
      params: { id },
    });
    // console.log("dataaaas", { data });
    return data;
  } catch (error) {
    console.error("Error in get user data API:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
