<<<<<<< HEAD
import { createRoot } from 'react-dom/client';
import { MainView }  from './components/main-view/main-view';
import Container from "react-bootstrap/Container"
=======
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
>>>>>>> 348f398d7fde0bf74bc2fbebacf9de3d9a2a898f

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
