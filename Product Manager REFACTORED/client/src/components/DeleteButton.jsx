import axios from "axios";

const DeleteButton = ({ productId, onDelete }) => {
    const handleDelete = () => {
        axios
            .delete(`http://localhost:8000/api/products/${productId}`)
            .then(() => onDelete())
            .catch((error) => console.log(error));
    };

    return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteButton;