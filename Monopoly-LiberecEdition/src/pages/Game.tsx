import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {GameContext} from '../providers/MonopolyProvider.tsx';
import {MonopolyTypes} from "../types/MonopolyTypes.tsx";

const GameBoardPage: React.FC = () => {
    const { state, dispatch } = useContext(GameContext);

    const handleDiceRoll = () => {
        dispatch({ type: 'DICE_ROLL' });
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
    
    const handleSellProperty = () => {
        const currentPlayer = state.players[state.currentPlayerIndex];
        const currentField = state.gameBoard.fields[currentPlayer.position];

        if (
            currentField.type === MonopolyTypes.DISTRICT
            || currentField.type === MonopolyTypes.TRAM_STOP
            || currentField.type === MonopolyTypes.DAM
            || currentField.type === MonopolyTypes.INCINERATOR
        ) {
            dispatch({ type: 'SELL' });
        } else {
            console.log("You can't sell this field. (2)");
        }
    };

    const handleEndTurn = () => {
        dispatch({ type: 'END_TURN' });
    };

    return (
        <div>
            <h1>Monopoly Game Board</h1>
            <button onClick={handleDiceRoll}>Roll Dice</button>
            <button onClick={handleBuyProperty}>Buy Property</button>
            <button onClick={handleSellProperty}>Sell Property</button>
            <button onClick={handleEndTurn}>End Turn</button>
            <pre>{JSON.stringify(state.players, null, 2)}</pre>
            {state.gameBoard.fields.map((field, index) => (
                <div key={index}>
                    <h2>{field.text}</h2>
                </div>
            ))}

            <Link to="/">Back to Home</Link>
        </div>
    );
};

export default GameBoardPage;