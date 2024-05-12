import {useContext, useEffect} from "react";
import {DamType, DistrictType, IncineratorType, MonopolyTypes, TramStopType} from "../types/MonopolyTypes.tsx";
import {GameContext, PurchasableFields} from "../providers/MonopolyProvider.tsx";
import Styles from "./ButtonBox.module.css";
import {Link, useNavigate} from "react-router-dom";

export const ButtonBox = () => {
    const { state, dispatch, button } = useContext(GameContext);
    const navigate = useNavigate();
    const currentPlayer = state.players[state.currentPlayerIndex];
    const currentField = state.gameBoard.fields[currentPlayer.position];
    let canBuy = false;
    if (PurchasableFields.includes(currentField.type)) {
        const purchasableField = currentField as DistrictType | TramStopType | DamType | IncineratorType;
        canBuy = purchasableField.owner === undefined && currentPlayer.money >= purchasableField.price && !state.roundActionBool;
    }
    let canUpgrade = false;
    if (currentField.type === MonopolyTypes.DISTRICT) {
        const district = currentField as DistrictType;
        canUpgrade = district.owner === currentPlayer.id && currentPlayer.money >= Math.round(district.price / 2) * district.level && !(district.level === 4)  && !state.roundActionBool;
    }
    let canSell = false;
    if ((currentField.type === MonopolyTypes.DISTRICT) || (currentField.type === MonopolyTypes.TRAM_STOP) || (currentField.type === MonopolyTypes.INCINERATOR) || (currentField.type === MonopolyTypes.DAM)) {
        const property = currentField as DistrictType | TramStopType | DamType | IncineratorType;
        canSell = property.owner === currentPlayer.id && !state.roundActionBool;
    }

    useEffect(() => {
        if (state.winner) {
            navigate("/Winner");
        }
    }, [state.winner]);

    const handleClick = (isButtonClicked: boolean) => {
        button.setButtonClicked(isButtonClicked);
    };

    const handleDiceRoll = () => {
        dispatch({ type: 'DICE_ROLL' });
        handleClick(true);
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
    const handleSell = () => {
        dispatch({type: 'SELL'});
    };
    const handleEndTurn = () => {
        dispatch({ type: 'END_TURN' });
        handleClick(false);
    };

    return (
        <div className={`${Styles["container"]} ${Styles["containerFullHeight"]}`}>
            <div className={Styles["buttonContainer"]}>
                <button onClick={handleDiceRoll} disabled={button.buttonClicked} className={Styles["btn"]}>DiceRoll</button>
                <button onClick={handleBuyProperty} disabled={!button.buttonClicked || !canBuy} className={Styles["btn"]}>Buy</button>
                <button onClick={handleUpgrade} disabled={!button.buttonClicked || !canUpgrade} className={Styles["btn"]}>Upgrade</button>
                <button onClick={handleSell} disabled={!button.buttonClicked || !canSell} className={Styles["btn"]}>Sell</button>
                <button onClick={handleEndTurn} disabled={!button.buttonClicked} className={`red ${Styles["btn"]}`}>End Turn</button>
            </div>
            <Link to="/" className={`${Styles["menuButton"]} ${Styles["btn"]}`}>Menu</Link>
        </div>
    );
};