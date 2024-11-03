import React from "react";
import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({ user, token, updatedUser, onLoggedOut }) => {
  const UserRemove = () => {
    fetch(
      "https://my-movies-flix-app-56f9661dc035.herokuapp.com/users/${user.Username}",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
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
      <FavoriteMovies favoriteMovieList={favoriteMovieList} />
      <UpdateUser user={user} token={token} userUpdate={userUpdate} />
      <Button
        variant="danger"
        onClick={() => {
          UserRemove();
        }}
      >
        Delete account
      </Button>
    </div>
  );
};
