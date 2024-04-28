import { get } from "../util";

export const getProductList = async () => {
    const result =  await get("products");
    return result;
}