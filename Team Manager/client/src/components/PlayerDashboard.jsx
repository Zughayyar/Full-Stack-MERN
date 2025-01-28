import {Link, Outlet} from "react-router-dom";
import styles from "./styles/mainStyles.module.css"
import {Anchor} from "antd";

const PlayerDashboard = (props) => {
    return (
       <div className={styles.playerDashboard}>
           <div className={styles.navBarPlayers}>
               <Link to={'/players/list'}>
                   <h3>List</h3>
               </Link>
               <Link to={'/players/addPlayer'}>
                   <h3>Add Player</h3>
               </Link>
           </div>
           <Outlet/>
       </div>
    )
}

export default PlayerDashboard