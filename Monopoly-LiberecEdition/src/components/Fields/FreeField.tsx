import {FreeFieldType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";

interface FreeFieldProps {
    field: FieldType;
}

export const FreeField: FC<FreeFieldProps> = ({field}) => {
    const freeField = field as FreeFieldType;

    return (
        <>
            {/*
            <div className={Styles["field__imgBox--corner"]}>
                <img className={Styles["field__img"]} src={freeField.img} alt={freeField.text} />
            </div>
            */}

            <div className={Styles["field__misc"]}>
                <p className={Styles["field__title"]}>{freeField.text}</p>
            </div>
        </>
    );
};

export default FreeField;