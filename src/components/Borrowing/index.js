import React, { useEffect, useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { getBorrowedBooksByBorrowingId, getBooks, getBorrowings, confirmBorrowBook, confirmReturnBook } from '../../services/bookService';
import { format, parseISO } from 'date-fns';
import Swal from 'sweetalert2';

function Borrowings() {
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
            let borrowingsData = await getBorrowings();
            borrowingsData = borrowingsData.sort((a, b) => {
                return -1;
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

    const handleConfirm = async (borrowingId) => {
        try {
            await confirmBorrowBook(borrowingId);
            Swal.fire('Thành công', 'Đã phê duyệt mượn sách', 'success');
        } catch (error) {
            Swal.fire('Error', 'Failed to return the book', 'error');
        }
    };
    const handleConfirmReturn = async (borrowingId) => {
        try {
            await confirmReturnBook(borrowingId);
            Swal.fire('Thành công', 'Đã phê duyệt trả sách', 'success');
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
                        <th>Phê duyệt mượn</th>
                        <th>Phê duyệt trả</th>
                        <th>Borrowed Books</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowings.length > 0 ? borrowings.map((borrowing, index) => (
                        <tr key={index}>
                            <td>{borrowing.borrowingID}</td>
                            <td>{formatDate(borrowing.borrowDate)}</td>
                            <td>{borrowing.returnDate ? formatDate(borrowing.returnDate) : 'Đang chờ phê duyệt'}</td>
                            <td>{borrowing.status}</td>
                            <td><Button onClick={() => handleConfirm(borrowing.borrowingID)} disabled={borrowing.status !== 'Đang chờ phê duyệt'}>Phê duyệt mượn</Button></td>
                            <td><Button onClick={() => handleConfirmReturn(borrowing.borrowingID)} disabled={borrowing.status !== 'Đang chờ phê duyệt trả'}>Phê duyệt trả</Button></td>
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

export default Borrowings;
