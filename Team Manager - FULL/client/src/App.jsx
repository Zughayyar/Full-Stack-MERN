import 'normalize.css'
import {Route, Routes, Navigate} from "react-router-dom";
import PlayerDashboard from "./views/PlayerDashboard.jsx";
import PlayersList from "./components/PlayersList.jsx";
import PlayersForm from "./components/PlayersForm.jsx";
import GameDashboard from "./views/GameDashboard.jsx";
import styles from './styles/mainStyles.module.css'
import NavBar from "./components/NavBar.jsx";
import PlayerStatus from "./components/PlayerStatus.jsx";

const App = () => {
    return (
        <div className={styles.mainContainer}>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Navigate to="/players/list" />} />
                <Route path="/players" element={<PlayerDashboard/>} >
                    <Route path="list" element={<PlayersList/>} />
                    <Route path="addPlayer" element={<PlayersForm/>}/>
                </Route>
                <Route path="/status" element={<GameDashboard/>}>
                    <Route path=":num" element={<PlayerStatus/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App