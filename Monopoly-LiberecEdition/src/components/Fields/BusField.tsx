import {BusType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";

interface BusFieldProps {
    field: FieldType;
}

export const BusField: FC<BusFieldProps> = ({field}) => {
    const bus = field as BusType;

    return (
        <>
            {/*
            <div className={Styles["field__imgBox--corner"]}>
                <img className={Styles["field__img"]} src={bus.img} alt={bus.text} />
            </div>
            */}

            <div className={Styles["field__misc"]}>
                <p className={Styles["field__title"]}>{bus.text}</p>
            </div>
        </>
    );
};

export default BusField;