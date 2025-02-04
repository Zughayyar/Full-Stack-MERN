import {Link, Outlet} from "react-router-dom";
import styles from '../styles/mainStyles.module.css'

const PlayerDashboard = () => {
    return (
        <div className={styles.playerDashboard}>
            <Outlet/>
            <div className={styles.navBarPlayers}>
                <Link to={'/players/list'}>
                    <h3>List</h3>
                </Link>
                <span> | </span>
                <Link to={'/players/addPlayer'}>
                    <h3>Add Player</h3>
                </Link>
            </div>
        </div>
    )
}

export default PlayerDashboard