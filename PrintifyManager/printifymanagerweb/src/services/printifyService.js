import axios from 'axios';

const API_BASE_URL = 'https://localhost:7106/api/printify';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getShops = async () => {
    try {
        const response = await apiClient.get('/shops');
        return response.data;
    } catch (error) {
        console.error('Error fetching shops:', error);
        throw error;
    }
};

export const getShopProducts = async (shopId, limit = 10, page = 1) => {
    try {
        const response = await apiClient.get(`/shops/${shopId}/products`, {
            params: { limit, page }
        });
        return response.data; // Adjust based on your API response structure
    } catch (error) {
        console.error('Error fetching products:', error);
        return { products: [] }; // Return empty products in case of error
    }
};

export const setProductPublishSuccessed = async (shopId, productId, external) => {
    try {
        // Encode the `external` parameter to handle special characters in the URL
        const encodedExternal = encodeURIComponent(external);
        const response = await apiClient.get(`/shops/${shopId}/products/${productId}/setpublishsuccessed`, {
            params: { external: encodedExternal }
        });
        return response.data;
    } catch (error) {
        console.error('Error setting product publish status:', error);
        throw error;
    }
};

export const getProductDetails = async (shopId, productId) => {
    try {
        const response = await apiClient.get(`/shops/${shopId}/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw error;
    }
};

export const publishProduct = async (shopId, productId) => {
    try {
        const response = await apiClient.post(`/shops/${shopId}/products/${productId}/publish`);
        return response.data;
    } catch (error) {
        console.error('Error publishing product:', error);
        throw error;
    }
};