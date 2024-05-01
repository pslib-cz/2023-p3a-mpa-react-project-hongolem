import {PlayerType} from "../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "./InfoBox.module.css";

interface InfoBoxProps {
    players: PlayerType[];
    money: number[];
    currentPlayerIndex: number;
    round: number;
}

export const InfoBox: FC<InfoBoxProps> = ({players, money, round, currentPlayerIndex}) => {
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
                        <th>{players[0].name}</th>
                        <td>{(money[2]<=0) ? "Bankrupt!":money[0]}</td>
                    </tr>
                    <tr>
                        <th>{players[1].name}</th>
                        <td>{(money[2]<=0) ? "Bankrupt!":money[1]}</td>
                    </tr>
                    <tr>
                        <th>{players[2].name}</th>
                        <td>{(money[2]<=0) ? "Bankrupt!":money[2]}</td>
                    </tr>
                    <tr>
                        <th>{players[3].name}</th>
                        <td>{(money[3]<=0) ? "Bankrupt!":money[3]}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Round</th>
                        <td>{round}</td>
                    </tr>
                    <tr>
                        <th>Current Player</th>
                        <td>{players[currentPlayerIndex].name}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};