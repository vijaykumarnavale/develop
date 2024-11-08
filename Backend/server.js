const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());  // Enable CORS
// Mock data
const mockUsername = 'tttttttt';
const mockPassword = 'tttttttt';

let products = [
    { id: 1, name: 'Product A', category: 'Category 1', price: 100, stock: 10 },
    { id: 2, name: 'Product B', category: 'Category 2', price: 200, stock: 5 },
];

// 1. Login API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Validate inputs
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    // Mock authentication
    if (username === mockUsername && password === mockPassword) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// 2. Get Products API
app.get('/api/products', (req, res) => {
    res.json(products);
});

// 3. Add Product API
app.post('/api/products', (req, res) => {
    const { name, category, price, stock } = req.body;

    // Validate inputs
    if (!name || !category || typeof price !== 'number' || typeof stock !== 'number') {
        return res.status(400).json({ message: 'Invalid product details' });
    }

    const newProduct = {
        id: products.length + 1,
        name,
        category,
        price,
        stock,
    };
    products.push(newProduct);

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
