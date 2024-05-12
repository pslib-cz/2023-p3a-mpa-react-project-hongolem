import {Link, Navigate} from 'react-router-dom';
import {FC, useContext} from "react";
import {GameContext} from "../providers/MonopolyProvider.tsx";
import Styles from "./Winner.module.css";

const Winner: FC = () => {
    const { dispatch, state, button } = useContext(GameContext);

    const handleReset = () => {
        dispatch({ type: 'RESET' });
        button.setButtonClicked(false);
    };

    return (
        <div className={Styles["winBox"]}>
            {
                !state.winner && <Navigate to={"/"} />
            }
            <p className={Styles["winText"]}>💸💸💸The Winner is {state.winner?.name}!💸💸💸</p>
            <Link onClick={handleReset} to="/">Back to Menu</Link>
        </div>
    );
}

export default Winner;