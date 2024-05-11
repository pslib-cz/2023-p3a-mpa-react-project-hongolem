import {Link, Navigate} from 'react-router-dom';
import {useContext} from "react";
import {GameContext} from "../providers/MonopolyProvider.tsx";

const Winner: React.FC = () => {
    const { state } = useContext(GameContext);

    return (
        <div>
            {
                !state.winner && <Navigate to={"/"} />
            }
            <h1>Winner {state.winner?.name}</h1>
            <Link to="/">Back to Menu</Link>
        </div>
    );
}

export default Winner;