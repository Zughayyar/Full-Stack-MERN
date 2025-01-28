import styles from "./styles/mainStyles.module.css";

import { io } from "socket.io-client";
import {useState, useEffect} from "react";
const socket = io.connect("http://localhost:8000");

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    const sendMessage = () => {
        socket.emit("sendMessage",{message:message});
    }

    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            setMessageReceived(data.message);
        })
    },[socket])

    return(
        <div className={styles.playerDashboard}>
            <h2>Chat Component</h2>
            <input type="text" placeholder="Message..." onChange={(e) => setMessage(e.target.value)} value={message} />
            <button onClick={sendMessage}>Send Message</button>
            <h3>Message:</h3>
            <p>{messageReceived}</p>
        </div>
    )
}
export default Chat;