import {JanitorType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";

interface JanitorFieldProps {
    field: FieldType;
}

export const JanitorField: FC<JanitorFieldProps> = ({field}) => {
    const janitor = field as JanitorType;

    return (
        <>
            {/*
            <div className={Styles["field__imgBox--corner"]}>
                <img className={Styles["field__img"]} src={janitor.img} alt={janitor.text} />
            </div>
            */}

            <div className={Styles["field__misc"]}>
                <p className={Styles["field__title"]}>{janitor.text}</p>
            </div>
        </>
    );
};

export default JanitorField;