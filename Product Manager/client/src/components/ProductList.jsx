import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/products')
            .then((response) => {
                setProducts(response.data);
                setLoaded(true);
            })
            .catch((error) => {
                console.log('We have a problem with error: ', error);
            });
    }, [products]); // Empty dependency array so it runs only once when the component mounts

    const deleteProduct = (productId) => {
        axios.delete('http://localhost:8000/api/products/' + productId)
        .then(response => response.json())
        .catch(error => console.log(error));
    }

    return (
        <div>
            <h1>Product List:</h1>
            <ul>
                { loaded &&
                    products.map((product) => (
                        <li key={product._id}>
                            <Link to={`/products/${product._id}`}>
                                {product.title}
                            </Link>
                            <Link to={`/products/${product._id}/edit`}>Edit</Link>
                            <button onClick={() => deleteProduct(product._id)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ProductList;