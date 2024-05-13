import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import Styles from "./Menu.module.css";
import {GameContext} from "../providers/MonopolyProvider.tsx";

const Menu: React.FC = () => {
    const { dispatch, button } = useContext(GameContext);

    const handleNameChange = (playerId: number, newName: string) => {
        dispatch({ type: 'SET_PLAYER_NAME', payload: { playerId, name: newName } });
    };

    const handleReset = () => {
        dispatch({ type: 'RESET' });
        button.setButtonClicked(false);
    };


    return (
        <div className={Styles["menu"]}>
            <p className={Styles["title"]}>Welcome To Monopoly: Liberec Edition</p>
            <div className={Styles["container"]}>
                <div className={Styles["inputContainer"]}>
                    <label className={`${Styles.nameLabel} ${Styles.red}`}>Player 1</label>
                    <input className={`${Styles.nameInput} ${Styles.red}`} type={"text"} defaultValue={"Player1"} max={15} placeholder={"Name"} onChange={(name) => handleNameChange(1, name.target.value)}/>
                </div>
                <div className={Styles["inputContainer"]}>
                    <label className={`${Styles.nameLabel} ${Styles.green}`}>Player 2</label>
                    <input className={`${Styles.nameInput} ${Styles.green}`} type={"text"} defaultValue={"Player2"} max={15} placeholder={"Name"} onChange={(name) => handleNameChange(2, name.target.value)}/>
                </div>
                <div className={Styles["inputContainer"]}>
                    <label className={`${Styles.nameLabel} ${Styles.blue}`}>Player 3</label>
                    <input className={`${Styles.nameInput} ${Styles.blue}`} type={"text"} defaultValue={"Player3"} max={15} placeholder={"Name"} onChange={(name) => handleNameChange(3, name.target.value)}/>
                </div>
                <div className={Styles["inputContainer"]}>
                    <label className={`${Styles.nameLabel} ${Styles.yellow}`}>Player 4</label>
                    <input className={`${Styles.nameInput} ${Styles.yellow}`} type={"text"} defaultValue={"Player4"} max={15} placeholder={"Name"} onChange={(name) => handleNameChange(4, name.target.value)}/>
                </div>
            </div>
            <div className={Styles["buttonBox"]}>
                <Link to={"/Game"}>Play</Link>
                <button onClick={handleReset}>Reset</button>
            </div>

        </div>
    );
}

export default Menu;