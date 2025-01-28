import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from './styles/mainStyles.module.css';

const PlayerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [playerName, setPlayerName] = useState("");
    const [preferredPosition, setPreferredPosition] = useState("");
    const [errors, setErrors] = useState([]);
    const [form] = Form.useForm();

    // Fetch player data if editing
    useEffect(() => {
        if (isEditing) {
            axios.get(`http://localhost:8000/api/players/${id}`)
                .then(response => {
                    const { playerName, preferredPosition } = response.data;
                    form.setFieldsValue({ playerName, preferredPosition });
                    setPlayerName(playerName);
                    setPreferredPosition(preferredPosition);
                })
                .catch(error => {
                    console.error("Error fetching player data:", error.response?.data);
                    const errorResponse = error.response?.data?.errors || {};
                    const errorArray = Object.keys(errorResponse).map(key => ({
                        key,
                        message: errorResponse[key].message,
                    }));
                    setErrors(errorArray);
                });
        }
    }, [id, isEditing, form]);

    // Handle form submission
    const onFinish = () => {
        const playerData = { playerName, preferredPosition };

        const apiCall = isEditing
            ? axios.patch(`http://localhost:8000/api/players/${id}`, playerData)
            : axios.post('http://localhost:8000/api/players', playerData);

        apiCall
            .then(() => navigate("/players/list"))
            .catch(error => {
                console.error("Error submitting form:", error.response?.data);
                const errorResponse = error.response?.data?.errors || {};
                const errorArray = Object.keys(errorResponse).map(key => ({
                    key,
                    message: errorResponse[key].message,
                }));
                setErrors(errorArray);
            });
    };

    return (
        <Form
            form={form}
            name="basic"
            onFinish={onFinish}
        >
            {/* Player Name Input */}
            <Form.Item
                label="Player Name"
                name="playerName"
                rules={[
                    {
                        required: true,
                        message: "Please input Player Name!",
                    },
                ]}
            >
                <Input
                    onChange={(e) => setPlayerName(e.target.value)}
                    value={playerName}
                />
            </Form.Item>

            {/* Preferred Position Input */}
            <Form.Item
                label="Preferred Position"
                name="preferredPosition"
                rules={[
                    {
                        required: true,
                        message: "Please input Preferred Position!",
                    },
                ]}
            >
                <Input
                    onChange={(e) => setPreferredPosition(e.target.value)}
                    value={preferredPosition}
                />
            </Form.Item>

            {/* Display Errors */}
            {errors.length > 0 && (
                errors.map((error, index) => (
                    <p key={index} className={styles.errorMessage}>{error.message}</p>
                ))
            )}

            {/* Form Actions */}
            <Form.Item>
                <Link to="/players/list">
                    <Button type="primary">Cancel</Button>
                </Link>
                <span> </span>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
};

export default PlayerForm;