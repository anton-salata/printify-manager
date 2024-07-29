# Printify Manager

Printify Manager is a comprehensive tool designed for managing your Printify products and shops via custom API integration. This project provides a user-friendly interface to interact with Printify's API, offering functionality to view, manage, and publish products.

## Features

- **View Shop Details**: Retrieve and display information about your Printify shops.
- **Product Management**: Fetch and manage products in your shops, including details, images, and variants.
- **Publish Products**: Set products as published through the API.
- **Detailed Product View**: Navigate to detailed views of individual products, including their images and descriptions.

> This tool is specifically aimed at users integrating with Printify via their API, providing a seamless way to interact with Printify's data programmatically.


![Product List](/images/prntf1.png)
![Product Details](/images/prntf2.png)

## Installation

To get started with Printify Manager, follow these steps:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/printify-manager.git
    cd printify-manager
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Configuration**

    Create a `.env` file in the root directory of the project and add your Printify API credentials and any other configuration settings.

    ```env
    REACT_APP_API_BASE_URL=https://your-api-url.com
    ```

4. **Run the Project**

    ```bash
    npm start
    ```

    This will start the development server and open the application in your default browser.

## Usage

### Viewing Shops and Products

- Navigate to the `/shops` route to view a list of your Printify shops.
- Click on a shop to view its products.
- Use the provided links to view detailed information and manage products.

### Product Details Page

- The product details page allows you to see a detailed view of a product, including its images and variants.
- You can also use this page to set the product's publish status.

## API Endpoints

The following API endpoints are available:

- **Get Shops**
    - `GET /api/printify/shops`
- **Get Products by Shop**
    - `GET /api/printify/shops/{shopId}/products`
- **Get Product Details**
    - `GET /api/printify/shops/{shopId}/products/{productId}`
- **Publish Product**
    - `GET /api/printify/shops/{shopId}/products/{productId}/publish`
- **Set Product Publish Status**
    - `GET /api/printify/shops/{shopId}/products/{productId}/setpublishsuccessed`

## Contributing

Contributions are welcome! If you'd like to contribute to Printify Manager, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




## Contact

For any questions or feedback, please open an issue on the GitHub repository or contact us at [your-email@example.com](mailto:your-email@example.com).

