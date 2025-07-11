import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const BestflixApp = () => {
    return (
        <Container>
            <MainView />
        </Container>
    );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <BestflixApp />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
