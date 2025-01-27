import AuthorDashboard from "./components/AuthorDashboard.jsx";
import styles from "./components/styles/styles.module.css";
import AuthorsTable from "./components/AuthorsTable.jsx";

const App = () => {
    return (
        <div className={styles.appContainer}>
            <h1>Favorite Authors</h1>
            <AuthorDashboard>
                <AuthorsTable/>
            </AuthorDashboard>
        </div>
    )
}

export default App