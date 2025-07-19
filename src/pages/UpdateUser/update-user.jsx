import React, { useState } from "react";
// prettier-ignore
import { Button, Container, Collapse, Card, Form as BootstrapForm, Alert, Spinner } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { updateSchema } from "../../components/form-validation/form-validation";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk } from "../../features/user/userSlice";
import "./update-user.scss";

export const UpdateUser = ({ setUser, onUpdateSuccess, onDeleteAccount, isDeleting }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    async function handleSubmit(values, { setSubmitting, resetForm }) {
        setLoading(true);
        setError("");

        try {
            console.log("Submitting values:", values);

            const updatedUser = await dispatch(
                updateUserThunk({ userId: user.id, updates: values })
            ).unwrap();

            setUser(updatedUser);
            setSuccess(true);
            resetForm();

            setTimeout(() => {
                setSuccess(false);
                setShowForm(false);
            }, 3000);

            if (onUpdateSuccess) {
                onUpdateSuccess(updatedUser);
            }
        } catch (error) {
            setError("Failed to update user. Please try again.");
            console.error("Error updating user:", error);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    }

    return (
        <Container>
            <Card className="user-update-card">
                <Card.Header className="card-header d-flex align-items-center">
                    <Card.Title>Update your info</Card.Title>
                </Card.Header>
                <Collapse in={showForm}>
                    <div>
                        <Card.Body className="user-update-body">
                            {/* Error message display to client*/}
                            {error && (
                                <Alert variant="danger" className="mb-3">
                                    {error}
                                </Alert>
                            )}
                            {/* Success message display */}
                            {success && (
                                <Alert variant="success" className="mb-3">
                                    Update successful!
                                </Alert>
                            )}

                            {/* Formik form handling */}
                            <Formik
                                initialValues={{
                                    Username: "",
                                    Password: "",
                                    Email: ""
                                }}
                                validationSchema={updateSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, touched, errors }) => (
                                    <Form className="update-form">
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
                                                isInvalid={touched.Username && errors.Username}
                                                autoComplete="off"
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
                                                placeholder="At least 8 characters or more"
                                                isInvalid={touched.Password && errors.Password}
                                                autoComplete="off"
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
                                                type="text"
                                                placeholder="Enter a new email"
                                                isInvalid={touched.Email && errors.Email}
                                                autoComplete="off"
                                            />
                                            <ErrorMessage
                                                name="Email"
                                                component={BootstrapForm.Control.Feedback}
                                                type="invalid"
                                            />
                                        </BootstrapForm.Group>
                                        <Button
                                            className="update-user-button btn-primary"
                                            type="submit"
                                            disabled={isSubmitting || loading}
                                        >
                                            {loading ? (
                                                <Spinner animation="border" size="sm" />
                                            ) : (
                                                "Update"
                                            )}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={onDeleteAccount}
                                disabled={isDeleting}
                                className="delete-account-btn"
                            >
                                {isDeleting ? (
                                    <Spinner animation="border" size="sm" />
                                ) : (
                                    "Delete Account"
                                )}
                            </Button>
                        </Card.Body>
                    </div>
                </Collapse>

                <Card.Footer className="text-center">
                    <div className="d-flex flex-column align-items-center">
                        <Button
                            variant="link"
                            className="toggle-form-btn"
                            onClick={() => setShowForm(!showForm)}
                            aria-expanded={showForm}
                        >
                            {showForm ? "Hide" : "Click to update your info"}
                        </Button>
                    </div>
                </Card.Footer>
            </Card>
        </Container>
    );
};

UpdateUser.propTypes = {
    setUser: PropTypes.func,
    onUpdateSuccess: PropTypes.func
};
