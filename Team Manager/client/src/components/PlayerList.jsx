import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Space, Spin, Table} from "antd";


const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8000/api/players")
        .then((response) => {
            setPlayers(response.data);
            setLoading(false);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }, [loading])

    const deletePlayer = (playerId) => {
        axios.delete(`http://localhost:8000/api/players/${playerId}`)
        .then((response) => {
            console.log(response.data);
            removeFromDom(playerId);
        })
        .catch((error) => console.log(error));
    }

    const removeFromDom = playerId => {
        setPlayers(players.filter(player => player._id !== playerId));
    }

    const columns = [
        {
            title: 'Player Name',
            dataIndex: 'playerName',
            key: 'playerName',
        },
        {
            title: 'Preferred Position',
            dataIndex: 'preferredPosition',
            key: 'preferredPosition',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => {
                        deletePlayer(record._id)
                    }} type="primary" danger>Delete</Button>
                </Space>
            ),
        },
    ];

    if (loading) {
        return <Spin size="large" spinning={loading} />
    }

    return (
        <Table columns={columns} dataSource={players} rowKey="_id" />
    )
}

export default PlayerList;