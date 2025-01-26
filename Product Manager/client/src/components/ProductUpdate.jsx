import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";


const ProductUpdate = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0.00);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
        .then((response) => {
            setTitle(response.data.title)
            setPrice(response.data.price)
            setDescription(response.data.description)
        })
    }, [id]);

    const updateProduct = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/products/${id}`, {
            title: title,
            description: description,
            price: parseFloat(price),
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));

        navigate('/');


    }

    return(
        <div>
            <h1>Update a Product</h1>
            <form onSubmit={updateProduct}>
                <label>Title</label><br/>
                <input type="text" name="title" onChange={e=>setTitle(e.target.value)} value={title}/><br/>
                <label>Price</label><br/>
                <input type="text" name="price" onChange={e=>setPrice(e.target.value)} value={price}/><br/>
                <label>Description</label><br/>
                <input type="text" name="description" onChange={e=>setDescription(e.target.value)} value={description}/><br/>
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default ProductUpdate;