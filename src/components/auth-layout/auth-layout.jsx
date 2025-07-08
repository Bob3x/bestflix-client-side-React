import React from "react";
import { Container, Card } from "react-bootstrap";
import logo from "../../assets/bestflix_logotype.svg";
import "./auth-layout.scss";

const AuthLayout = ({ title, subtitle, children }) => {
    return (
        <div className="auth-background">
            <Container className="auth-container">
                <div className="auth-header mb-3">
                    <h2 className="auth-welcome">Welcome to </h2>
                    <div className="auth-logo-wrapper">
                        <img src={logo} alt="bestflix logo" className="auth-logo" />
                        <p className="auth-slogan">still a lot to watch</p>
                    </div>
                </div>
                <Card className="auth-card shadow-lg">
                    <Card.Body className="auth-card-body">
                        <h4 className="auth-title text-center">{title}</h4>
                        <Card.Subtitle className="auth-subtitle text-muted text-center mb-2">
                            {subtitle}
                        </Card.Subtitle>
                        {children}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default AuthLayout;

/*<Container className="login-container">
                    <Container className="header-container">
                        <Row className="justify-content-center">
                            <Col xs={12} sm={8} md={6} lg={4}>
                                <div className="text-end mb-4">
                                    <div className="title-logo-wrapper">
                                        <h2>Welcome to</h2>
                                        <img
                                            src={logo}
                                            alt="bestflix logo"
                                            className="logo-image"
                                            width="250"
                                            height="auto"
                                        />
                                    </div>
                                    <h6>still a lot to watch</h6>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Row className="justify-content-center">
                        <Col xs={12} sm={8} md={6} lg={4}>
                            <Card className="login-card">
                                <div className="title-container">
                                    <Card.Title>Login</Card.Title>
                                    <Card.Subtitle className="text-muted">
                                        Please login to continue
                                    </Card.Subtitle>
                                </div>{" "}
                                <Card.Body>
                                    {error && (
                                        <Alert variant="danger" className="mb-3">
                                            {error}
                                        </Alert>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>*/
