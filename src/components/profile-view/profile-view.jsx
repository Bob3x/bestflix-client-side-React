import React from "react";
import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { Button, Row, Col } from "react-bootstrap";
import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({ user, token, onLoggedOut }) => {
    const handleUserRemove = () => {
        fetch(`https://my-movies-flix-app-56f9661dc035.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                console.log("Account deleted succesfully!");
                onLoggedOut();
            } else {
                alert("Failed to delete account");
            }
        });
    };

    return (
        <div>
            <UserInfo name={user.Username} email={user.Email} />
            <UpdateUser user={user} token={token} onLoggedOut={onLoggedOut} />
            <Button variant="danger" onClick={handleUserRemove}>
                Delete account
            </Button>
        </div>
    );
};
