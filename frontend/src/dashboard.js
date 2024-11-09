// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/products', formData);
            alert("Product added successfully");
            setFormData({ name: '', category: '', price: '', stock: '' });
            fetchProducts();
        } catch (error) {
            alert("Failed to add product");
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Product Name" value={formData.name} onChange={handleInputChange} required />
                <input name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} required />
                <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleInputChange} required />
                <input name="stock" type="number" placeholder="Stock Quantity" value={formData.stock} onChange={handleInputChange} required />
                <button type="submit">Add Product</button>
            </form>
            <button onClick={fetchProducts}>Refresh Products</button>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        {product.name} - {product.category} - Rs{product.price} - {product.stock} in stock
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
