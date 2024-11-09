const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const predefinedUser = { username: "admin", password: "admin" };
let products = [];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === predefinedUser.username && password === predefinedUser.password) {
        res.json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const { name, category, price, stock } = req.body;
    const newProduct = { name, category, price, stock };
    products.push(newProduct);
    res.json({ message: "Product added successfully" });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
