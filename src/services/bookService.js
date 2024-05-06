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
export const createBook = async (data) => {
  const result = await post(data, "Books");
  return result;
};

export const editBook = async (data, id) => {
  const result = await put(`Books/${id}`, data);
  console.log(data)
  console.log(id);
  return result;
};

export const deleteBook = async (id) => {
  const result = await deleteRequest(`Books/${id}`);
  return result;
};
// cap nhat khi book duoc them vao cart
export const addBookToCart = async (id, data = null) => {
  const result = await put(`Books/AddToCart/${id}`, data);
  return result;
};

// cap nhat khi book xoa khoi cart
export const RemoveBookFromCart = async (id, data = null) => {
  const result = await put(`Books/RemoveFromCart/${id}`, data);
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

// Tạo một phiếu mượn mới
export const createBorrowing = async (borrowingData) => {
  const result = await post(borrowingData, "Borrowings");
  return result;
};

// Lấy thông tin chi tiết của một phiếu mượn
export const getBorrowing = async (id) => {
  const result = await get(`Borrowings/${id}`);
  return result;
};
export const getBorrowings = async (id) => {
  const result = await get(`Borrowings`);
  return result;
};

// Cập nhật thông tin phiếu mượn
export const updateBorrowing = async (id, borrowingData) => {
  const result = await put(`Borrowings/${id}`, borrowingData);
  return result;
};

// Xóa một phiếu mượn
export const deleteBorrowing = async (id) => {
  const result = await deleteRequest(`Borrowings/${id}`);
  return result;
};
// Tạo một bản ghi BorrowedBook mới (thêm sách vào một phiếu mượn)
export const createBorrowedBook = async (borrowedBookData) => {
  const result = await post(borrowedBookData, "BorrowedBooks");
  return result;
};

// Lấy thông tin chi tiết của BorrowedBook bằng ID
export const getBorrowedBook = async (id) => {
  const result = await get(`BorrowedBooks/${id}`);
  return result;
};

// Cập nhật thông tin của một bản ghi BorrowedBook
export const updateBorrowedBook = async (id, borrowedBookData) => {
  const result = await put(`BorrowedBooks/${id}`, borrowedBookData);
  return result;
};

// Xóa một bản ghi BorrowedBook
export const deleteBorrowedBook = async (id) => {
  const result = await deleteRequest(`BorrowedBooks/${id}`);
  return result;
};

// Lấy tất cả BorrowedBooks cho một Borrowing cụ thể
export const getBorrowedBooksByBorrowingId = async (borrowingId) => {
  const result = await get(`BorrowedBooks/Borrowing/${borrowingId}`);
  return result;
};

export const getBorrowingsByUserId = async (id) => {
  const result = await get(`Borrowings/User/${id}`);
  return result;
};
export const ReturnedAwaitingApproval = async (borrowingId,data = null) => {
  const result = await put(`Borrowings/${borrowingId}/ReturnedAwaitingApproval`);

  return result;
};
export const confirmReturnBook = async (borrowingId,data = null) => {
  const result = await put(`Borrowings/${borrowingId}/return`);

  return result;
};
export const confirmBorrowBook = async (borrowingId,data = null) => {
  const result = await put(`Borrowings/${borrowingId}/ConfirmBorrowing`);

  return result;
};
