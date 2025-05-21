import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { Container, Button, Row, Col } from "react-bootstrap";
import { FavoriteMovies } from "./favorite-movies";
import "./profile-view.scss";

export const ProfileView = ({ user, token, setUser, onLoggedOut, movies }) => {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleUserRemove = async () => {
        if (
            !window.confirm(
                "Are you sure you want to delete your account? This action cannot be undone."
            )
        ) {
            return;
        }

        try {
            setIsDeleting(true);
            const response = await fetch(
                `https://my-movies-flix-app-56f9661dc035.herokuapp.com/api/users/${user.Username}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {
                // Clear user data first
                onLoggedOut();
                localStorage.clear();
                alert("Your account has been successfully deleted.");
                navigate("/api/login", { replace: true });
            } else {
                throw new Error("Failed to delete account");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to delete account. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    const onUpdateSuccess = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    const favoriteMovies = user.FavoriteMovies.map((movieId) =>
        movies.find((movie) => movie._id === movieId)
    );

    return (
        <Container>
            <Row className="justify-content-md-left mt-4">
                <Col md={6} className="user-details">
                    <UserInfo user={user.Username} email={user.Email} />

                    <UpdateUser
                        user={user}
                        token={token}
                        setUser={setUser}
                        onUpdateSuccess={onUpdateSuccess}
                    />

                    <Button
                        variant="danger"
                        onClick={handleUserRemove}
                        disabled={isDeleting}
                        className="mt-3"
                    >
                        {isDeleting ? "Deleting Account..." : "Delete Account"}
                    </Button>

                    <Col md={6} className="favorite-movies">
                        <FavoriteMovies favoriteMovieList={favoriteMovies} />
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

ProfileView.propTypes = {
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    setUser: PropTypes.func.isRequired,
    onLoggedOut: PropTypes.func.isRequired,
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired
        })
    ).isRequired
};
