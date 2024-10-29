import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, Container, Row, Col, Card, CardGroup, CardBody } from "react-bootstrap";
import * as Yup from "yup";

export const SignupView = () => {
    // State for managing form-level messages
    const [ error, setError ] = useState("");
    const [ success, setSuccess ] = useState(false);

    const validationSchema = Yup.object({ 
        username: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Username is required!"),
        password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Password is required!"),
        email: Yup.string()
        .email("Please enter valid email")
        .required("Email is required!"),
        birthday: Yup.string()
        });
        // Form submission handler
        const handleSubmit = (values, { setSubmitting, resetForm }) => {
                setError("");
                setSuccess(false);
                        
                fetch("https://my-movies-flix-app-56f9661dc035.herokuapp.com/users", {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Signup failed");
                    }
                    return response.json();
                    
                })
                .then (() => {
                    setSuccess(true);
                    resetForm();
                    setTimeout(function() {
                        window.location.reload();
                        setSubmitting(false);
                    }, 2000);
                })
                .catch((e) => {
                    setError(e.message);
                    console.log(e.message, Error());
                })
                .finally(() => {
                    setSubmitting(false);
                });
            }; 

    return (
        <Container>
                    <CardGroup>
                        <Card className="SignUpCard">
                            <Card.Body>
                                <Card.Header>
                                <Card.Title>Sign Up</Card.Title> 
                                </Card.Header> 
            { /* Error message display to client*/}
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            {/* Success message display */}
            {success && (
                <div className="success-message">
                    Signup successfull! Redirecting...
                    </div>
            )}
        {/* Formik form handling */}
        <Formik
            initialValues={{ username: "", password:"", email: "", birthday: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Row className="justify-center">
                <Form as={Col} md="4">
                        <Col>
                        <label htmlFor="username">Username</label>
                        </Col>
                        <Field
                            className="Input-Fields"
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter a username"
                        />
                        <ErrorMessage
                            name="username"
                            component="div"
                            className="erro-message"
                        />
                        <Col>  
                        <label htmlFor="password">Password</label>
                        </Col>
                        <Field
                            className="Input-Fields"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="At least 8 characters"
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="error-message"
                        />        
                        <Col>
                        <label htmlFor="email">Email</label>
                        </Col>
                        <Col>
                        <Field
                            className="Input-Fields"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter a valid email"
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="error-message"
                        />
                        </Col>
                        <Col>        
                        <label htmlFor="birthday">Birthday</label>
                        </Col>
                        <Col>
                        <Field
                            className="Input-Fields"
                            id="birthday"
                            name="birthday"
                            type="date"
                        />
                        <ErrorMessage
                            name="birthday"
                            component="div"
                            className="error-message"
                        />
                        </Col>
                        <Col>
                    <Button 
                        className="SignUp"
                        variant="primary" 
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing up..." : "Sign Up"}
                    </Button>
                    </Col>
                </Form>
                </Row>
            )}
        </Formik>
    </Card.Body>
    </Card>
    </CardGroup>
    </Container>
    );
};