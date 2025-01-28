import 'normalize.css';
import styles from "./components/styles/mainStyles.module.css";
import Chat from "./components/Chat.jsx";


const App = () => {
    return (
        <div className={styles.mainContainer}>
            <Chat/>
        </div>
    );
};

export default App;