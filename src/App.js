import LayoutDefault from "./components/LayoutDefault";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Book from "./components/Book";
import Login from "./components/Login";
import ManageBooks from "./components/ManageBooks";
import ManageAuthors from "./components/ManageAuthors";
import ManageGenres from "./components/ManagerGenres";
// import {Button} from 'react-bootstrap'
const App = () => (
  <>
    <Routes>
      <Route path="/" element={<LayoutDefault />}>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manage-books" element={<ManageBooks />} />
        <Route path="/manage-authors" element={<ManageAuthors />} />
        <Route path="/manage-genres" element={<ManageGenres />} />
      </Route>
    </Routes>
  </>
);

export default App;
