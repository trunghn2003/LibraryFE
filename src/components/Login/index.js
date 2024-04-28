import React, { useEffect, useState } from 'react';
import { Container, Tabs, Tab, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../reducers/user';
import { useNavigate } from 'react-router-dom';
export function loadUserFromStorage() {
  const userData = sessionStorage.getItem('user');
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
}
function LoginForm({ userType }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector(state => state.userReducer.isLoading);
  const error = useSelector(state => state.userReducer.error);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      // console.log(username, password, userType)
      dispatch(login({ username, password, type: userType }));
    } else {
      alert('Please fill in all fields.');
    }
  }
  // const userData = loadUserFromStorage();
  // const { user } = useSelector(state => state.userReducer);
  const user = sessionStorage.getItem("user")
  useEffect(() => {
    if (user) {
      navigate('/'); // Chuyển hướng người dùng đến trang home
    }
  }, [user, navigate]);
  


  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId={`formBasicUsername-${userType}`}>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId={`formBasicPassword-${userType}`}>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Submit'}
      </Button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </Form>
  );
}

function Login() {
  return (
    <Container>
      <Tabs defaultActiveKey="user" id="controlled-tab-example" className="mb-3">
        <Tab eventKey="user" title="User Login">
          <LoginForm userType="user" />
        </Tab>
        <Tab eventKey="admin" title="Admin Login">
          <LoginForm userType="admin" />
        </Tab>
        <Tab eventKey="register" title="Register">
          {/* Registration form here */}
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Login;
