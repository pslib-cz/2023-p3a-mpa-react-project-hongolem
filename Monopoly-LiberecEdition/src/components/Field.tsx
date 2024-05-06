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
    const {state} = useContext(GameContext);
    const fieldState: FieldState = index % 10 === 0 ? "corner" : Math.floor(index / 10) % 2 === 0 ? "vertical" : "horizontal";
    const owner = state.players.find(player => (
        (field as DistrictType | TramStopType | IncineratorType | DamType).owner === player.id
    ));
    let ownerString = "";

    if (owner) {
        ownerString = `field--player${owner.id}`;
    }
    
    return (
        <div className={`${Styles["field"]} ${Styles[`field--${fieldState}`]} ${Styles[`${ownerString}`]}`}>
            {renderField(field)}
        </div>
    );
};

export default Field;