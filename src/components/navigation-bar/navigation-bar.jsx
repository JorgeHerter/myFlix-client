import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar({ user, onLogout }) { // Ensure prop name matches
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        onLogout(); // This should now work correctly
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">myFlix</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {/*<Nav.Link as={Link} to="/movies">Movies</Nav.Link>*/}
                        {user && (
                            <>
                                <Nav.Link as={Link} to={`/users/${user.username}`}>Profile</Nav.Link>
                                <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
                                <Nav.Link as={Link} to="/movie-search">Search</Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Nav>
                        {user ? (
                            <>
                                <Navbar.Text>
                                    Signed in as: <Link to={`/users/${user.username}`}>{user.username}</Link>
                                </Navbar.Text>
                                <Nav.Link as={Link} to="#" onClick={handleLogout} aria-label="Logout">Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;


