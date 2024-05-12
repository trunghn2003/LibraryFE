import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import {jwtDecode} from 'jwt-decode'; // Sửa lỗi nhập khẩu
import "./header.css";
import { LOG_OUT } from "../../actions/user";

function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserData(decodedToken);
        setIsAdmin(decodedToken['role'] === "admin");
      } catch (error) {
        console.error('Error decoding token:', error);
        sessionStorage.removeItem("token"); // Nếu token không hợp lệ, xóa bỏ nó
        navigate("/login");
      }
    }

    // Đăng ký một sự kiện để xử lý re-login từ các tab khác
    const handleStorageChange = (event) => {
      if (event.key === 'token') {
        if (event.newValue) {
          const decodedToken = jwtDecode(event.newValue);
          setUserData(decodedToken);
          setIsAdmin(decodedToken['role'] === "admin");
        } else {
          setUserData(null);
          setIsAdmin(false);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);

  const handleLogout = () => {
    dispatch({ type: LOG_OUT });
    sessionStorage.removeItem("token");
    setUserData(null);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book">Book</Nav.Link>
            {userData ? (
              <>
                <Nav.Link href="/cart">Cart</Nav.Link>
                <Nav.Link href="/borrowed-books">Borrowed Book</Nav.Link>
                {isAdmin && (
                  <>
                    <Nav.Link href="/manage-books">Manage Books</Nav.Link>
                    <Nav.Link href="/manage-authors">Manage Authors</Nav.Link>
                    <Nav.Link href="/manage-genres">Manage Genres</Nav.Link>
                    <Nav.Link href="/borrowing">Approve Borrowing</Nav.Link>
                  </>
                )}
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
          {userData && (
            <Dropdown align="end">
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="avatar-dropdown">
                <img
                  src={require("../../images/avatar.jpg")}
                  alt="avatar"
                  className="rounded-circle avatar-img"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
