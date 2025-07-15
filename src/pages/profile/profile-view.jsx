import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { UserInfo } from "./user-info";
import { UpdateUser } from "../../pages/UpdateUser/update-user";
import { Container, Button, Row, Col } from "react-bootstrap";
import { FavoriteMovies } from "./favorite-movies";
import { useSelector } from "react-redux";
import "./profile-view.scss";

export const ProfileView = ({ setUser, onLoggedOut }) => {
    const user = useSelector((state) => state.user.user);
    const favoriteMovies = useSelector((state) => state.favorites.items);
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
                navigate("/login", { replace: true });
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

    return (
        <Container className="profile-view">
            <Row className="justify-content-center mt-4">
                <Col md={6} className="user-info">
                    <UserInfo user={user.Username} email={user.Email} />
                </Col>
                <Col md={6} className="user-update">
                    <UpdateUser
                        user={user}
                        setUser={setUser}
                        onUpdateSuccess={onUpdateSuccess}
                        onDeleteAccount={handleUserRemove}
                        isDeleting={isDeleting}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={12} className="favorite-movies">
                    <FavoriteMovies favoriteMovies={favoriteMovies} />
                </Col>
            </Row>
        </Container>
    );
};

ProfileView.propTypes = {
    user: PropTypes.object.isRequired,
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
