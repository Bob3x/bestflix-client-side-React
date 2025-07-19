import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../../features/user/userSlice";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth-layout/auth-layout";

export const LoginView = () => {
    const dispatch = useDispatch();
    const { user, token, status, error } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    // Redirect to main page after successful login
    useEffect(() => {
        if (user && token) {
            navigate("/");
        }
    }, [user, token, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(clearError());
        dispatch(login({ Email: email, Password: password }));
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
                <Form.Group controlId="formEmail" className="form-group">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        minLength="3"
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" className="form-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
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
                            <Link
                                to="/signup"
                                className="signup-link"
                                onClick={() => {
                                    console.log("[LoginView] Sign up link clicked");
                                }}
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </Form>
        </AuthLayout>
    );
};
