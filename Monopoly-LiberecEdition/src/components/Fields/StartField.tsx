import {StartType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";
import StartImg from "/img/Start.png";

interface StartFieldProps {
    field: FieldType;
}

export const StartField: FC<StartFieldProps> = ({field}) => {
    const start = field as StartType;

    return (
        <>
            <div className={Styles["field__misc"]}>
                <p className={Styles["field__title"]}>{start.text}</p>
                <div className={Styles["field__imgBox--corner"]}>
                    <img className={Styles["field__img"]} src={StartImg} alt={start.text} />
                </div>
            </div>
        </>
    );
};

export default StartField;