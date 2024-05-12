import {BusType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";
import BusImg from "/img/Bus.jpg";

interface BusFieldProps {
    field: FieldType;
}

export const BusField: FC<BusFieldProps> = ({field}) => {
    const bus = field as BusType;

    return (
        <>
            <div className={Styles["field__misc"]}>
                <p className={Styles["field__title"]}>{bus.text}</p>
                <div className={Styles["field__imgBox--corner"]}>
                    <img className={Styles["field__img"]} src={BusImg} alt={bus.text} />
                </div>
            </div>
        </>
    );
};

export default BusField;