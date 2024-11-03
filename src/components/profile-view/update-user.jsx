import { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Form as BootstrapForm,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { validationSchema } from "../form-validation/form-validation";

export const UpdateUser = (initialValues) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async ({ setUpdateUser, setSubmitting, resetForm }) => {
    // const [updateUser, setUpdateUser] = useState("");

    try {
      console.log("Submitting values:", values);

      const response = await fetch(
        "https://my-movies-flix-app-56f9661dc035.herokuapp.com/users",
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
        throw new Error(data.message || "Update failed");
      }
      setUpdateUser(updateUser);
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
                initialValues={{ Username: "", Password: "", Email: "" }}
                validationSchema={validationSchema}
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
                          <span className="visually-hidden">Loading...</span>
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
                            {" "}
                            Update
                            {isSubmitting
                              ? "Updating..."
                              : "Updated successfully!"}
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
