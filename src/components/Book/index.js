import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { addBookToCart, getAuthors, getBooks, getGenres } from "../../services/bookService";
import "./book.css";  // Ensure the CSS file is correctly imported
import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
function Book() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  // Hàm thêm sách vào giỏ hàng, sử dụng sessionStorage
  const addToCart = async (book) => {
    toast.success("Sách đã được thêm vào giỏ hàng", {
      position: "top-right"
    });

    let currentCart = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    currentCart.push(book);
    console.log(book.bookID)
    addBookToCart(book.bookID)
    sessionStorage.setItem("cartItems", JSON.stringify(currentCart));
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const booksData = await getBooks();
        const authorsData = await getAuthors();
        const genresData = await getGenres();

        const authorMap = new Map(authorsData.map(author => [author.authorID, author.authorName]));
        const genreMap = new Map(genresData.map(genre => [genre.genreID, genre.genreName]));

        const enrichedBooks = booksData.map(book => ({
          ...book,
          authorName: authorMap.get(book.authorID),
          genreName: genreMap.get(book.genreID)
        }));

        setBooks(enrichedBooks);
        setAuthors(authorsData);
        setGenres(genresData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Optionally handle the error by showing a user-friendly message or UI element
      }
    };

    fetchApi();
  }, [books]);

  return (
    <Container fluid className="book-container">
      <Row>
        <Col md={3} className="sidebar-authors">
          <h4 className="sidebar-title">Authors</h4>
          <ListGroup>
            {authors.map(author => (
              <ListGroup.Item action key={author.authorID}>
                {author.authorName}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <h4 className="sidebar-title">Genres</h4>
          <ListGroup>
            {genres.map(genre => (
              <ListGroup.Item action key={genre.genreID}>
                {genre.genreName}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={9} className="featured-books">
          <h2>Featured Books</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {books.map(book => (
              <Col key={book.bookID}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={book.image || "https://via.placeholder.com/150"}
                    alt="Book Cover"
                    className="book-image"
                  />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                      Author: {book.authorName || "Unknown"}
                      <br />
                      Genre: {book.genreName || "Unknown"}
                      <br />
                      Status: {book.status}
                      <br />
                      Remaining: {book.remainingQuantity} / {book.totalQuantity}
                    </Card.Text>
                    <Button variant="primary" onClick={() => addToCart(book)} disabled = {book.remainingQuantity === 0}>Add to Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <ToastContainer />
    </Container>

  );
}

export default Book;
