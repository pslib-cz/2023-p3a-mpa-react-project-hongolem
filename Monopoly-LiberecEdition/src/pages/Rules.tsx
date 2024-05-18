import {FC, useContext} from 'react';
import { Link } from 'react-router-dom';
import {GameContext} from "../providers/MonopolyProvider.tsx";
import {MonopolyTypes, StartType, TaxType} from "../types/MonopolyTypes.tsx";
import Styles from "./Rules.module.css";

const Rules: FC = () => {
    const {state} = useContext(GameContext);

    return (
        <>
            <div className={Styles["textBox"]}>
                <p className={Styles["title"]}>Rules</p>
                <p>Monopoly is a board game that originated in the United States in 1903. It is a game of economic strategy, in which players try to get rich through buying, renting, and selling property. The game is named after the economic concept of monopoly, the domination of a market by a single entity. BUT with a tinge of Liberec theme.</p>
                <p className={Styles["subtitle"]}>Winning</p>
                <p>The goal of the game is either to be to last player which hasn't declared bankruptcy, own 3 monopoles or all tram stops.</p>
                <p className={Styles["subtitle"]}>Ownership</p>
                <p>A player can own <span className={Styles["bold"]}>Districts</span> (which he can upgrade up to 3 times, each doubling it's rent; when owning all districts of the same color, he now owns a monopole), <span className={Styles["bold"]}>Tram Stops</span>, an <span className={Styles["bold"]}>Incinerator</span> or a <span className={Styles["bold"]}>Dam</span>. When any other player steps on an owned field, he must pay the necessary rent. When a player no longer has enough money, all of his properties get sold. Once his money run out when he does not own any properties, he's out of the game.</p>
                <p className={Styles["subtitle"]}>Other Fields</p>
                <p>The <span className={Styles["bold"]}>Start</span> field gives the player {(state.gameBoard.fields.find(field => field.type === MonopolyTypes.START) as StartType).reward} 000 Kč.</p>
                <p>The <span className={Styles["bold"]}>Gamba</span> and <span>Dávky</span> both randomly choose a card that either helps or harm the player.</p>
                <p>The <span className={Styles["bold"]}>Janitor</span> keeps the player stuck until he rolls doubles or he spends 3 rounds there.</p>
                <p>The <span className={Styles["bold"]}>Fügnerka</span> field is a free field that does not do anything special.</p>
                <p>The <span className={Styles["bold"]}>Bus</span>, once stepped on, enables the player to move to any field owned by the player or any unowned purchasable field.</p>
                <p>The <span className={Styles["bold"]}>Tax</span> field taxes the player for {(state.gameBoard.fields.find(field => field.type === MonopolyTypes.TAX) as TaxType).price} 000 Kč.</p>
            </div>
            <div className={Styles["ruleBox"]}>
                <Link className={Styles["ruleButton"]} to={"/"}>Menu</Link>
            </div>

        </>
    );
}

export default Rules;