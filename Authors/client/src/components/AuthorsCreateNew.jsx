import styles from './styles/styles.module.css'
import {Button, Form, Input} from "antd";
import {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";


const AuthorsCreateNew = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const onFinish = () => {
        axios.post('http://localhost:8000/api/authors', {name})
            .then(response => {
                console.log(response);
                setName('')
                setErrors([])
                navigate('/authors')
            })
            .catch(error => {
                console.log(error.response.data);
                const errorResponse = error.response.data.errors;
                const errorArray = []
                for (const key of Object.keys(errorResponse)) {
                    errorArray.push({key: key, message: errorResponse[key].message});
                }
                setErrors(errorArray);
            });
    }

    return (
        <div className={styles.authorsTable}>
            <div className={styles.navContainer}>
                <a href="/authors">
                    <Button type="primary">Home</Button></a>
            </div>
            <h3>Add a New Author:</h3>
            <div className={styles.formContainer}>
                <Form name="basic" onFinish={onFinish}>
                    {/* Username Input */}
                    <Form.Item
                        label="name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input onChange={(e) => setName(e.target.value)} value={name} />
                    </Form.Item>

                    {/*Display Errors*/}
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
            </div>

        </div>
    )
}

export default AuthorsCreateNew