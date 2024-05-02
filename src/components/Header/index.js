import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import "./header.css"; // Import your custom styles here
import { LOG_OUT } from "../../actions/user";
function Header() {
  const userDataString = sessionStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  let isAdmin = false;
  if (userData && userData.role === "admin") {
    isAdmin = true;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: LOG_OUT });
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Thư viện</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Trang chủ</Nav.Link>
            <Nav.Link href="/book">Sách</Nav.Link>
            {userData ? (
              <>
                <Nav.Link href="/cart">Giỏ hàng</Nav.Link>
                <Nav.Link href="/borrowed-books">Sách đã mượn</Nav.Link>

                {isAdmin && (
                  <>
                    <Nav.Link href="/manage-books">Quản lý sách</Nav.Link>
                    <Nav.Link href="/manage-authors">Quản lý tác giả</Nav.Link>
                    <Nav.Link href="/manage-genres">Quản lý thể loại</Nav.Link>
                    <Nav.Link href="/borrowing">Phê duyệt</Nav.Link>
                  </>
                )}
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
          {userData && (
            <Dropdown alignRight>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="avatar-dropdown">
                {/* Insert your avatar URL in the `src` or use a placeholder image */}
                <img
                  src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/428701436_717986803780062_2419375325661557827_n.jpg?stp=cp6_dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Q3TWP4pRNmkQ7kNvgGVMUj1&_nc_ht=scontent.fhan18-1.fna&oh=00_AfBKAztmC4FyXJs3ILBaXvkqmccXBbS4v8cHsw3AUlKAiw&oe=66391F91" // Example avatar image
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
