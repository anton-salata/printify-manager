import React from 'react';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import ProductDetails from './ProductDetails';

function ProductDetailsPage() {
    return (
        <>
            <NavbarComponent />

            <ProductDetails />

            < Footer />

        </>
    );
}

export default ProductDetailsPage;
