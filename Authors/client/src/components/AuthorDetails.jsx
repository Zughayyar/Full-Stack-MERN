import styles from "./styles/styles.module.css";
import { Button, Card, Space, Spin} from "antd";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";


const AuthorDetails = () => {
    const [author, setAuthor] = useState(null);
    const {authorId} = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${authorId}`)
        .then(response => {
            console.log(response.data);
            setAuthor(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        });
    }, [authorId])

    if (loading) {
        return <Spin size="large" spinning={loading} />
    }

    return (
        <div className={styles.authorsTable}>
            <div className={styles.navContainer}>
                <a href="/authors">
                    <Button type="primary">Bach to Dashboard</Button>
                </a>
            </div>
            <Space direction="vertical" size={16}>
                <Card
                    title={author.name}
                    style={{
                        width: "75vw",
                    }}
                >
                    <p><strong>ID: </strong> {author._id}</p>
                    <p><strong>Created At: </strong> {author.createdAt}</p>
                    <p><strong>Updated At: </strong> {author.updatedAt}</p>
                </Card>
            </Space>
        </div>
    )
}

export default AuthorDetails;