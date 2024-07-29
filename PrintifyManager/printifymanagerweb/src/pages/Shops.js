import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    Box
} from '@mui/material';
import { getShops } from '../services/printifyService';

const Shops = () => {
    const [shops, setShops] = useState([]);

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

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" gutterBottom>
                    Shops
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(shops || []).map(shop => (
                                <TableRow key={shop.id}>
                                    <TableCell>
                                        <Link to={`/shops/${shop.id}/products`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {shop.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/shops/${shop.id}/products`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {shop.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{shop.sales_channel}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default Shops;
