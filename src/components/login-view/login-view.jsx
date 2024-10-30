import { useState } from "react";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
    const[username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

    const data = {
        Username: username,
        Password: password
    };

    fetch("https://my-movies-flix-app-56f9661dc035.herokuapp.com/login", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((response) => { 
        if (!response.ok) {
            throw new Error("Login failed");
        }
        return response.json();
    })
    .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          setError("Invalid credentials");
        }
    })
    .catch((e) => {
        setError(e.message);
    });
}
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