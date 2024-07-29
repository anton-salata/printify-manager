import React from 'react';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import Products from './Products';

function ProductsPage() {
    return (
        <>
            <NavbarComponent />

            <Products />

            <Footer />

        </>
    );
}

export default ProductsPage;
