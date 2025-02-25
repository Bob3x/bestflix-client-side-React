import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PersonCircle, BoxArrowLeft } from "react-bootstrap-icons";
import { SearchBar } from "../search-bar/search-bar";
import logo from "../../assets/bestflix_075.png";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut, onSearch, searchQuery }) => {
    return (
        <Navbar className="navbar">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src={logo}
                        alt="bestflix-logo"
                        className="nav-logo"
                        width="150"
                        height="auto"
                    />
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
                                <Nav.Link as={Link} to="/">
                                    Movies
                                </Nav.Link>
                                <Nav.Link as={Link} to="/">
                                    Similar
                                </Nav.Link>
                                <Nav.Link as={Link} to="/">
                                    SurpriseMe
                                </Nav.Link>
                                <Nav.Link as={Link} to={`/users/${user.Username}`}>
                                    <PersonCircle size={24} className="profile-icon" />
                                    <span className="d-none d-md-inlin ms-2">Profile</span>
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut} className="logout-link">
                                    <BoxArrowLeft size={20} className="logout-icon" />
                                    <span className="d-none d-md-inline ms-2">Logout</span>
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                    <SearchBar searchQuery={searchQuery} onSearch={onSearch} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
