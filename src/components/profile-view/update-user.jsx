import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

export const UpdateUser = ({ handleSubmit, handleUpdate }) => {
  const token = localStorage.getItem("token");

  const [username, setUsername] = useState("");

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <h2>Want to change some info?</h2>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          defaultValue={user.Username}
          onChange={(e) => handleUpdate(e)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          defaultValue={user.Password}
          onChange={(e) => handleUpdate(e)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          defaultValue={user.Email}
          onChange={(e) => handleUpdate(e.target.value)}
        />
      </Form.Group>
      <button variant="primary" type="submit">
        Update
      </button>
    </Form>
  );
};
