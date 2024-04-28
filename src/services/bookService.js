import { deleteRequest, get,  post, put } from "../util";

// tác giả
export const getAuthors = async () => {
  const result = await get("Authors");
  return result;
};
export const createAuthor = async (data) => {
  const result = await post(data, "Authors");
  return result;
};
export const editAuthor = async (data, id) => {
  const result = await put(`Authors/${id}`, data);
  // console.log(result)
       return result;
}
export const deleteAuthor = async (id) => {
  const result = await deleteRequest(`Authors/${id}`);
  // console.log(result)
       return result;
}
// sách
export const getBooks = async () => {
  const result = await get("Books");
  return result;
};

// thể loại
export const getGenres = async () => {
  const result = await get("Genres");
  return result;
};
export const createGenre = async (data) => {
  const result = await post(data, "Genres");
  return result;
};

// Update an existing genre
export const editGenre = async (data, id) => {
  const result = await put(`Genres/${id}`, data);
  return result;
};

// Delete a genre
export const deleteGenre = async (id) => {
  const result = await deleteRequest(`Genres/${id}`);
  return result;
};
