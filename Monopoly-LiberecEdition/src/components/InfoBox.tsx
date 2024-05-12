import {FC, useContext} from "react";
import Styles from "./InfoBox.module.css";
import {GameContext} from "../providers/MonopolyProvider.tsx";

export const InfoBox: FC = () => {
    const {state} = useContext(GameContext);
    
    return (
        <div className={Styles["tableContainer"]}>
            <table>
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Money</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{state.players[0].name}</th>
                        <td>{(state.players[0].money<=0) ? "Bankrupt!":(state.players[0].money + " 000 Kč")}</td>
                    </tr>
                    <tr>
                        <th>{state.players[1].name}</th>
                        <td>{(state.players[1].money<=0) ? "Bankrupt!":(state.players[1].money + " 000 Kč")}</td>
                    </tr>
                    <tr>
                        <th>{state.players[2].name}</th>
                        <td>{(state.players[2].money<=0) ? "Bankrupt!":(state.players[2].money + " 000 Kč")}</td>
                    </tr>
                    <tr>
                        <th>{state.players[3].name}</th>
                        <td>{(state.players[3].money<=0) ? "Bankrupt!":(state.players[3].money + " 000 Kč")}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Round</th>
                        <td>{state.round}</td>
                    </tr>
                    <tr>
                        <th>Current Player</th>
                        <td>{state.players[state.currentPlayerIndex].name}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};