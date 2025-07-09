// src/__tests__/movie-card.test.jsx
// testing UI />
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../app/store";
import { MovieCard } from "../components/movie-card/movie-card";

// Mock props
const mockMovie = {
    id: "123",
    title: "Inception",
    description: "Mind-bending thriller",
    genre: { name: "Sci-Fi" },
    director: { name: "Christopher Nolan", bio: "Bio", birth: "1970", death: "" },
    image: "inception.jpg",
    featured: true
};

describe("MovieCard", () => {
    test("renders movie title and genre", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MovieCard movie={mockMovie} />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Inception/i)).toBeInTheDocument();
        expect(screen.getByText(/Sci-Fi/i).toBeInTheDocument());
    });

    test("calls favorite button clicked (if it exists)", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MovieCard movie={mockMovie} />
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
