import {FreeFieldType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";
import FreeFieldImg from "/img/FreeField.jpg";

interface FreeFieldProps {
    field: FieldType;
}

export const FreeField: FC<FreeFieldProps> = ({field}) => {
    const freeField = field as FreeFieldType;

    return (
        <>
            <div className={Styles["field__misc"]}>
                <p className={Styles["field__title"]}>{freeField.text}</p>
                <div className={Styles["field__imgBox--corner"]}>
                    <img className={Styles["field__img"]} src={FreeFieldImg} alt={freeField.text} />
                </div>
            </div>
        </>
    );
};

export default FreeField;