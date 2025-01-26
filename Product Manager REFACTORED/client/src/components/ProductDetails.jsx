import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/products/${id}`)
            .then((response) => setProduct(response.data))
            .catch((error) => console.log(error));
    }, [id]);

    return (
        <div>
            {product && (
                <>
                    <h2>Product Details</h2>
                    <p>Title: {product.title}</p>
                    <p>Price: ${product.price}</p>
                    <p>Description: {product.description}</p>
                </>
            )}
            <Link to="/">Go Back</Link>
        </div>
    );
};

export default ProductDetails;