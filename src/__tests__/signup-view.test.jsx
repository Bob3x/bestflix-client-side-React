import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { SignupView } from "../pages/signup/signup-view";
import store from "../app/store";
import "@testing-library/jest-dom";

describe("SignupView", () => {
    const setup = () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <SignupView />
                </MemoryRouter>
            </Provider>
        );
    };

    test("renders all form inputs", () => {
        setup();
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/terms/i)).toBeInTheDocument();
    });

    test("shows validation errors on empty submit", async () => {
        setup();
        fireEvent.blur(screen.getByLabelText(/Email/i));
        fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));
        expect(await screen.findByTestId("email-error")).toBeVisible();
    });

    test("lets user type in all fields", () => {
        setup();
        fireEvent.change(screen.getByLabelText(/Username/i), {
            target: { value: "testUser" }
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: { value: "testPassword123!" }
        });

        fireEvent.change(screen.getByLabelText(/Email/i), {
            target: { value: "testUser@gmail.com" }
        });
        fireEvent.click(screen.getByLabelText(/terms/i));

        expect(screen.getByLabelText(/Username/i).value).toBe("testUser");
        expect(screen.getByLabelText(/Password/i).value).toBe("testPassword123!");
        expect(screen.getByLabelText(/Email/i).value).toBe("testUser@gmail.com");
    });
});
