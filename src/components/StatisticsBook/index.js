import React from 'react';
import Table from 'react-bootstrap/Table';

const StatisticsBorrowedBook = () => {
    // Assuming you have an array of borrowed books called 'borrowedBooks'
    const borrowedBooks = [
        { title: 'Book 1', borrowedDate: '2022-01-01' },
        { title: 'Book 2', borrowedDate: '2022-02-01' },
        { title: 'Book 3', borrowedDate: '2022-03-01' },
        // ...
    ];

    // Sort the borrowed books array in descending order based on the borrowed date
    const sortedBooks = borrowedBooks.sort((a, b) => new Date(b.borrowedDate) - new Date(a.borrowedDate));

    return (
        <Table striped bordered>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Borrowed Date</th>
                </tr>
            </thead>
            <tbody>
                {sortedBooks.map((book, index) => (
                    <tr key={index}>
                        <td>{book.title}</td>
                        <td>{book.borrowedDate}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default StatisticsBorrowedBook;