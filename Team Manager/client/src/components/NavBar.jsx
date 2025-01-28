import styles from "./styles/mainStyles.module.css";
import {Link} from "react-router-dom";


const NavBar = () => {
    return (
        <div className={styles.navBarContainer}>
            <Link to={'/players/list'}>
                <h3>Manage Players</h3>
            </Link>
            <Link to={'/status/game'}>
                <h3>Manage Player Status</h3>
            </Link>
        </div>
    )
}

export default NavBar;