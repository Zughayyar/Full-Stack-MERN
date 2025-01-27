import {useEffect, useState} from "react";
import {Button, Table} from 'antd';
import axios from "axios";
import styles from './styles/styles.module.css'


const AuthorDashboard = () => {
    const [authors, setAuthors] = useState([])
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/authors")
            .then((response) => {
                const dataWithKeys = response.data.map((author) => ({
                    ...author,
                    key: author._id,
                }));
                setAuthors(dataWithKeys);
            })
            .catch((error) => {
                console.error("Error fetching authors:", error);
            });
    }, []);

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
            render: () => (
                <span>
                    <Button type="primary">Edit</Button>
                    <span> </span>
                    <Button type="primary">Delete</Button>
                </span>
            ),
        },
    ];

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