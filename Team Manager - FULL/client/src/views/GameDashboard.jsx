import styles from '../styles/mainStyles.module.css'
import {Link, Outlet} from "react-router-dom";


const GameDashboard = () => {
    return (
        <div className={styles.playerDashboard}>
            <Outlet/>
            <div className={styles.navBarStatus}>
                <Link to={'/status/1'}>
                    <h3>Game 1</h3>
                </Link>
                <span> | </span>
                <Link to={'/status/2'}>
                    <h3>Game 2</h3>
                </Link>
                <span> | </span>
                <Link to={'/status/3'}>
                    <h3>Game 3</h3>
                </Link>
            </div>
        </div>
    )
}

export default GameDashboard