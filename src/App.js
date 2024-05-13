import LayoutDefault from "./components/LayoutDefault";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Book from "./components/Book";
import Login from "./components/Login";
import ManageBooks from "./components/ManageBooks";
import Cart from "./components/Cart";
import ManageAuthors from "./components/ManageAuthors";
import ManageGenres from "./components/ManagerGenres";
import { useState } from "react";
import { useDispatch } from "react-redux";
import BorrowedBooks from "./components/BorrowedBook";
import Borrowings from "./components/Borrowing";
import StatisticsBorrowedBook from "./components/StatisticsBook";
// import {Button} from 'react-bootstrap'
function App() {
  
  
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutDefault />}>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manage-books" element={<ManageBooks />} />
          <Route path="/manage-authors" element={<ManageAuthors />} />
          <Route path="/manage-genres" element={<ManageGenres />} />
          <Route path="/borrowed-books" element={<BorrowedBooks />} />
          <Route path="borrowing" element={<Borrowings />} />
          <Route path="statistics" element={<StatisticsBorrowedBook />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
