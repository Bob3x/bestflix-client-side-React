import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
// prettier-ignore
import { Button, Container, Row, Col, Card, Form as BootstrapForm, Alert, Spinner } from "react-bootstrap";
import { signupSchema } from "../form-validation/form-validation";
import "./signup-view.scss";
import logo from "../../assets/bestflix_075.png";

export const SignupView = ({ onLoggedIn }) => {
    // State for managing form-level messages
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Form submission handler
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await fetch(
                "https://my-movies-flix-app-56f9661dc035.herokuapp.com/users",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                }
            );

            if (!response.ok) {
                throw new Error("Signup failed");
            }

            // Auto login after signup
            const loginResponse = await fetch(
                "https://my-movies-flix-app-56f9661dc035.herokuapp.com/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Username: values.Username,
                        Password: values.Password
                    })
                }
            );

            if (!loginResponse.ok) {
                throw new Error("Auto-login failed");
            }

            const data = await loginResponse.json();
            onLoggedIn(data.user, data.token);

            setSuccess(true);
            resetForm();

            // Navigate to main view
            navigate("/");
        } catch (error) {
            console.error("Error:", error);
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="signup-container">
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
                            <h6>still a lot to watch</h6>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Card className="signup-card">
                        <div className="title-container">
                            <Card.Title>Sign Up</Card.Title>
                            <Card.Subtitle className="text-muted">Create an account</Card.Subtitle>
                        </div>{" "}
                        <Card.Body>
                            {/* Error message display to client*/}
                            {error && (
                                <Alert variant="danger" className="mb-3" role="alert">
                                    {error}
                                </Alert>
                            )}

                            {/* Success message display */}
                            {success && (
                                <Alert variant="success" className="mb-3" role="status">
                                    Signup successfull! Redirecting...
                                </Alert>
                            )}

                            {/* Formik form handling */}
                            <Formik
                                initialValues={{
                                    Username: "",
                                    Password: "",
                                    Email: "",
                                    termsAccepted: false
                                }}
                                validationSchema={signupSchema}
                                onSubmit={(values, actions) => {
                                    console.log("Form submitted with values:", values);
                                    handleSubmit(values, actions);
                                }}
                            >
                                {({ isSubmitting, touched, errors }) => (
                                    <Form>
                                        <BootstrapForm.Group className="form-group">
                                            <BootstrapForm.Label htmlFor="Username">
                                                Username
                                            </BootstrapForm.Label>
                                            <Field
                                                as={BootstrapForm.Control}
                                                id="Username"
                                                name="Username"
                                                type="text"
                                                aria-describedby="username-error"
                                                isInvalid={touched.Username && errors.Username}
                                            />
                                            <ErrorMessage
                                                name="Username"
                                                component={BootstrapForm.Text}
                                                id="username-error"
                                                className="text-danger"
                                            />
                                        </BootstrapForm.Group>
                                        <BootstrapForm.Group className="form-group">
                                            <BootstrapForm.Label htmlFor="Email">
                                                Email
                                            </BootstrapForm.Label>
                                            <Field
                                                as={BootstrapForm.Control}
                                                id="Email"
                                                name="Email"
                                                type="email"
                                                isInvalid={touched.Email && errors.Email}
                                            />
                                            <ErrorMessage
                                                name="Email"
                                                component={BootstrapForm.Text}
                                                id="email-error"
                                                className="text-danger"
                                            />
                                        </BootstrapForm.Group>
                                        <BootstrapForm.Group className="form-group">
                                            <BootstrapForm.Label htmlFor="Password">
                                                Password
                                            </BootstrapForm.Label>
                                            <Field
                                                as={BootstrapForm.Control}
                                                id="Password"
                                                name="Password"
                                                type="password"
                                                isInvalid={touched.Password && errors.Password}
                                            />
                                            <ErrorMessage
                                                name="Password"
                                                component={BootstrapForm.Text}
                                                id="password-error"
                                                className="text-danger"
                                            />
                                        </BootstrapForm.Group>
                                        <BootstrapForm.Group className="form-group mb-4">
                                            <div className="terms-checkbox">
                                                <Field
                                                    type="checkbox"
                                                    name="termsAccepted"
                                                    id="termsAccepted"
                                                    className={`form-check-input ${
                                                        touched.termsAccepted &&
                                                        errors.termsAccepted
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                />
                                                <BootstrapForm.Label
                                                    htmlFor="termsAccepted"
                                                    className="form-check-lable ms-2"
                                                >
                                                    I Agree to the
                                                    <Link to="/terms" className="terms-link">
                                                        Terms & Conditions
                                                    </Link>
                                                </BootstrapForm.Label>
                                                <ErrorMessage
                                                    name="termsAccepted"
                                                    component={BootstrapForm.Text}
                                                    className="text-danger"
                                                />
                                            </div>
                                        </BootstrapForm.Group>
                                        <div className="d-grid">
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="signup-button"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                            className="me-2"
                                                        />
                                                        <span className="visually-hidden">
                                                            Signing up...
                                                        </span>
                                                    </>
                                                ) : (
                                                    "Sign Up"
                                                )}
                                            </Button>
                                        </div>
                                        <div className="text-center mt-3">
                                            <p className="mb-0">
                                                Already have an account -{" "}
                                                <Link to="/login" className="login-link">
                                                    Login
                                                </Link>
                                            </p>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
