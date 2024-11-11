import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
// prettier-ignore
import { Button, Container, Row, Col, Card, Form as BootstrapForm, Alert, Spinner } from "react-bootstrap";
import { signupSchema } from "../form-validation/form-validation";

export const SignupView = () => {
    // State for managing form-level messages
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Form submission handler
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            console.log("Submitting values:", values); // Debug log

            const response = await fetch(
                "https://my-movies-flix-app-56f9661dc035.herokuapp.com/users",
                {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                //Handle validation errors from the server
                if (data.errors && Array.isArray(data.errors)) {
                    const errorMessages = data.errors.map((err) => err.msg).join(". ");
                    throw new Error(errorMessages);
                }
                throw new Error(data.message || "Signup failed");
            }
            setSuccess(true);
            resetForm();
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (err) {
            setError(err.message);
            console.error("Signup error:", err);
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
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, touched, errors }) => (
                                    <Form noValidate>
                                        {isSubmitting ? (
                                            <div className="text-center">
                                                <Spinner
                                                    animation="border"
                                                    variant="primary"
                                                    role="status"
                                                >
                                                    <span className="visually-hidden">
                                                        Loading...
                                                    </span>
                                                </Spinner>
                                            </div>
                                        ) : (
                                            <>
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
                                                        isInvalid={
                                                            touched.Username && errors.Username
                                                        }
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
                                                        isInvalid={
                                                            touched.Password && errors.Password
                                                        }
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
                                                        isInvalid={
                                                            touched.Birthday && errors.Birthday
                                                        }
                                                    />
                                                    <ErrorMessage
                                                        name="Birthday"
                                                        component={BootstrapForm.Control.Feedback}
                                                        type="invalid"
                                                    />
                                                </BootstrapForm.Group>
                                                <div className="d-grid">
                                                    <Button
                                                        variant="primary"
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? "Signing up..." : "Sign Up"}
                                                    </Button>
                                                </div>
                                            </>
                                        )}
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
