import React, { useEffect, useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { getBorrowingsByUserId, returnBook, getBorrowedBooksByBorrowingId, getBooks } from '../../services/bookService';
import { format, parseISO } from 'date-fns';
import Swal from 'sweetalert2';

function BorrowedBooks() {
    const [borrowings, setBorrowings] = useState([]);
    const [books, setBooks] = useState([]);

    const user = JSON.parse(sessionStorage.getItem("user"));

    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        return format(date, 'PPP'); // 'PPP' for format like "May 13, 2024"
    };

    useEffect(() => {
        const fetchBorrowings = async () => {
            const bookDetails = await getBooks();
            setBooks(bookDetails);
            let borrowingsData = await getBorrowingsByUserId(user.userID);
            borrowingsData = borrowingsData.sort((a, b) => {
                // Sort by status, "Đã trả" should come after "Chưa trả"
                if (a.status === 'Đã trả' && b.status !== 'Đã trả') {
                    return 1;
                } else if (a.status !== 'Đã trả' && b.status === 'Đã trả') {
                    return -1;
                }
                return 0;
            });
            // Initialize borrowedBooks as an empty array
            const borrowingsWithBooks = await Promise.all(borrowingsData.map(async (borrowing) => ({
                ...borrowing,
                borrowedBooks: await getBorrowedBooksByBorrowingId(borrowing.borrowingID) || []
            })));
            setBorrowings(borrowingsWithBooks);
        };
        fetchBorrowings();
    }, [borrowings]);
    const getBookName = (bookId) => {
        const book = books.find(b => b.bookID === bookId);
        return book ? book.title : 'Unknown Book';
    };

    const handleReturn = async (borrowingId) => {
        try {
            await returnBook(borrowingId);
            Swal.fire('Success', 'Book returned successfully', 'success');
        } catch (error) {
            Swal.fire('Error', 'Failed to return the book', 'error');
        }
    };

    return (
        <Container className="mt-4">
            <h2>Borrowed Books</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Borrowing ID</th>
                        <th>Ngày mượn</th>
                        <th>Ngày trả</th>
                        <th>Trạng thái</th>
                        <th>Trả sách</th>
                        <th>Borrowed Books</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowings.length > 0 ? borrowings.map((borrowing, index) => (
                        <tr key={index}>
                            <td>{borrowing.borrowingID}</td>
                            <td>{formatDate(borrowing.borrowDate)}</td>
                            <td>{borrowing.returnDate ? formatDate(borrowing.returnDate) : 'Chưa trả'}</td>
                            <td>{borrowing.status}</td>
                            <td><Button onClick={() => handleReturn(borrowing.borrowingID)} disabled={borrowing.status === 'Đã trả'}>Trả sách</Button></td>
                            <td>
                                <ul>
                                    {borrowing.borrowedBooks?.map(bb => (
                                        <li key={bb.borrowedBookID}>{getBookName(bb.bookID)}</li> // Assuming you want to list book IDs
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="6">No borrowing records found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

export default BorrowedBooks;
