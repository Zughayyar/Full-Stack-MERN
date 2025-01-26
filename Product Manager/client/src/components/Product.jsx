import axios from 'axios'
import {useState} from "react";

const Product = (props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0.00)

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/products', {
            title,
            description,
            price,
        })
            .then(response => {
                console.log(response)
                setTitle("")
                setPrice(0)
                setDescription("")
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Title</label><br/>
                <input type="text" onChange={e=>setTitle(e.target.value)} value={title}/><br/>
                <label>Price</label><br/>
                <input type="text" onChange={e=>setPrice(e.target.value)} value={price}/><br/>
                <label>Description</label><br/>
                <input type="text" onChange={e=>setDescription(e.target.value)} value={description}/><br/>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default Product