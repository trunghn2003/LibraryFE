import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button"; // Đảm bảo bạn đã import Button từ 'react-bootstrap'
import { LOG_OUT } from "../../actions/user";

function Header() {
  // Giả sử dữ liệu người dùng được lưu trong sessionStorage dưới dạng chuỗi JSON
const userDataString = sessionStorage.getItem("user"); // Lấy dữ liệu người dùng dưới dạng chuỗi từ sessionStorage
const userData = userDataString ? JSON.parse(userDataString) : null; // Phân tích chuỗi JSON thành đối tượng JavaScript, chỉ khi có dữ liệu

// Khai báo và khởi tạo biến isAdmin
let isAdmin = false;

// Kiểm tra xem có dữ liệu người dùng không và người dùng có phải là admin không
if (userData && userData.role === "admin") {
    isAdmin = true;
}

// In thông tin người dùng hoặc một chi tiết cụ thể để kiểm tra
// console.log(userData);
// if (userData) {
//     console.log("Role:", userData.role); // Kiểm tra role của người dùng, nếu có dữ liệu
// }


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: LOG_OUT }); // Dispatch action LOGOUT
    sessionStorage.removeItem("user"); // Xóa user khỏi sessionStorage
    navigate("/"); // Chuyển hướng người dùng về trang chủ
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book">Books</Nav.Link>
            {userData ? (
              <>
                <Button onClick={handleLogout} style={{ marginRight: "10px" }}>
                  Logout
                </Button>
                {isAdmin && (
                  <>
                    <Nav.Link href="/manage-books">Manage Books</Nav.Link>
                    <Nav.Link href="/manage-authors">Manage Authors</Nav.Link>
                    <Nav.Link href="/manage-genres">Manage Genres</Nav.Link>
                  </>
                )}
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
