import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/user/userSlice";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/auth-layout/auth-layout";

export const LoginView = ({ onLoggedIn }) => {
    const dispatch = useDispatch();
    const { user, token, status, error } = useSelector((state) => state.user);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Call onLoggedIn when login is successful
    useEffect(() => {
        if (user && token && typeof onLoggedIn === "function") {
            onLoggedIn(user, token);
        }
    }, [user, token, onLoggedIn]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login({ Username: username, Password: password }));
    };

    return (
        <AuthLayout title="Login" subtitle="Please login to continue">
            {/* Error message display */}
            {error && status === "failed" && (
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
                    <Button
                        type="submit"
                        variant="primary"
                        className="login-button"
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? (
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
                            <Link to="/signup" className="signup-link">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </Form>
        </AuthLayout>
    );
};
