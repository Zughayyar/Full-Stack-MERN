import 'normalize.css'                              // Resit CSS
import 'bootstrap/dist/css/bootstrap.min.css';      // Bootstrap package
import styles from './styles/mainStyles.module.css'
import Chat from "./Chat.jsx";

const App = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.titleHeader}>
                <h1>MERN Chat</h1>
            </div>
            <div className={styles.chatContainer}>
                <Chat/>
            </div>
        </div>
    )
}

export default App