import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ListGroup, Button, Container } from 'react-bootstrap';
import { RemoveBookFromCart, createBorrowedBook, createBorrowing } from '../../services/bookService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState([]);
    const user = JSON.parse(sessionStorage.getItem("user"))
    // Tải cartItems từ sessionStorage khi component được mount
    useEffect(() => {
        if(!user){
            console.log("hello")
            navigate("/login")
        }
        const items = sessionStorage.getItem("cartItems");
        if (items) {
            setCartItems(JSON.parse(items));  // Chỉ phân tích JSON nếu có dữ liệu
        }
    }, []);

    // Hàm xóa mục khỏi giỏ hàng
    const removeFromCart = (index, item) => {
        RemoveBookFromCart(item.bookID)
        const newCartItems = cartItems.filter((item, idx) => idx !== index);
        setCartItems(newCartItems);  // Cập nhật state
        sessionStorage.setItem("cartItems", JSON.stringify(newCartItems));  // Cập nhật sessionStorage
    };

    // Hàm mượn tất cả các mục trong giỏ hàng
    const borrowAllItems = async () => {
    
        // Định nghĩa thông tin phiếu mượn
        const borrowingData = {
            UserID: user.userID, // Giả sử ID người dùng đã đăng nhập
            BorrowDate: new Date().toISOString().split('T')[0], // Ngày hiện tại, format YYYY-MM-DD
            ReturnDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0], // Ngày trả, giả sử là 14 ngày sau ngày mượn
            Status: "Đang chờ phê duyệt" // Trạng thái ban đầu của phiếu mượn
        };
    
       
            // Gửi yêu cầu tạo phiếu mượn mới
            const borrowingResponse = await createBorrowing(borrowingData);
                for (const item of cartItems) {
                    const x = item.bookID
                    const borrowedBookData = {
                        BorrowingID: borrowingResponse.borrowingID,
                        BookID: x, 
                    };
                    console.log(borrowedBookData);
                    createBorrowedBook(borrowedBookData);
                }
                setCartItems([]);
                sessionStorage.removeItem("cartItems");
                Swal.fire("Bạn đã mượn thành công");
                navigate('/borrowed-books');
    };
    return (
        <Container>
            <ListGroup>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                            {item.title} - {item.authorName}
                            <Button variant="danger" onClick={() => removeFromCart(index,item)}>Remove</Button>
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item>Your cart is empty.</ListGroup.Item>
                )}
            </ListGroup>
            {cartItems.length > 0 && (
                <Button variant="success" className="mt-3" onClick={borrowAllItems}>Borrow All</Button>
            )}
        </Container>
    );
};

export default Cart;
