import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card } from "react-bootstrap";
import "./user-info.scss";

export const UserInfo = ({ user, email }) => {
    const userInitial = user ? user.charAt(0).toUpperCase() : "?";

    return (
        <Card className="user-info-card">
            <Card.Header className="user-info-header">
                <Card.Title>
                    <span>My Profile</span>
                </Card.Title>
            </Card.Header>
            <Card.Body className="user-info-body">
                <div className="user-avatar-container">
                    <div className="user-avatar">{userInitial}</div>
                </div>
                <div className="user-info-text">
                    <Card.Text className="card-text-user">{user}</Card.Text>
                    <Card.Text className="card-text-email">{email}</Card.Text>
                </div>
            </Card.Body>
        </Card>
    );
};

UserInfo.propTypes = {
    user: PropTypes.string,
    email: PropTypes.string
};
