import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/products")
            .then((response) => {
                setProducts(response.data);
                setLoaded(true);
            })
            .catch((error) => console.log(error));
    }, []);

    const removeFromDom = (productId) => {
        setProducts(products.filter((product) => product._id !== productId));
    };

    return (
        <div>
            <h1>Product List</h1>
            <Link to="/products/new">Create New Product</Link>
            <ul>
                {loaded &&
                    products.map((product) => (
                        <li key={product._id}>
                            <Link to={`/products/${product._id}`}>{product.title}</Link>
                            <Link to={`/products/${product._id}/edit`}>Edit</Link>
                            <DeleteButton productId={product._id} onDelete={() => removeFromDom(product._id)} />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default ProductList;