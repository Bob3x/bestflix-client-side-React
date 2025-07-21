import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { UserInfo } from "./user-info";
import { UpdateUser } from "../../pages/UpdateUser/update-user";
import { Container, Button, Row, Col } from "react-bootstrap";
import { FavoriteMovies } from "./favorite-movies";
import { fetchFavoritesThunk } from "../../features/favorites/favoritesSlice";
import { useSelector, useDispatch } from "react-redux";
import "./profile-view.scss";
import { deleteUserThunk, updateUserThunk } from "../../features/user/userSlice";

export const ProfileView = ({ setUser, onLoggedOut }) => {
    const user = useSelector((state) => state.user.user);
    const favorites = useSelector((state) => state.favorites.items);
    const movies = useSelector((state) => state.movies.movies);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!user) {
            dispatch(fetchFavoritesThunk(user.id));
        }
    }, [user, dispatch]);

    const handleUserRemove = async () => {
        if (
            !window.confirm(
                "Are you sure you want to delete your account? This action cannot be undone."
            )
        )
            setIsDeleting(true);
        try {
            await dispatch(deleteUserThunk(user.id)).unwrap();
            onLoggedOut();
            localStorage.clear();

            alert("Your account has been successfully deleted.");
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to delete account. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleUpdateUser = async (updates) => {
        try {
            const updatedUser = await dispatch(
                updateUserThunk({ userId: user.id, updates })
            ).unwrap();
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user information. Please try again.");
        }
    };

    const favoriteMovies = favorites
        .map((fav) => movies.find((m) => m.id === fav.movie_id))
        .filter(Boolean);

    return (
        <Container className="profile-view">
            <Row className="justify-content-center mt-4">
                <Col md={6} className="user-info">
                    <UserInfo user={user.id} email={user.email} />
                </Col>
                <Col md={6} className="user-update">
                    <UpdateUser
                        setUser={setUser}
                        onUpdateSuccess={handleUpdateUser}
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
    setUser: PropTypes.func.isRequired,
    onLoggedOut: PropTypes.func.isRequired
};
