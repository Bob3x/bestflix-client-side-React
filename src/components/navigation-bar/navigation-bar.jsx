import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PersonCircle, BoxArrowLeft } from "react-bootstrap-icons";
import { CaretDownFill } from "react-bootstrap-icons";
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
                    <Nav className="nav-section nav-section--left">
                        {!user && (
                            <div className="nav-section nav-section--left">
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </div>
                        )}
                        {user && (
                            <div className="nav-section nav-section--left">
                                <Nav.Link as={Link} to="/">
                                    Movies
                                </Nav.Link>
                                <Nav.Link as={Link} to="/">
                                    Similar
                                </Nav.Link>
                                <Nav.Link as={Link} to="/">
                                    SurpriseMe
                                </Nav.Link>
                            </div>
                        )}
                    </Nav>
                    <div className="nav-section nav-section--center">
                        <SearchBar searchQuery={searchQuery} onSearch={onSearch} />
                    </div>
                    {user && (
                        <Nav className="nav-section nav-section--right">
                            <NavDropdown
                                title={
                                    <div className="user-avatar-wrapper">
                                        <div className="user-avatar">
                                            {user.Username.charAt(0).toUpperCase()}
                                        </div>
                                        <CaretDownFill size={12} className="dropdown-caret" />
                                    </div>
                                }
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item as={Link} to={`/users/${user.Username}`}>
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={`/users/favorites`}>
                                    Fovorites
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={onLoggedOut}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
