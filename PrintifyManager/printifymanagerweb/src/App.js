import logo from './logo.svg';
import './App.css';
import { Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

function App() {
    return (

        <Routes>
            <Route exact path="/" element={<HomePage />} /> 
            <Route path="/shops/:shopId/products" element={<ProductsPage />} />
            <Route path="/shops/:shopId/products/:productId" element={<ProductDetailsPage />} />
        </Routes>

    );
}

export default App;
