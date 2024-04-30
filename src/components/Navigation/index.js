import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Trang Chủ</Link></li>
        <li><Link to="/book">Sách</Link></li>
        <li><Link to="/cart">Giỏ Hàng</Link></li>
        <li><Link to="/login">Đăng Nhập</Link></li>
        <li><Link to="/manage-books">Quản Lý Sách</Link></li>
        <li><Link to="/manage-authors">Quản Lý Tác Giả</Link></li>
        <li><Link to="/manage-genres">Quản Lý Thể Loại</Link></li>
      </ul>
    </nav>
  );
}
export default Navigation;