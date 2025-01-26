import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        if (isEditing) {
            axios
                .get(`http://localhost:8000/api/products/${id}`)
                .then((response) => {
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                    setPrice(response.data.price);
                })
                .catch((error) => console.log(error));
        }
    }, [id, isEditing]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = { title, description, price: parseFloat(price) };

        if (isEditing) {
            axios
                .patch(`http://localhost:8000/api/products/${id}`, productData)
                .then(() => navigate("/"))
                .catch((error) => console.log(error));
        } else {
            axios
                .post("http://localhost:8000/api/products", productData)
                .then(() => navigate("/"))
                .catch((error) => console.log(error));
        }
    };

    return (
        <div>
            <h1>{isEditing ? "Edit Product" : "Create Product"}</h1>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Price</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                <label>Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit">{isEditing ? "Update" : "Create"}</button>
            </form>
        </div>
    );
};

export default ProductForm;