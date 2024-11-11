import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
// prettier-ignore
import { Button, Container, Row, Col, Card, Form as BootstrapForm, Alert, Spinner } from "react-bootstrap";
import { signupSchema } from "../form-validation/form-validation";

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
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
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
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        Username: values.Username,
                        Password: values.Password,
                    }),
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
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="mt-4">
                        <Card.Header className="text-center">
                            <Card.Title>Sign Up</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {/* Error message display to client*/}
                            {error && (
                                <Alert variant="danger" className="mb-3">
                                    {error}
                                </Alert>
                            )}

                            {/* Success message display */}
                            {success && (
                                <Alert variant="success" className="mb-3">
                                    Signup successfull! Redirecting...
                                </Alert>
                            )}

                            {/* Formik form handling */}
                            <Formik
                                initialValues={{
                                    Username: "",
                                    Password: "",
                                    Email: "",
                                    Birthday: "",
                                }}
                                validationSchema={signupSchema}
                                onSubmit={(values, actions) => {
                                    console.log("Form submitted with values:", values);
                                    handleSubmit(values, actions);
                                }}
                            >
                                {({ isSubmitting, touched, errors }) => (
                                    <Form>
                                        <BootstrapForm.Group className="mb-3">
                                            <BootstrapForm.Label htmlFor="Username">
                                                Username
                                            </BootstrapForm.Label>
                                            <Field
                                                as={BootstrapForm.Control}
                                                id="Username"
                                                name="Username"
                                                type="text"
                                                placeholder="Enter a username"
                                                isInvalid={touched.Username && errors.Username}
                                            />
                                            <ErrorMessage
                                                name="Username"
                                                component={BootstrapForm.Control.Feedback}
                                                type="invalid"
                                            />
                                        </BootstrapForm.Group>
                                        <BootstrapForm.Group className="mb-3">
                                            <BootstrapForm.Label htmlFor="Password">
                                                Password
                                            </BootstrapForm.Label>
                                            <Field
                                                as={BootstrapForm.Control}
                                                id="Password"
                                                name="Password"
                                                type="password"
                                                placeholder="At least 8 characters"
                                                isInvalid={touched.Password && errors.Password}
                                            />
                                            <ErrorMessage
                                                name="Password"
                                                component={BootstrapForm.Control.Feedback}
                                                type="invalid"
                                            />
                                        </BootstrapForm.Group>
                                        <BootstrapForm.Group className="mb-3">
                                            <BootstrapForm.Label htmlFor="Email">
                                                Email
                                            </BootstrapForm.Label>
                                            <Field
                                                as={BootstrapForm.Control}
                                                id="Email"
                                                name="Email"
                                                type="email"
                                                placeholder="Enter a valid email"
                                                isInvalid={touched.Email && errors.Email}
                                            />
                                            <ErrorMessage
                                                name="Email"
                                                component={BootstrapForm.Control.Feedback}
                                                type="invalid"
                                            />
                                        </BootstrapForm.Group>
                                        <BootstrapForm.Group className="mb-3">
                                            <BootstrapForm.Label htmlFor="Birthday">
                                                Birthday
                                            </BootstrapForm.Label>
                                            <Field
                                                as={BootstrapForm.Control}
                                                id="Birthday"
                                                name="Birthday"
                                                type="date"
                                                isInvalid={touched.Birthday && errors.Birthday}
                                            />
                                            <ErrorMessage
                                                name="Birthday"
                                                component={BootstrapForm.Control.Feedback}
                                                type="invalid"
                                            />
                                        </BootstrapForm.Group>
                                        <div className="d-grid gap-2">
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                disabled={isSubmitting}
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
