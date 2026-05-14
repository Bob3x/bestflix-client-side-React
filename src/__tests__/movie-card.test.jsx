// src/__tests__/movie-card.test.jsx
// testing UI />
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../app/store";
import { MovieCard } from "../components/movie-card/movie-card";
import "@testing-library/jest-dom";

// Mock props

const mockUser = {
    Username: "testUser",
    FavoriteMovies: ["123", "456"]
};
const mockToken = "testToken";
const mockSetUser = jest.fn();

const mockMovie = {
    id: 123,
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology",
    genre_ids: [53],
    poster_path: "/inception.jpg"
};

const mockGenres = [{ id: 53, name: "Thriller" }];

describe("MovieCard", () => {
    test("renders movie title and genre", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MovieCard
                        movie={mockMovie}
                        genres={mockGenres}
                        user={mockUser}
                        token={mockToken}
                        setUser={mockSetUser}
                    />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Inception/i)).toBeInTheDocument();
        expect(screen.getByText(/Thriller/i)).toBeInTheDocument();
    });

    test("calls favorite button clicked (if it exists)", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MovieCard
                        movie={mockMovie}
                        genres={mockGenres}
                        user={mockUser}
                        token={mockToken}
                        setUser={mockSetUser}
                    />
                </MemoryRouter>
            </Provider>
        );

        const button = screen.queryByRole("button", { name: /favorite/i });
        if (button) {
            fireEvent.click(button);
            // Add mock dispatch here later
        }
    });
});
