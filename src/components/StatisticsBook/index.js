import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { statisticsBorrowedBook } from '../../services/bookService';

const StatisticsBorrowedBook = () => {
    
    //
    const [books, setBooks] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
          try {
            const booksData = await statisticsBorrowedBook();
            setBooks(booksData);
          } catch (error) {
            console.error("Failed to fetch data:", error);
            // Optionally handle the error by showing a user-friendly message or UI element
          }
        };
    
        fetchApi();
      }, []);
  

    
    return (
        <Table striped bordered>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Count</th>
                    <th>Author</th>
                    <th>Genre</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => (
                    <tr key={index}>
                        <td>{book.bookId}</td>
                        <td>{book.bookName}</td>
                        <td>{book.borrowedCount}</td>
                        <td>{book.authorName}</td>
                        <td>{book.genreName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default StatisticsBorrowedBook;