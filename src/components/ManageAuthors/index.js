import React, { useEffect, useState } from "react";
import { createAuthor, deleteAuthor, editAuthor, getAuthors } from "../../services/bookService";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ManageAuthors() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = sessionStorage.getItem("token");

  const [authors, setAuthors] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState({ authorID: "", authorName: "" });

  useEffect(() => {
    try {
      const decodedUser =  jwtDecode(token);
      if (decodedUser.role !== "admin") {
        navigate("/");  // Redirect non-admin users to the homepage
        return;
      }
      setUser(decodedUser); 
      if (!token || !decodedUser) {
          console.error("No token or failed to decode token");
          navigate("/login");
        }
        
  } catch (e) {
    console.error(e);
  }
    const fetchApi = async () => {
      const authorsData = await getAuthors();
      setAuthors(authorsData);
    };
    fetchApi();
  }, [authors]);

  const handleDelete = async (authorId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAuthor(authorId);
        Swal.fire('Deleted!', 'The author has been deleted.', 'success');
      }
    });
  };

  const handleEdit = (author) => {
    setCurrentAuthor(author);
    setShowEditModal(true);
  };

  const handleAddNewAuthor = () => {
    setCurrentAuthor({ authorID: "", authorName: "" });
    setShowAddModal(true);
  };

  const handleClose = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const handleSubmitNewAuthor = () => {
    Swal.fire({
      title: 'Do you want to save the new author?',
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        createAuthor({authorName:currentAuthor.authorName});
        setShowAddModal(false);
        Swal.fire('Saved!', 'The author has been added.', 'success');
      }
    });
  };

  const handleSubmitEditAuthor = () => {
    Swal.fire({
      title: 'Are you sure you want to update this author?',
      text: "Please confirm you want to make these changes",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        editAuthor(currentAuthor, currentAuthor.authorID);
        setShowEditModal(false);
        Swal.fire('Updated!', 'The author has been updated.', 'success');
      }
    });
  };

  return (
    <Container className="mt-4">
      <h1>Manage Authors</h1>
      <Button variant="primary" onClick={handleAddNewAuthor} className="mb-3">
        Add New Author
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.authorID}>
              <td>{author.authorID}</td>
              <td>{author.authorName}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(author)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(author.authorID)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for adding new author */}
      <Modal show={showAddModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                value={currentAuthor.authorName}
                onChange={(e) => setCurrentAuthor({...currentAuthor, authorName: e.target.value})}
                placeholder="Enter author name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmitNewAuthor}>Save Author</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing author */}
      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                value={currentAuthor.authorName}
                onChange={(e) => setCurrentAuthor({...currentAuthor, authorName: e.target.value})}
                placeholder="Enter author name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmitEditAuthor}>Update Author</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ManageAuthors;
