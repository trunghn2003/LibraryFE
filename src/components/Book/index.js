import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { getAuthors, getBooks, getGenres } from "../../services/bookService";
import "./book.css";  // Ensure the CSS file is correctly imported

function Book() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  // Hàm thêm sách vào giỏ hàng, sử dụng sessionStorage
  const addToCart = (book) => {
    let currentCart = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    currentCart.push(book);
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
  }, []);

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
                    <Button variant="primary" onClick={() => addToCart(book)}>Add to Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Book;
