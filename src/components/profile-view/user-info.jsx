import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card } from "react-bootstrap";
import "./user-info.scss";

export const UserInfo = ({ user, email }) => {
    const userInitial = user ? user.charAt(0).toUpperCase() : "?";

    return (
        <Card className="user-info-card">
            <Card.Header className="card-header">
                <Card.Title>My Profile</Card.Title>
            </Card.Header>
            <Card.Body className="user-info-body">
                <div className="user-avatar-container">
                    <div className="user-avatar">{userInitial}</div>
                </div>
                <Card.Text>
                    <span>Username:</span> {user}
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
