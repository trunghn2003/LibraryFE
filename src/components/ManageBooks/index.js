import React, { useEffect, useState } from "react";
import {
  createBook,
  deleteBook,
  editBook,
  getAuthors,
  getBooks,
  getGenres,
} from "../../services/bookService";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ManageBooks() {
  const user = JSON.parse(sessionStorage.getItem("user"))
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentBook, setCurrentBook] = useState({
    bookID: "",
    title: "",
    authorID: "",
    genreID: "",
    remainingQuantity: "",
    totalQuantity: "",
    image: "",
  });

  useEffect(() => {
    if(!user) {
      navigate("/login")
      console.log(user.role);
      
    }
    if(user.role !== "admin"){
      navigate("/")
    }
    // console.log(user.role);
    
    const fetchBooks = async () => {
      const booksData = await getBooks();
      const authorsData = await getAuthors();
      const genresData = await getGenres();

      setBooks(booksData);
      setAuthors(authorsData);
      setGenres(genresData);
    };
    fetchBooks();
  }, [books]);

  const handleDelete = async (bookId) => {
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Bạn sẽ không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, xóa đi!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(bookId).then(() => {
          setBooks(books.filter((book) => book.bookID !== bookId));
          Swal.fire("Đã xóa!", "Cuốn sách đã được xóa.", "success");
        });
      }
    });
  };

  const handleEdit = (book) => {
    setCurrentBook(book);
    setShowEditModal(true);
  };

  const handleAddNewBook = () => {
    setCurrentBook({
      bookID: "",
      title: "",
      authorID: authors.length > 0 ? authors[0].authorID : "",
      genreID: genres.length > 0 ? genres[0].genreID : "",
      remainingQuantity: "",
      totalQuantity: "",
      image: "",
    });
    setShowAddModal(true);
  };

  const handleClose = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const handleSubmitNewBook = async () => {
    const newBookData = {
      title: currentBook.title,
      authorID: currentBook.authorID,
      status: "default",
      genreID: currentBook.genreID,
      remainingQuantity: currentBook.remainingQuantity,
      totalQuantity: currentBook.totalQuantity,
      image: currentBook.image,
    };
    // console.log(newBookData);

    Swal.fire({
      title: "Bạn có muốn lưu cuốn sách mới này không?",
      showCancelButton: true,
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        createBook(newBookData);
        Swal.fire("Đã lưu!", "Cuốn sách mới đã được thêm.", "success");
      }
    });
  };

  const handleSubmitEditBook = async () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn cập nhật cuốn sách này không?",
      text: "Xin vui lòng xác nhận bạn muốn thực hiện những thay đổi này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, cập nhật đi!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedBook = {
          ...currentBook,
          title: currentBook.title,
          authorID: currentBook.authorID,
          genreID: currentBook.genreID,
          remainingQuantity: currentBook.remainingQuantity,
          totalQuantity: currentBook.totalQuantity,
          image: currentBook.image,
        };
        editBook(updatedBook, updatedBook.bookID).then(() => {
          let updatedBooks = books.map((book) =>
            book.bookID === updatedBook.bookID
              ? { ...book, ...updatedBook }
              : book
          );
          setBooks(updatedBooks);
          setShowEditModal(false);
          Swal.fire("Đã cập nhật!", "Cuốn sách đã được cập nhật.", "success");
        });
      }
    });
  };

  return (
    <Container className="mt-4">
      <h1>Quản lý Sách</h1>
      <Button variant="primary" onClick={handleAddNewBook} className="mb-3">
        Thêm Sách Mới
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Tác giả</th>
            <th>Thể loại</th>
            <th>Số lượng còn lại</th>
            <th>Tổng số lượng</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookID}>
              <td>{book.bookID}</td>
              <td>{book.title}</td>
              <td>
                {authors.find((a) => a.authorID === book.authorID)
                  ?.authorName || "Không rõ"}
              </td>
              <td>
                {genres.find((g) => g.genreID === book.genreID)?.genreName ||
                  "Không rõ"}
              </td>
              <td>{book.remainingQuantity}</td>
              <td>{book.totalQuantity}</td>
              <td>
                <img
                  src={book.image || "https://via.placeholder.com/150"}
                  alt="Book cover"
                  style={{ width: "100px", height: "150px" }}
                />
              </td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(book)}>
                  Chỉnh sửa
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(book.bookID)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for adding and editing book */}
      <Modal show={showAddModal || showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {showAddModal ? "Thêm Sách Mới" : "Chỉnh sửa Sách"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                value={currentBook.title}
                onChange={(e) =>
                  setCurrentBook({ ...currentBook, title: e.target.value })
                }
                placeholder="Nhập tiêu đề sách"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tác giả</Form.Label>
              <Form.Control
                as="select"
                value={currentBook.authorID}
                onChange={(e) =>
                  setCurrentBook({ ...currentBook, authorID: e.target.value })
                }
              >
                {authors.map((author) => (
                  <option key={author.authorID} value={author.authorID}>
                    {author.authorName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Thể loại</Form.Label>
              <Form.Control
                as="select"
                value={currentBook.genreID}
                onChange={(e) =>
                  setCurrentBook({ ...currentBook, genreID: e.target.value })
                }
              >
                {genres.map((genre) => (
                  <option key={genre.genreID} value={genre.genreID}>
                    {genre.genreName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Số lượng còn lại</Form.Label>
              <Form.Control
                type="number"
                value={currentBook.remainingQuantity}
                onChange={(e) =>
                  setCurrentBook({
                    ...currentBook,
                    remainingQuantity: e.target.value,
                  })
                }
                placeholder="Nhập số lượng còn lại"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tổng số lượng</Form.Label>
              <Form.Control
                type="number"
                value={currentBook.totalQuantity}
                onChange={(e) =>
                  setCurrentBook({
                    ...currentBook,
                    totalQuantity: e.target.value,
                  })
                }
                placeholder="Nhập tổng số lượng"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="text"
                value={currentBook.image}
                onChange={(e) =>
                  setCurrentBook({ ...currentBook, image: e.target.value })
                }
                placeholder="URL hình ảnh"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={showAddModal ? handleSubmitNewBook : handleSubmitEditBook}
          >
            {showAddModal ? "Lưu Sách" : "Cập nhật Sách"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ManageBooks;
