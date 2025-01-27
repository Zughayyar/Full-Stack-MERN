import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Form, Input} from "antd";
import styles from "./styles/styles.module.css";


const AuthorForm = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const isEditing = !!id


    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [form] = Form.useForm();

    useEffect(() => {
        if (isEditing) {
            axios.get(`http://localhost:8000/api/authors/${id}`)
            .then(response => {
                console.log(response.data.name);
                form.setFieldsValue({name: response.data.name});
            })
            .catch(error => {
                console.log(error.response.data)
                const errorResponse = error.response.data.errors;
                const errorArray = []
                for (const key of Object.keys(errorResponse)) {
                    errorArray.push({key: key, message: errorResponse[key].message});
                }
                setErrors(errorArray);
            })
        }
    }, [id, isEditing, form]);

    const onFinish = () => {
        const authorData = {name};

        if (isEditing) {
            axios.patch(`http://localhost:8000/api/authors/${id}`, authorData)
            .then(() => navigate("/authors"))
            .catch(error => {
                console.log(error.response.data)
                const errorResponse = error.response.data.errors;
                const errorArray = []
                for (const key of Object.keys(errorResponse)) {
                    errorArray.push({key: key, message: errorResponse[key].message});
                }
                setErrors(errorArray);
            });
        }
        else {
            axios.post('http://localhost:8000/api/authors', authorData)
            .then(() => navigate("/authors"))
            .catch(error => {
                console.log(error.response.data)
                const errorResponse = error.response.data.errors;
                const errorArray = []
                for (const key of Object.keys(errorResponse)) {
                    errorArray.push({key: key, message: errorResponse[key].message});
                }
                setErrors(errorArray);
            })
        }
    }

    return (
        <Form
            form={form}
            name="basic"
            onFinish={onFinish}
        >
            {/* Username Input */}
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Please input your username!",
                    },
                ]}
            >
                <Input
                    onChange={(e) => setName(e.target.value)}
                    value={name} 
                />
            </Form.Item>

            {/* Display Errors */}
            {
                errors.length > 0 && (
                    errors.map((error, index) => (
                        <p key={index} className={styles.errorMessage}>{error.message}</p>
                    ))
                )
            }

            {/* Submit Button */}
            <Form.Item>
                <Link to="/authors">
                    <Button type="primary">Cancel</Button>
                </Link>
                <span> </span>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    )



}

export default AuthorForm;