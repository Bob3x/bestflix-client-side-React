import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginView } from "../pages/login/login-view";
import store from "../app/store";
import "@testing-library/jest-dom";

describe("LoginView", () => {
    const setup = () =>
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginView />
                </MemoryRouter>
            </Provider>
        );

    test("renders form inputs and submit button", () => {
        setup();
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    });

    test("lets user type into fields", () => {
        setup();
        const usernameInput = screen.getByLabelText(/Username/i);
        fireEvent.change(usernameInput, { target: { value: "testUser" } });
        expect(usernameInput.value).toBe("testUser");
    });
});
