import { createRoot } from "react-dom/client";
import { MainView } from "./pages/main/main-view";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
const MyFlixApplication = () => {
    return (
        <Container>
            <MainView />
        </Container>
    );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);
