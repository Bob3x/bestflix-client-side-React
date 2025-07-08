import React from "react";
import { createRoot } from "react-dom/client";
import { MainView } from "./pages/main/main-view";
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
                <BestflixApp />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
