import { get } from "../util";

// Lấy danh sách tác giả
export const getAuthors = async () => {
  const result = await get("Authors");
  return result;
};

// Lấy danh sách sách
export const getBooks = async () => {
  const result = await get("Books");
  return result;
};

// Lấy danh sách thể loại
export const getGenres = async () => {
  const result = await get("Genres");
  return result;
};
