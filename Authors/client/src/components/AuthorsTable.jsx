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
                // Add a 'key' property to each author object
                const dataWithKeys = response.data.map((author) => ({
                    ...author,
                    key: author._id, // Use the unique '_id' from the response as the 'key'
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
            <h3>We Have quotes by:</h3>
            <Table columns={columns} dataSource={authors} />
        </div>
    )
}
export default AuthorDashboard