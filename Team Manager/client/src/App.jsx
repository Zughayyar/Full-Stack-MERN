import { Route, Routes } from "react-router-dom";
import PlayerDashboard from "./components/PlayerDashboard.jsx";
import 'normalize.css';
import NavBar from "./components/NavBar.jsx";
import styles from "./components/styles/mainStyles.module.css";
import PlayerList from "./components/PlayerList.jsx";
import PlayerForm from "./components/PlayerForm.jsx";
import PlayerStatus from "./components/PlayerStatus.jsx";

const App = () => {
    return (
        <div className={styles.mainContainer}>
            <NavBar />
            <Routes>
                <Route path="/players" element={<PlayerDashboard />}>
                    {/* Child Routes */}
                    <Route path="list" element={<PlayerList />} />
                    <Route path="addPlayer" element={<PlayerForm />} />
                </Route>

                <Route path="/status/game" element={<PlayerStatus />} />
            </Routes>
        </div>
    );
};

export default App;