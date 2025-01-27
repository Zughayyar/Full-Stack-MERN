import AuthorDashboard from "./components/AuthorDashboard.jsx";
import styles from "./components/styles/styles.module.css";
import AuthorsTable from "./components/AuthorsTable.jsx";
import {Route, Routes} from "react-router-dom";
import AuthorsCreateNew from "./components/AuthorsCreateNew.jsx";
import AuthorForm from "./components/AuthorForm.jsx";
import AuthorUpdate from "./components/AuthorUpdate.jsx";
import AuthorDetails from "./components/AuthorDetails.jsx";

const App = () => {
    return (
        <div className={styles.appContainer}>
            <h1>Favorite Authors</h1>
            <Routes>
                <Route path="/authors" element={
                    <AuthorDashboard>
                        <AuthorsTable />
                    </AuthorDashboard>
                } />
                <Route path="/authors/new" element={
                    <AuthorsCreateNew>
                        <AuthorForm/>
                    </AuthorsCreateNew>
                }/>
                <Route path="/authors/:id/edit" element={
                    <AuthorUpdate>
                        <AuthorForm/>
                    </AuthorUpdate>
                }/>
                <Route path="/authors/:authorId" element={<AuthorDetails/>} />
            </Routes>
        </div>
    )
}

export default App