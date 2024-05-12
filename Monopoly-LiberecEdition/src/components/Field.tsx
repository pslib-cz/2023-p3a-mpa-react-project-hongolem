import {
    DamType,
    DistrictType,
    FieldType,
    IncineratorType,
    MonopolyTypes,
    TramStopType
} from "../types/MonopolyTypes.tsx";
import {FC, useContext} from "react";
import {GameContext} from "../providers/MonopolyProvider.tsx";
import Styles from "./Field.module.css";
import StartField from "./Fields/StartField";
import TramStopField from "./Fields/TramStopField";
import DistrictField from "./Fields/DistrictField";
import IncineratorField from "./Fields/IncineratorField.tsx";
import TaxField from "./Fields/TaxField.tsx";
import DamField from "./Fields/DamField.tsx";
import GambaField from "./Fields/GambaField.tsx";
import DavkyField from "./Fields/DavkyField.tsx";
import JanitorField from "./Fields/JanitorField.tsx";
import FreeField from "./Fields/FreeField.tsx";
import BusField from "./Fields/BusField.tsx";


interface FieldProps {
    index: number;
    field: FieldType;
}

const renderField = (field: FieldType) => {
    switch(MonopolyTypes[field.type]) {
        case MonopolyTypes.START:
            return <StartField field={field} />;
        case MonopolyTypes.TRAM_STOP:
            return <TramStopField field={field} />;
        case MonopolyTypes.DISTRICT:
            return <DistrictField field={field} />;
        case MonopolyTypes.JANITOR:
            return <JanitorField field={field} />;
        case MonopolyTypes.GAMBA:
            return <GambaField field={field} />;
        case MonopolyTypes.DAVKY:
            return <DavkyField field={field} />;
        case MonopolyTypes.FREE_FIELD:
            return <FreeField field={field} />;
        case MonopolyTypes.BUS:
            return <BusField field={field} />;
        case MonopolyTypes.TAX:
            return <TaxField field={field} />;
        case MonopolyTypes.INCINERATOR:
            return <IncineratorField field={field} />;
        case MonopolyTypes.DAM:
            return <DamField field={field} />;
        default:
            return null;
    }
}

type FieldState = "horizontal" | "vertical" | "corner";

export const Field: FC<FieldProps> = ({index, field}) => {
    const {state, dispatch, button} = useContext(GameContext);
    const players = state.players.filter(player => player.position === index);
    const fieldState: FieldState = index % 10 === 0 ? "corner" : Math.floor(index / 10) % 2 === 0 ? "vertical" : "horizontal";
    const owner = state.players.find(player => (
        (field as DistrictType | TramStopType | IncineratorType | DamType).owner === player.id
    ));
    let ownerString = "";
    const isStandingOnBusField = state.gameBoard.fields[state.players[state.currentPlayerIndex].position].type === MonopolyTypes.BUS;
    const playedThisRound = state.players[state.currentPlayerIndex].round > state.round;
    const isFieldHoverable = state.gameBoard.fields.filter(field => {
        return (field.type === MonopolyTypes.DISTRICT || field.type === MonopolyTypes.TRAM_STOP || field.type === MonopolyTypes.INCINERATOR || field.type === MonopolyTypes.DAM)
            && ((!(field as DamType | IncineratorType | TramStopType | DistrictType).owner)
                || (field as DamType | IncineratorType | TramStopType | DistrictType).owner === state.players[state.currentPlayerIndex].id)}).includes(state.gameBoard.fields[field.id])

    if (owner) {
        ownerString = `field--player${owner.id}`;
    }
    
    return (
        <div onClick={() => {const currentPlayer = state.players[state.currentPlayerIndex];
            if (!isStandingOnBusField) return;
            if (playedThisRound) return;
            if (!isFieldHoverable) {return;}
            dispatch({ type: 'BUS_TRAVEL', payload: {playerId: currentPlayer.id-1, fieldId: field.id}});
            button.setButtonClicked(!button.buttonClicked);}} className={`${Styles["field"]} ${Styles[`field--${fieldState}`]} ${Styles[`${ownerString}`]} ${(isStandingOnBusField && !playedThisRound && isFieldHoverable)?Styles["field--hover"]:""}`}>
            {renderField(field)}
            {players.map((player, index) => {
                return (
                    <div
                        key={index}
                        className={`
                            ${Styles["player"]}
                            ${Styles["player"+(player.id)]}
                            ${(state.currentPlayerIndex+1 === player.id) ? `${Styles["player--active"]}` : ""}
                            ${(player.bankrupt) ? `${Styles["bankrupt"]}` : ""}`}
                    />
                );
            })}
        </div>
    );
};

export default Field;