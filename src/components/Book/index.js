import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { getAuthors, getBooks, getGenres } from "../../services/bookService";
import "./book.css";  // Đảm bảo file CSS được import đúng

function Book() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const booksData = await getBooks();
      const authorsData = await getAuthors();
      const genresData = await getGenres();

      // Tạo map để tra cứu nhanh tác giả và thể loại
      const authorMap = new Map(authorsData.map(author => [author.authorID, author.authorName]));
      const genreMap = new Map(genresData.map(genre => [genre.genreID, genre.genreName]));

      // Liên kết thông tin tác giả và thể loại vào mỗi quyển sách
      const enrichedBooks = booksData.map(book => ({
        ...book,
        authorName: authorMap.get(book.authorID),
        genreName: genreMap.get(book.genreID)
      }));

      setBooks(enrichedBooks);
      setAuthors(authorsData);
      setGenres(genresData);
    };

    fetchApi();
  }, []);

  return (
    <Container fluid className="book-container">
      <Row>
        <Col md={2} className="sidebar-authors">
          <h4 className="sidebar-title">Authors</h4>
          <ListGroup className="author-list">
            {authors.map(author => (
              <ListGroup.Item action key={author.authorID} className="author-item">
                {author.authorName}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <h4 className="sidebar-title">Genres</h4>
          <ListGroup className="genre-list">
            {genres.map(genre => (
              <ListGroup.Item action key={genre.genreID} className="genre-item">
                {genre.genreName}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={10} className="featured-books">
          <h2>Featured Books</h2>
          <Row xs={1} md={2} lg={4} className="g-4">
            {books.map(book => (
              <Col key={book.bookID} className="book-col">
                <Card className="book-card">
                  <Card.Img
                    variant="top"
                    src={book.image || "https://via.placeholder.com/150x200?text=Book+Cover"}
                    className="book-image"
                  />
                  <Card.Body className="book-body">
                    <Card.Title className="book-title">{book.title}</Card.Title>
                    <Card.Text className="book-text">
                      Author: {book.authorName || "Unknown"}
                      <br />
                      Genre: {book.genreName || "Unknown"}
                      <br />
                      Status: {book.status}
                      <br />
                      Remaining: {book.remainingQuantity} / {book.totalQuantity}
                    </Card.Text>
                    <Button variant="primary">Add to cart</Button>
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
