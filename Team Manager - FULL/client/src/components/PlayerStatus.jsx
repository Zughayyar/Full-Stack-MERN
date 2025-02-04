import {Outlet, useParams} from "react-router-dom";


const PlayersForm = () => {
    const {num} = useParams()
    return (
        <div>
            <Outlet/>
            <h1>Player Status - Game {num}</h1>
        </div>

    )
}

export default PlayersForm