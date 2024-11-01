import React from "react";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";

export const ProfileView = ({ movies }) => {
  const favoriteMovieList = movies.filter((movies) => {});

  const ProfileDelete = () => {
    fetch(
      "https://my-movies-flix-app-56f9661dc035.herokuapp.com/users/${user.Username}",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorizaton: "Bearer $(token)",
        },
      }
    ).then((response) => {
      console.log(response);
      if (response.ok) {
        console.log("Account deleted succesfully!");
        onLoggedOyt();
      } else {
        alert("Failed to delete account");
      }
    });
  };
};

return (
  <div>
    <UserInfo name={user.Username} email={user.Email} />
    <FavoriteMovies favoriteMovieList={favoriteMovieList} />
  </div>
);
