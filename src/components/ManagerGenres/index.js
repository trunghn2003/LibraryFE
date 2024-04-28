import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import Swal from 'sweetalert2';
import { createGenre, deleteGenre, editGenre, getGenres } from "../../services/bookService";

function ManageGenres() {
  const [genres, setGenres] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentGenre, setCurrentGenre] = useState({ genreID: "", genreName: "" });

  useEffect(() => {
    const fetchApi = async () => {
      const genresData = await getGenres();
      setGenres(genresData);
    };
    fetchApi();
  }, [genres]);

  const handleDelete = async (genreId) => {
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
        deleteGenre(genreId);
        Swal.fire('Deleted!', 'The genre has been deleted.', 'success');
      }
    });
  };

  const handleEdit = (genre) => {
    setCurrentGenre(genre);
    setShowEditModal(true);
  };

  const handleAddNewGenre = () => {
    setCurrentGenre({ genreID: "", genreName: "" });
    setShowAddModal(true);
  };

  const handleClose = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const handleSubmitNewGenre = () => {
    Swal.fire({
      title: 'Do you want to save the new genre?',
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        createGenre({genreName: currentGenre.genreName});
        setShowAddModal(false);
        Swal.fire('Saved!', 'The genre has been added.', 'success');
      }
    });
  };

  const handleSubmitEditGenre = () => {
    Swal.fire({
      title: 'Are you sure you want to update this genre?',
      text: "Please confirm you want to make these changes",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        editGenre(currentGenre, currentGenre.genreID);
        setShowEditModal(false);
        Swal.fire('Updated!', 'The genre has been updated.', 'success');
      }
    });
  };

  return (
    <Container className="mt-4">
      <h1>Manage Genres</h1>
      <Button variant="primary" onClick={handleAddNewGenre} className="mb-3">
        Add New Genre
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
          {genres.map((genre) => (
            <tr key={genre.genreID}>
              <td>{genre.genreID}</td>
              <td>{genre.genreName}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(genre)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(genre.genreID)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for adding new genre */}
      <Modal show={showAddModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Genre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Genre Name</Form.Label>
              <Form.Control
                type="text"
                value={currentGenre.genreName}
                onChange={(e) => setCurrentGenre({...currentGenre, genreName: e.target.value})}
                placeholder="Enter genre name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmitNewGenre}>Save Genre</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing genre */}
      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Genre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Genre Name</Form.Label>
              <Form.Control
                type="text"
                value={currentGenre.genreName}
                onChange={(e) => setCurrentGenre({...currentGenre, genreName: e.target.value})}
                placeholder="Enter genre name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmitEditGenre}>Update Genre</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ManageGenres;
