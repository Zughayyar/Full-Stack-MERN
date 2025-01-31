import styles from './styles/mainStyles.module.css'
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import axios from "axios";  // Import Axios to fetch messages
import { format } from 'date-fns-tz';

const socket = io.connect("http://localhost:8000");

const Chat = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [myMessage, setMyMessage] = useState('');
    const [messagesReceived, setMessagesReceived] = useState([]);

    // Fetch messages from the database on component mount
    useEffect(() => {
        axios.get("http://localhost:8000/api/chats")
            .then((res) => {
                setMessagesReceived(res.data);
                scrollToBottom()
            })
            .catch((err) => console.error("Error fetching messages:", err));

        socket.on("receiveMessage", (data) => {
            setMessagesReceived((prevMessages) => {
                // 🔥 Prevent duplicate messages
                if (!prevMessages.some(msg => msg.user === data.user && msg.message === data.message)) {
                    return [...prevMessages, data];
                }
                return prevMessages;
            });
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    useEffect(() => {
        scrollToBottom();  // Scroll to bottom every time the messages list updates
    }, [messagesReceived]);  // This effect will run when `messagesReceived` changes

    const handleStartChat = () => {
        if (userName.trim().length > 0) {
            setIsChatOpen(true);
        }
    };


    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();  // Prevent form submission on Enter key
            sendMessage();  // Trigger the send message function
            scrollToBottom();  // Scroll the messages box to the bottom
        }
    };

    const scrollToBottom = () => {
        const chatMessagesBox = document.querySelector(`.${styles.chatMessagesBox}`);
        if (chatMessagesBox) {
            chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight; // Scroll to the bottom
        }
    };


    const sendMessage = () => {
        if (myMessage.trim().length > 0) {
            const newMessage = { user: userName, message: myMessage };
            socket.emit("sendMessage", newMessage);
            setMyMessage('');
            scrollToBottom();
        }
    };

    const formatTime = (isoDate) => {
        if (!isoDate) return "Invalid Date"; // Handle missing/null values

        const date = new Date(isoDate);
        if (isNaN(date.getTime())) return "Invalid Date"; // Ensure valid date

        const timeZone = "Asia/Jerusalem";
        return format(date, "HH:mm", { timeZone });
    };

    return (
        <div className={styles.chat}>
            <p>username: {userName}</p>
            {!isChatOpen ? (
                // Before start chat
                <div>
                    <h3>Get Started right now!</h3>
                    <br/>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">
                                I want to start chatting with the name:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="userName"
                                onChange={e => setUserName(e.target.value)}
                                value={userName}
                                placeholder="Your name..."
                            />
                        </div>
                        <button type="submit" className="btn btn-success" onClick={handleStartChat}>
                            Start Chatting
                        </button>
                    </div>
                </div>
            ) : (
                // After start Chat
                <div>
                    <div className={styles.chatMessagesBox}>
                        {messagesReceived.map((message, index) => (
                            <div
                                key={index}
                                className={
                                    message.user === userName
                                        ? styles.userMessage
                                        : styles.otherUserMessage
                                }
                            >
                                <p>
                                    <strong>{message.user}: </strong>{message.message}
                                    <span> ({formatTime(message.createdAt)})</span>
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.chatInput}>
                        <input
                            type="text"
                            className="form-control"
                            id="myMessage"
                            onChange={e => setMyMessage(e.target.value)}
                            value={myMessage}
                            placeholder="..."
                            onKeyDown={handleKeyDown}
                        />
                        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;