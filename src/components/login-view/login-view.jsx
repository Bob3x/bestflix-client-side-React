import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/bestflix_075.png";
import "./login-view.scss";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        const data = {
            Username: username,
            Password: password
        };

        try {
            console.log("Attempting login with:", data);
            const response = await fetch(
                "https://my-movies-flix-app-56f9661dc035.herokuapp.com/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="login-container">
            <Container className="header-container">
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <div className="text-end mb-4">
                            <div className="title-logo-wrapper">
                                <h2>Welcome to</h2>
                                <img
                                    src={logo}
                                    alt="MyFlix Logo"
                                    className="logo-image"
                                    width="250"
                                    height="auto"
                                />
                            </div>
                            <h6>Still a lot to watch</h6>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Card className="login-card">
                        <div className="title-container">
                            <Card.Title>Login</Card.Title>
                            <Card.Subtitle className="text-muted">
                                Please login to continue
                            </Card.Subtitle>
                        </div>{" "}
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
                                        minLength="3"
                                    />
                                </Form.Group>
                                <div className="button-container">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="login-button"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    className="me-2"
                                                />
                                                Loading...
                                            </>
                                        ) : (
                                            "Login"
                                        )}
                                    </Button>
                                </div>

                                <div className="text-center mt-3">
                                    <p className="mb-0">
                                        Don't have an account?{" "}
                                        <Link to="/signup" className="signup-link">
                                            Sign up
                                        </Link>
                                    </p>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
