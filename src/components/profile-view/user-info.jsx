import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

export const UserInfo = ({ user, email }) => {
    return (
        <Card className="mb-4">
            <Card.Header>
                <Card.Title>User Information</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <span>Name:</span> {user}
                </Card.Text>
                <Card.Text>
                    <span>Email:</span> {email}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

UserInfo.propTypes = {
    user: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};
