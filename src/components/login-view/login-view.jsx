import { useState } from "react";
import { Form, Button, Container, Row, Col, Card, CardGroup } from "react-bootstrap";

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
        <Row>
            <Col>
            <CardGroup> 
                <Card>
                    <Card.Body>
            <Card.Title>Login</Card.Title> 
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>    
            )}
            <Form onSubmit={handleSubmit}>
            <Form.Group as={Col} md="4" controlId="formUsername">
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

            <Form.Group as={Col} md="4" controlId="formPassword">
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
            <Button variant="primary" type="submit">
                Login
                </Button>
        </Form>
        </Card.Body>
        </Card>
        </CardGroup>
        </Col>
        </Row>
        </Container>
    );
}