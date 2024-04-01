import React from 'react';
import { Link } from 'react-router-dom';

const Game: React.FC = () => {
    return (
        <div>
            <h1>Game</h1>
            <button onClick={() => {}}>Diceroll</button>
            <Link to="/">Menu</Link>



        </div>
    );
}

export default Game;