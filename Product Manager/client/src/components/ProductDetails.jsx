import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams(); // Retrieves the product id from the URL

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]); // Run the effect when the `id` changes

    return (
        <div>
            <h2>Product Details</h2>
            <p><strong>Title:</strong> {product.title}</p>
            <p><strong>Price:</strong> {product.price}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <br/>
            <Link to={"/"}>Go Home</Link>

        </div>
    );
};

export default ProductDetails;