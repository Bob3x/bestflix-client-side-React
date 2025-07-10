import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, Form as BootstrapForm, Alert, Spinner } from "react-bootstrap";
import { signupSchema } from "../../components/form-validation/form-validation";
import AuthLayout from "../../components/auth-layout/auth-layout";
import { signupUser } from "../../services/userService";
import { login } from "../../features/user/userSlice";

export const SignupView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Form submission handler
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            // 1. Register the user
            await signupUser(values);

            // 2. Auto-login after signup using Redux thunk
            dispatch(login({ Username: values.Username, Password: values.Password }));

            setError("");
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
        <AuthLayout title="Sign Up" subtitle="Create an account">
            {/* Error message display to client*/}
            {error && (
                <Alert variant="danger" className="mb-3" role="alert">
                    {error}
                </Alert>
            )}

            {/* Success message display */}
            {success && (
                <Alert variant="success" className="mb-3" role="status">
                    Signup successful! Redirecting...
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
                    handleSubmit(values, actions);
                }}
                key="signup-form"
            >
                {({ isSubmitting, touched, errors }) => (
                    <Form>
                        <BootstrapForm.Group className="form-group">
                            <BootstrapForm.Label htmlFor="Username">Username</BootstrapForm.Label>
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
                            <BootstrapForm.Label htmlFor="Email">Email</BootstrapForm.Label>
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
                                data-testid="email-error"
                                style={{ minHeight: 20 }}
                            />
                        </BootstrapForm.Group>
                        <BootstrapForm.Group className="form-group">
                            <BootstrapForm.Label htmlFor="Password">Password</BootstrapForm.Label>
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
                                data-testid="password-error"
                            />
                        </BootstrapForm.Group>
                        <BootstrapForm.Group className="form-group mb-4">
                            <div className="terms-checkbox">
                                <Field
                                    type="checkbox"
                                    name="termsAccepted"
                                    id="termsAccepted"
                                    className={`form-check-input ${
                                        touched.termsAccepted && errors.termsAccepted
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                />
                                <BootstrapForm.Label
                                    htmlFor="termsAccepted"
                                    className="form-check-label ms-2 mt-1"
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
                        <div className="button-container">
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
                                        <span className="visually-hidden">Signing up...</span>
                                    </>
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                        </div>
                        <div className="text-center mt-3">
                            <p className="mb-0">
                                Already have an account?{" "}
                                <Link to="/login" className="login-link">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>
        </AuthLayout>
    );
};
