import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CaretDownFill } from "react-bootstrap-icons";
import { SearchBar } from "../search-bar/search-bar";
import logo from "../../assets/bestflix_logotype.svg";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar expand="md" className="navbar">
            <Container fluid>
                <div className="d-flex align-items-center">
                    <Navbar.Brand as={Link} to="/">
                        <img
                            src={logo}
                            alt="bestflix-logo"
                            className="nav-logo"
                            width="150"
                            height="auto"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                </div>
                {/* Mobile-optimized layout */}
                <Navbar.Collapse id="navbar-nav">
                    <div className="navbar-content d-flex flex-column flex-md-row w-100">
                        <Nav className="nav-section nav-section--left">
                            {!user ? (
                                <>
                                    <Nav.Link as={Link} to="/login">
                                        Login
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/signup">
                                        Signup
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/">
                                        Movies
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/">
                                        Similar
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/">
                                        SurpriseMe
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>

                        <div className="nav-section nav-section--center">
                            <SearchBar />
                        </div>
                        {user && (
                            <Nav className="nav-section nav-section--right">
                                <NavDropdown
                                    title={
                                        <div className="user-avatar-wrapper">
                                            <div className="user-avatar">
                                                {user?.Username?.charAt(0).toUpperCase() || ""}
                                            </div>
                                            <CaretDownFill size={12} className="dropdown-caret" />
                                        </div>
                                    }
                                    id="user-dropdown"
                                    align="end"
                                >
                                    <NavDropdown.Item as={Link} to={`/users/${user.id}`}>
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={`/users/favorites`}>
                                        Favorites
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={onLoggedOut}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
