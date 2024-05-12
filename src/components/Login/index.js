import React, { useState } from 'react';
import { Container, Tabs, Tab, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../reducers/user'; // Assuming you have a register action in your user reducer
import { useNavigate } from 'react-router-dom';
import './login.css';
import { register } from '../../services/user';
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
      dispatch(login({ username, password, type: userType }));
    } else {
      alert('Please fill in all fields.');
    }
  }

  const token = sessionStorage.getItem("token")
  if (token) {
    navigate('/');
  }

  return (
    <Form className="login-form" onSubmit={handleLogin}>
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

function RegistrationForm() {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      setRegisterError('Passwords do not match');
      return;
    }

    try {
      const data = { username: registerUsername, password: registerPassword }
      register(data);
    } catch (error) {
      setRegisterError(error.message);
    }
  }

  return (
    <Form className="registration-form" onSubmit={handleRegister}>
      <Form.Group className="mb-3" controlId="formBasicRegisterUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicRegisterPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicRegisterConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={registerConfirmPassword}
          onChange={(e) => setRegisterConfirmPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
      {registerError && <div className="alert alert-danger mt-3">{registerError}</div>}
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
          <RegistrationForm />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Login;
