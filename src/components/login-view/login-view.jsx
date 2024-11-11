import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
    const[username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
      
        const data = {
            Username: username,
            Password: password,
        };

        console.log("Attempting login with:", data);

        try {
            const response = await fetch(
                "https://my-movies-flix-app-56f9661dc035.herokuapp.com/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            console.log("Response status:", response.status);

            // Check if response is not JSON
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Invalid server response format");
            }

            const responseData = await response.json();
            console.log("Response data:", responseData);

            if (!response.ok) {
                throw new Error(responseData.message || "Invalid username or password");
            }

            if (!responseData.user || !responseData.token) {
                throw new Error("Invalid server response");
            }

            localStorage.setItem("user", JSON.stringify(responseData.user));
            localStorage.setItem("token", responseData.token);
            onLoggedIn(responseData.user, responseData.token);
        } catch (error) {
            console.error("Login error details:", error);
            setError(error.message || "Login failed. Please try again.");
        }
    };
  
    return (
        <Container>
        <Row className="justify-content-center">
            <Col md={6} className="mt-5">
                <Card className="mt=4">
                    <Card.Header className="text-center">
                <Card.Title>Login</Card.Title> 
                    </Card.Header>
                    <Card.Body>
            {error && (
                <Alert variant="danger" className="mb-3">
                    {error}
                </Alert>    
            )}
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Enter your unsername"
                        minLength="3"
                    />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="At least 8 characters"
                        minLength="3"
                />
            </Form.Group>
            <div className="d-grid">
                <Button variant="primary" type="submit" className="mt-3" >Login</Button>
            </div>
        </Form>
        </Card.Body>
        </Card>
        </Col>
        </Row>
        </Container>
    );
}