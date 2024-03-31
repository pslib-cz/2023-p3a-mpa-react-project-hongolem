import React from 'react';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
    return (
        <div>
            <h1>Menu</h1>
            <Link to="/Game">Game</Link>
        </div>
    );
}

export default Menu;