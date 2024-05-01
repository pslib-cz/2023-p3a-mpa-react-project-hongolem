import React, {useContext, /*useRef*/} from "react";
import {MonopolyTypes} from "../types/MonopolyTypes.tsx";
import {GameContext} from "../providers/MonopolyProvider.tsx";
import Styles from "./ButtonBox.module.css";

export const ButtonBox = () => {
    const { state, dispatch } = useContext(GameContext);
    const [buttonClicked, setButtonClicked] = React.useState(false);
    //const button = useRef<HTMLElement>(null);


    const handleClick = () => {
        setButtonClicked(!buttonClicked);
    };

    const handleDiceRoll = () => {
        dispatch({ type: 'DICE_ROLL' });
        handleClick();
    };

    const handleBuyProperty = () => {
        const currentPlayer = state.players[state.currentPlayerIndex];
        const currentField = state.gameBoard.fields[currentPlayer.position];

        if (
            currentField.type === MonopolyTypes.DISTRICT
            || currentField.type === MonopolyTypes.TRAM_STOP
            || currentField.type === MonopolyTypes.DAM
            || currentField.type === MonopolyTypes.INCINERATOR
        ) {
            dispatch({ type: 'BUY_PROPERTY' });
        } else {
            console.log("You can't buy this field. (1)");
        }
    };
    const handleUpgrade = () => {
        dispatch({type: 'UPGRADE'});
    };
    const handleEndTurn = () => {
        dispatch({ type: 'END_TURN' });
        handleClick();
    };

    return (
        <div className={Styles["buttonContainer"]}>
            <button onClick={handleDiceRoll} disabled={buttonClicked} className={Styles["btn"]}>DiceRoll</button>
            <button onClick={handleBuyProperty} disabled={!buttonClicked} className={Styles["btn"]}>Buy</button>
            <button onClick={handleUpgrade} disabled={!buttonClicked} className={Styles["btn"]}>Upgrade</button>
            <button onClick={handleEndTurn} disabled={!buttonClicked} className={`red ${Styles["btn"]}`}>End Turn</button>
        </div>
    );
};