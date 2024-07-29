import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
    return (
        <Navbar bg="success" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Printify Manager</Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;