import { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/auth-layout/auth-layout";

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
                "https://my-movies-flix-app-56f9661dc035.herokuapp.com/api/login",
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
        <AuthLayout title="Login" subtitle="Please login to continue">
            {/* Error message display */}
            {error && (
                <Alert variant="danger" className="mb-3" role="alert">
                    {error}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="form-group">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="3"
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" className="form-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="3"
                        className="form-control"
                    />
                </Form.Group>
                <div className="button-container">
                    <Button type="submit" variant="primary" className="login-button">
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
                                <span className="visually-hidden">Logging in...</span>
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>

                    <div className="text-center mt-3">
                        <p className="mb-0">
                            Don't have an account?{" "}
                            <Link to="/api/signup" className="signup-link">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </Form>
        </AuthLayout>
    );
};
