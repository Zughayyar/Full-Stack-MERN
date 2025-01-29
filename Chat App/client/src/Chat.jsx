import styles from './styles/mainStyles.module.css'
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
const socket = io.connect("http://localhost:8000");

const Chat = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [userName, setUserName] = useState('')
    const [myMessage, setMyMessage] = useState('')
    const [messagesReceived, setMessagesReceived] = useState([])

    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            setMessagesReceived((prevMessages) => [...prevMessages, data]);
            console.log(data)
        })

        // Cleanup to avoid duplicate listeners
        return () => {
            socket.off("receiveMessage");
        };
    }, [])

    const handleStartChat = () => {
        if (userName.trim().length > 0) {
            setIsChatOpen(true);
        }
    }

    const sendMessage = () => {
        if (myMessage.trim().length > 0) {
            socket.emit("sendMessage", { user: userName, message: myMessage });
            setMessagesReceived([...messagesReceived, {user: userName, message:myMessage}]);
            setMyMessage('');
        }
        console.log(myMessage);
        console.log(messagesReceived);
    };

    return (
        <div className={styles.chat}>
            <p>username: {userName}</p>
            { !isChatOpen ? (
                // Before start chat
                <div>
                    <h3>Get Started right now!</h3>
                    <br/>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">I want to start chatting with the name:</label>
                            <input type="text"
                                   className="form-control"
                                   id="userName"
                                   onChange={e => setUserName(e.target.value)}
                                   value={userName}
                                   placeholder={"Your name..."} />
                        </div>
                        <button type="submit" className="btn btn-success" onClick={handleStartChat}>Start Chatting</button>
                    </div>
                </div>
            ) : (
                // After start Chat
                <div>
                    <div className={styles.chatMessagesBox}>
                        {messagesReceived.map((message, index) => (
                            <p key={index}><strong>{message.user}: </strong>{message.message}</p>
                        ))}
                    </div>
                    <div className={styles.chatInput}>
                        <input type="text"
                               className="form-control"
                               id="myMessage"
                               onChange={e => setMyMessage(e.target.value)}
                               value={myMessage}
                               placeholder={"..."} />
                        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Chat