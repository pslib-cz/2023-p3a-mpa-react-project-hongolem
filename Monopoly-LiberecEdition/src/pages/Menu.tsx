import React from 'react';
import { Link } from 'react-router-dom';
import Styles from "./Menu.module.css";

const Menu: React.FC = () => {
    return (
        <div>
            <p className={Styles["title"]}>Welcome To Monopoly: Liberec Edition</p>
            <div className={Styles["container"]}>
                <div className={Styles["inputContainer"]}>
                    <label className={`${Styles.nameLabel} ${Styles.red}`}>Player 1</label>
                    <input className={`${Styles.nameInput} ${Styles.red}`} type={"text"} defaultValue={"Player1"} max={25} placeholder={"Name"}/>
                </div>
                <div className={Styles["inputContainer"]}>
                    <label className={`${Styles.nameLabel} ${Styles.green}`}>Player 2</label>
                    <input className={`${Styles.nameInput} ${Styles.green}`} type={"text"} defaultValue={"Player2"} max={25} placeholder={"Name"}/>
                </div>
                <div className={Styles["inputContainer"]}>
                    <label className={`${Styles.nameLabel} ${Styles.blue}`}>Player 3</label>
                    <input className={`${Styles.nameInput} ${Styles.blue}`} type={"text"} defaultValue={"Player3"} max={25} placeholder={"Name"}/>
                </div>
                <div className={Styles["inputContainer"]}>
                    <label className={`${Styles.nameLabel} ${Styles.yellow}`}>Player 4</label>
                    <input className={`${Styles.nameInput} ${Styles.yellow}`} type={"text"} defaultValue={"Player4"} max={25} placeholder={"Name"}/>
                </div>
            </div>
            <Link to="/Game">Play</Link>
        </div>
    );
}

export default Menu;