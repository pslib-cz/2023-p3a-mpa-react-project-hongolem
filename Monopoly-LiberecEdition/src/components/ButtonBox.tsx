import React, {useContext} from "react";
import {DamType, DistrictType, IncineratorType, MonopolyTypes, TramStopType} from "../types/MonopolyTypes.tsx";
import {GameContext, PurchasableFields} from "../providers/MonopolyProvider.tsx";
import Styles from "./ButtonBox.module.css";
import {Link} from "react-router-dom";

export const ButtonBox = () => {
    const { state, dispatch } = useContext(GameContext);
    const [buttonClicked, setButtonClicked] = React.useState(false);
    const currentPlayer = state.players[state.currentPlayerIndex];
    const currentField = state.gameBoard.fields[currentPlayer.position];
    let canUpgrade = false;
    if (currentField.type === MonopolyTypes.DISTRICT) {
        const district = currentField as DistrictType;
        canUpgrade = district.owner === currentPlayer.id && currentPlayer.money >=  (district.price/(district.rent * 5)) && !(district.level === 4)  && !state.roundActionBool;
    }
    let canBuy = false;
    if (PurchasableFields.includes(currentField.type)) {
        const purchasableField = currentField as DistrictType | TramStopType | DamType | IncineratorType;
        canBuy = purchasableField.owner === undefined && currentPlayer.money >= purchasableField.price && !state.roundActionBool;
    }

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
            state.message = "You can't buy this field. It's not for sale.";
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
        <div className={`${Styles["container"]} ${Styles["containerFullHeight"]}`}>
            <div className={Styles["buttonContainer"]}>
                <button onClick={handleDiceRoll} disabled={buttonClicked} className={Styles["btn"]}>DiceRoll</button>
                <button onClick={handleBuyProperty} disabled={!buttonClicked || !canBuy} className={Styles["btn"]}>Buy
                </button>
                <button onClick={handleUpgrade} disabled={!buttonClicked || !canUpgrade}
                        className={Styles["btn"]}>Upgrade
                </button>
                <button onClick={handleEndTurn} disabled={!buttonClicked} className={`red ${Styles["btn"]}`}>End Turn
                </button>
            </div>
            <Link to="/" className={`${Styles["menuButton"]} ${Styles["btn"]}`}>Menu</Link>
        </div>
    );
};