import {StartType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";

interface StartFieldProps {
    field: FieldType;
}

export const StartField: FC<StartFieldProps> = ({field}) => {
    const start = field as StartType;

    return (
        <>
            {/*
            <div className={Styles["field__imgBox--corner"]}>
                <img className={Styles["field__img"]} src={start.img} alt={start.text} />
            </div>
            */}

            <div className={Styles["field__misc"]}>
                <p className={Styles["field__title"]}>{start.text}</p>
            </div>
        </>
    );
};

export default StartField;