import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Carousel styles
import { getProductDetails } from '../services/printifyService';

const ProductDetails = () => {
    const { shopId, productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [publishSuccessDialogOpen, setPublishSuccessDialogOpen] = useState(false);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const data = await getProductDetails(shopId, productId);
                setProduct(data);

                // Set the default selected color and size
                const defaultColor = data.options.find(option => option.name === 'Colors')?.values[0].id;
                const defaultSize = data.options.find(option => option.name === 'Sizes')?.values[0].id;
                setSelectedColor(defaultColor);
                setSelectedSize(defaultSize);
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            }
        };

        fetchProductDetails();
    }, [shopId, productId]);

    useEffect(() => {
        if (product) {
            // When product details are available, set the default color and size
            const defaultColor = product.options.find(option => option.name === 'Colors')?.values[0].id;
            const defaultSize = product.options.find(option => option.name === 'Sizes')?.values[0].id;
            setSelectedColor(defaultColor);
            setSelectedSize(defaultSize);
        }
    }, [product]);

    if (!product) return <Typography>Loading...</Typography>;

    // Filter variants based on selected color and size
    const filteredVariants = product.variants.filter(variant => {
        const colorMatch = selectedColor ? variant.options.includes(selectedColor) : true;
        const sizeMatch = selectedSize ? variant.options.includes(selectedSize) : true;
        return colorMatch && sizeMatch;
    });

    // Get the variant IDs of the filtered variants
    const filteredVariantIds = filteredVariants.map(variant => variant.id);

    // Filter images based on the filtered variant IDs
    const filteredImages = product.images.filter(image =>
        image.variant_ids.some(variantId => filteredVariantIds.includes(variantId))
    );

    return (
        <div>
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4">{product.title}</Typography>                
                <div>
                    <Button href={`https://printify.com/app/product-details/${product.id}?fromProductsPage=1`} className="button-green" target="_blank" rel="noopener noreferrer">
                        View On Printify
                    </Button>
                    {product.external?.handle && (
                        <Button href={product.external.handle} target="_blank" rel="noopener noreferrer">
                            View External Product
                        </Button>
                    )}
                    <Button className="button-blue" onClick={() => setPublishSuccessDialogOpen(true)}>Set Publish Succeeded</Button>

                    <Button className="button-blue" onClick={() => setPublishSuccessDialogOpen(true)}>Publish</Button>
                </div>
            </div>

            {/* Content Section */}
            <div style={{ display: 'flex', padding: '16px' }}>
                {/* Image Rotator */}
                <div style={{ flex: 1, maxWidth: '400px' }}>
                    <Carousel>
                        {filteredImages.map((image, index) => (
                            <div key={index}>
                                <img src={image.src} alt={product.title} style={{ width: '100%', height: 'auto' }} />
                            </div>
                        ))}
                    </Carousel>
                </div>

                {/* Product Details */}
                <div style={{ flex: 1, paddingLeft: '16px' }}>
                    <Typography className="mb-1" variant="h6">{product.title}</Typography>
                   
                    <Typography className="mb-3" >{product.description}</Typography>

                    <Typography className="mb-1" variant="h6">Select Color</Typography>
                    <div style={{ display: 'flex' }} className="mb-3" >
                        {product.options.find(option => option.name === 'Colors').values.map(color => (
                            <div
                                key={color.id}
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    backgroundColor: color.colors[0],
                                    margin: '4px',
                                    cursor: 'pointer',
                                    border: selectedColor === color.id ? '2px solid black' : 'none'
                                }}
                                onClick={() => setSelectedColor(color.id)}
                            />
                        ))}
                    </div>

                    <Typography className="mb-1" variant="h6">Select Size</Typography>
                    <div className="mb-3">
                        {product.options.find(option => option.name === 'Sizes').values.map(size => (
                            <Button
                                key={size.id}
                                variant={selectedSize === size.id ? 'contained' : 'outlined'}
                                onClick={() => setSelectedSize(size.id)}
                            >
                                {size.title}
                            </Button>
                        ))}
                    </div>

                    {/* Display filtered variants */}
                    <Typography className="mb-1" variant="h6">Available Variants</Typography>
                    <ul>
                        {filteredVariants.map(variant => (
                            <li key={variant.id}>
                                {variant.title} - ${variant.price / 100}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Publish Success Dialog */}
            {publishSuccessDialogOpen && (
                <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', padding: '16px', background: 'white', border: '1px solid gray', borderRadius: '8px' }}>
                    <Typography>Publish Success!</Typography>
                    <Button onClick={() => setPublishSuccessDialogOpen(false)}>Close</Button>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
