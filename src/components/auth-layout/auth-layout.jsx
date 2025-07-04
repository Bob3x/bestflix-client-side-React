import React from "react";
import "./auth-layout.scss";

const AuthLayout = ({ title, children }) => {
    return (
        <div className="auth-container">
            <h1 className="welcome-title">
                Welcome to <span className="brand">bestflix</span>
            </h1>
            <p className="slogan">still a lot to watch</p>
            <div className="form-wrapper">
                <h2 className="form-title">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
