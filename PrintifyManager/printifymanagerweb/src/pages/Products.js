import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Container,
    Box,
    IconButton,
    ButtonGroup,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { getShops, getShopProducts, setProductPublishSuccessed, publishProduct } from '../services/printifyService';

const Products = () => {
    const { shopId } = useParams();
    const location = useLocation(); // Use useLocation hook
    const [products, setProducts] = useState([]);
    const [shops, setShops] = useState([]);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [publishDialogOpen, setPublishDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [url, setUrl] = useState('');

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        itemsPerPage: 10,
        totalItems: 0
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const query = new URLSearchParams(location.search); // Use location from useLocation hook
                const page = query.get('page') || 1;
                const response = await getShopProducts(shopId, pagination.itemsPerPage, page);
                setProducts(response.data);
                setPagination(prev => ({
                    ...prev,
                    currentPage: response.current_page,
                    lastPage: response.last_page,
                    itemsPerPage: response.per_page,
                    totalItems: response.total
                }));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [shopId, pagination.itemsPerPage, location.search]);

    useEffect(() => {
        const query = new URLSearchParams(location.search); // Use location from useLocation hook
        const page = query.get('page') || 1;
        setPagination(prev => ({ ...prev, currentPage: parseInt(page, 10) }));
    }, [shopId, location.search]);

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await getShops();
                setShops(response);
            } catch (error) {
                console.error('Error fetching shops:', error);
            }
        };
        fetchShops();
    }, []);


    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.lastPage) {
            navigate(`/shops/${shopId}/products?page=${page}`);
        }
    };

    const handleItemsPerPageChange = (event) => {
        setPagination(prev => ({ ...prev, itemsPerPage: event.target.value, currentPage: 1 }));
    };

    const truncateDescription = (description) => {
        return description.length > 50 ? `${description.substring(0, 50)}...` : description;
    };


    const handleShopChange = (event) => {
        const newShopId = event.target.value;
        navigate(`/shops/${newShopId}/products?page=1`);
    };

    const getFrontImages = (images) => {
        return images.filter(image => image.position === 'front');
    };

    const getRandomFrontImage = (images) => {
        const frontImages = getFrontImages(images);
        if (frontImages.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * frontImages.length);
        return frontImages[randomIndex]?.src || null;
    };

    const handleSetPublishSuccessed = async () => {
        if (selectedProduct) {
            try {
                await setProductPublishSuccessed(shopId, selectedProduct.id, JSON.stringify({
                    id: selectedProduct.id,
                    handle: url
                }));
                handleCloseDialog();
            } catch (error) {
                console.error('Error setting publish status:', error);
            }
        }
    };

    const handleOpenPublishDialog = (product) => {
        setSelectedProduct(product);
        setPublishDialogOpen(true);
    };

    const handleClosePublishDialog = () => {
        setPublishDialogOpen(false);
    };

    const handleConfirmPublish = async () => {
        try {
            await publishProduct(shopId, selectedProduct.id);
            console.log('Product published successfully');
        } catch (error) {
            console.error('Failed to publish product:', error);
        } finally {
            handleClosePublishDialog();
        }
    };



    const handleClickOpen = (product) => {
        setSelectedProduct(product);
        setUrl(`https://example.com/path/to/product/${product.id}`);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedProduct(null);
    };

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" gutterBottom>
                    Products for <b>{shops.find(shop => shop.id === parseInt(shopId))?.title || shopId}</b> shop
                </Typography>

                {/* Align Shop dropdown and pagination controls on the same line */}
                <Box my={2} display="flex" alignItems="center" justifyContent="space-between">
                    <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
                        <InputLabel>Shop</InputLabel>
                        <Select
                            value={shopId}
                            onChange={handleShopChange}
                            label="Shop"
                        >
                            {shops.map(shop => (
                                <MenuItem key={shop.id} value={shop.id}>
                                    {shop.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box display="flex" alignItems="center">
                        <FormControl variant="outlined" size="small" sx={{ mr: 2 }}>
                            <InputLabel>Items per page</InputLabel>
                            <Select
                                value={pagination.itemsPerPage}
                                onChange={handleItemsPerPageChange}
                                label="Items per page"
                                sx={{ minWidth: 120 }}
                            >
                                {[10, 20, 30, 50, 100].map(number => (
                                    <MenuItem key={number} value={number}>
                                        {number}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <IconButton
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                            color="primary"
                            sx={{ borderRadius: '50%', marginRight: 1 }}
                        >
                            <ArrowBack />
                        </IconButton>

                        {Array.from({ length: pagination.lastPage }, (_, index) => index + 1).map(page => (
                            <Button
                                key={page}
                                variant={page === pagination.currentPage ? 'contained' : 'outlined'}
                                onClick={() => handlePageChange(page)}
                                style={{
                                    margin: '0 4px',
                                    borderRadius: '50%', // This makes the buttons round
                                    minWidth: '40px', // Ensures the button is round
                                    minHeight: '40px', // Ensures the button is round
                                    padding: '8px 0'  // Centers the text inside the round button
                                }}
                            >
                                {page}
                            </Button>
                        ))}

                        <IconButton
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === pagination.lastPage}
                            color="primary"
                            sx={{ borderRadius: '50%' }}
                        >
                            <ArrowForward />
                        </IconButton>
                    </Box>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead style={{ backgroundColor: "aliceblue" }}>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Colors</TableCell>
                                <TableCell>Sizes</TableCell>
                                <TableCell>External</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(products || []).map(product => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <Link
                                            to={`/shops/${shopId}/products/${product.id}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            {product.images.length > 0 ? (
                                                <img
                                                    src={getRandomFrontImage(product.images)}
                                                    alt={product.title}
                                                    style={{ width: '100px', height: 'auto' }}
                                                />
                                            ) : (
                                                'No image available'
                                            )}
                                        </Link>
                                    </TableCell>
                                    <TableCell><Link
                                        to={`/shops/${shopId}/products/${product.id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        {product.title}
                                    </Link></TableCell>
                                    <TableCell>{truncateDescription(product.description)}</TableCell>
                                    <TableCell>
                                        {product.options.find(option => option.name === 'Colors')?.values.map(color => (
                                            <span
                                                key={color.id}
                                                style={{
                                                    display: 'inline-block',
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '50%',
                                                    backgroundColor: color.colors[0],
                                                    margin: '2px',
                                                    border: '2px solid black' // Add black stroke
                                                }}
                                                title={color.title}
                                            />
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        {product.options.find(option => option.name === 'Sizes')?.values.map(size => (
                                            <span
                                                key={size.id}
                                                style={{
                                                    display: 'inline-block',
                                                    width: '30px',
                                                    height: '30px',
                                                    border: '1px solid #ccc',
                                                    margin: '2px',
                                                    textAlign: 'center',
                                                    lineHeight: '30px',
                                                    /*  padding: '5px', // Add padding here*/
                                                    borderRadius: '4px',
                                                    backgroundColor: '#f5f5f5'
                                                }}
                                                title={size.title}
                                            >
                                                {size.title}
                                            </span>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        {product.external?.handle ? (
                                            <a
                                                href={product.external.handle}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: 'green',
                                                    textDecoration: 'none',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                View Product
                                            </a>
                                        ) : (
                                            'No link available'
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <a
                                                href={`https://printify.com/app/product-details/${product.id}?fromProductsPage=1`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="button-green mb-1"
                                            >
                                                Edit on Printify
                                            </a>

                                            <a
                                                rel="noopener noreferrer"
                                                className="button-blue mb-1"
                                                onClick={() => handleOpenPublishDialog(product)}
                                            >
                                                Publish
                                            </a>

                                            <a
                                                rel="noopener noreferrer"
                                                className="button-blue mb-1"
                                                onClick={() => handleClickOpen(product)}
                                            >
                                                Set Publish Successed
                                            </a>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Items per page dropdown and pagination buttons at the bottom */}
                <Box my={2} display="flex" alignItems="center" justifyContent="flex-end">
                    <Box display="flex" alignItems="center" >
                        <FormControl variant="outlined" size="small" sx={{ mr: 2 }}>
                            <InputLabel>Items per page</InputLabel>
                            <Select
                                value={pagination.itemsPerPage}
                                onChange={handleItemsPerPageChange}
                                label="Items per page"
                                sx={{ minWidth: 120 }}
                            >
                                {[10, 20, 30, 50, 100].map(number => (
                                    <MenuItem key={number} value={number}>
                                        {number}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <IconButton
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                            color="primary"
                            sx={{ borderRadius: '50%', marginRight: 1 }}
                        >
                            <ArrowBack />
                        </IconButton>

                        {Array.from({ length: pagination.lastPage }, (_, index) => index + 1).map(page => (
                            <Button
                                key={page}
                                variant={page === pagination.currentPage ? 'contained' : 'outlined'}
                                onClick={() => handlePageChange(page)}
                                style={{
                                    margin: '0 4px',
                                    borderRadius: '50%', // This makes the buttons round
                                    minWidth: '40px', // Ensures the button is round
                                    minHeight: '40px', // Ensures the button is round
                                    padding: '8px 0'  // Centers the text inside the round button
                                }}
                            >
                                {page}
                            </Button>
                        ))}

                        <IconButton
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === pagination.lastPage}
                            color="primary"
                            sx={{ borderRadius: '50%' }}
                        >
                            <ArrowForward />
                        </IconButton>
                    </Box>
                </Box>
            </Box>


            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Set URL to Your Product</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="url"
                        label="Product URL"
                        type="url"
                        fullWidth
                        variant="standard"
                        placeholder={`https://example.com/path/to/product/${selectedProduct?.id}`}
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSetPublishSuccessed} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={publishDialogOpen} onClose={handleClosePublishDialog}>
                <DialogTitle>Confirm Publish</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to publish this product {selectedProduct?.title} with ID {selectedProduct?.id}?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePublishDialog} color="primary">
                        No
                    </Button>
                    <Button onClick={handleConfirmPublish} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
};

export default Products;
