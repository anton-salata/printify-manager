import React from 'react';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import Shops from './Shops';

function HomePage() {
    return (
        <>
            <NavbarComponent />

            <Shops />
            <div style={{ height: '70vh' }}></div>
            <Footer />

        </>
    );
}

export default HomePage;
