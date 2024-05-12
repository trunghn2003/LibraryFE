import { post } from "../util";

export const register = async (data)  => {
    const result = await post(data, "Users");
  return result;

}