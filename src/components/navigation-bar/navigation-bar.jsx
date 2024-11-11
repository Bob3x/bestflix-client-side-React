import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SearchBar } from "../search-bar/search-bar";

export const NavigationBar = ({ user, moviesAPI, onLoggedOut, onFilter }) => {
    return (
        <Navbar bg="light" exapand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Movies App
                </Navbar.Brand>
                <Navbar.Toggle area-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to={`/users/${user.Username}`}>
                                    Accaunt settings
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                    {user && <SearchBar moviesAPI={moviesAPI} onFilter={onFilter} />}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
