import {useEffect, useState} from "react";
import {Button, Spin, Table} from 'antd';
import axios from "axios";
import styles from './styles/styles.module.css'
import {Link} from "react-router-dom";


const AuthorDashboard = () => {
    const [authors, setAuthors] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/authors")
            .then((response) => {
                const dataWithKeys = response.data.map((author) => ({
                    ...author,
                    key: author._id,
                }));
                setAuthors(dataWithKeys);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching authors:", error);
                setLoading(false);
            });
    }, [authors]);

    const deleteAuthor = (authorId) => {
        axios.delete("http://localhost:8000/api/authors/" + authorId)
        .then(() => {})
        .catch((error) => console.log(error));
    }

    const columns = [
        {
            title: "Author Name",
            dataIndex: "name",
            key: "name",
            render: (_, record) => (
                <a href={`/authors/${record._id}`}>{record.name}</a>
            )
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <span>
                    <Link to={`/authors/${record._id}/edit`}>
                        <Button type="primary">Edit</Button>
                    </Link>
                    <span> </span>
                    <Button type="primary" onClick={() => deleteAuthor(record._id)}>Delete</Button>
                </span>
            ),
        },
    ];

    if (loading) {
        return <Spin size="large" spinning={loading} />
    }

    return (
        <div className={styles.authorsTable}>
            <div className={styles.navContainer}>
                <a href="/authors/new">
                    <Button type="primary">Add an Author</Button></a>
            </div>
            <h3>We Have quotes by:</h3>
            <Table columns={columns} dataSource={authors} />
        </div>
    )
}
export default AuthorDashboard