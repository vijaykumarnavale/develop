
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({ name: '', category: '', price: 0, stock: 0 });

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/products', product);
            alert(response.data.message);
            fetchProducts();  // Refresh list after adding
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Product Dashboard</h2>
            <button onClick={fetchProducts}>Refresh</button>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.category} - ${product.price} - Stock: {product.stock}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleAddProduct}>
                <input name="name" placeholder="Name" onChange={handleChange} required />
                <input name="category" placeholder="Category" onChange={handleChange} required />
                <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
                <input name="stock" type="number" placeholder="Stock" onChange={handleChange} required />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default Dashboard;
