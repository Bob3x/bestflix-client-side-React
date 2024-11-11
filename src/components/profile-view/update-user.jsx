import { useState } from "react";
// prettier-ignore
import { Button, Container, Row, Col, Card, Form as BootstrapForm, Alert, Spinner } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { updateSchema } from "../form-validation/form-validation";
import PropTypes from "prop-types";

export const UpdateUser = ({ user, token, onUpdateSuccess }) => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [userData, setUserData] = useState(user);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            console.log("Submitting values:", values);
            console.log("Authorization token:", token);

            const requestBody = JSON.stringify(values);
            console.log("Request body:", requestBody);

            const response = await fetch(
                `https://my-movies-flix-app-56f9661dc035.herokuapp.com/users/${user.Username}`,
                {
                    method: "PUT",
                    body: requestBody,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                // Handle validation errors from the server
                const errorText = await response.text();
                console.error("Server response:", errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response data:", data);

            setSuccess(true);
            onUpdateSuccess(data);
            resetForm();
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Failed to update user. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container>
            <Row>
                <Col md={10}>
                    <Card className="mt-4">
                        <Card.Header className="text-center">
                            <Card.Title>Update your info</Card.Title>
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
                                    Update successfull!
                                </Alert>
                            )}

                            {/* Formik form handling */}
                            <Formik
                                initialValues={{
                                    Username: userData.Username || "",
                                    Password: "",
                                    Email: userData.Email || "",
                                }}
                                validationSchema={updateSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, touched, errors }) => (
                                    <Form>
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
                                                        placeholder="Enter new username"
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
                                                        placeholder="Enter a new email"
                                                        isInvalid={touched.Email && errors.Email}
                                                    />
                                                    <ErrorMessage
                                                        name="Email"
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
                                                        {isSubmitting ? "Updating..." : "Update"}
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

UpdateUser.propTypes = {
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    onUpdateSuccess: PropTypes.func.isRequired,
};
