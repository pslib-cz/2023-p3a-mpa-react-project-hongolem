import {FC} from 'react';
import { Link } from 'react-router-dom';
//import Styles from "./Rules.module.css";

const Rules: FC = () => {

    return (
        <>
            <div>
                <h1>Rules</h1>
                <p>Monopoly is a board game that originated in the United States in 1903. It is a game of economic strategy, in which players try to get rich through buying, renting, and selling property. The game is named after the economic concept of monopoly, the domination of a market by a single entity.</p>
                <p>Players move around the board buying and trading properties, developing their properties with houses and hotels, and collecting rent from their opponents, with the goal being to drive them into bankruptcy. Money can also be gained or lost through Chance and Community Chest cards, and tax squares; players can end up in jail, which they cannot move from until they have met one of several conditions.</p>
                <p>There are many different versions of the game, but the standard version is played on a square board divided into 40 squares, with 28 properties, 4 railroads, and 2 utilities. The board is divided into 4 sides, with 10 squares on each side. The properties are divided into 8 color groups, with 2 or 3 properties in each group. Players move around the board by rolling two dice, and can buy properties they land on. If they own all the properties in a color group, they can build houses and hotels on them, which increases the rent they can charge.</p>
                <p>The game ends when all but one player has gone bankrupt. The winner is the player with the most money and property at the end of the game.</p>
            </div>
            <Link to={"/"}>Menu</Link>
        </>
    );
}

export default Rules;