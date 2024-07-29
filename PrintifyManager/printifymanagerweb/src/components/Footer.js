import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#808080', color: '#fff', padding: '1rem' }}>
            <Container>
                <p className="text-center">&copy; 2024 Anton Salata</p>
            </Container>
        </footer>
    );
};


export default Footer;