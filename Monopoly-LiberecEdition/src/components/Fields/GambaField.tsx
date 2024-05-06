import {GambaType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";

interface GambaFieldProps {
    field: FieldType;
}

export const GambaField: FC<GambaFieldProps> = ({field}) => {
    const gamba = field as GambaType;

    return (
        <>
            <div className={Styles["field__misc"]}>
                <p className={Styles["field__title"]}>{gamba.text}</p>
            </div>
            {/*
            <div className={Styles["field__imgBox"]}>
                <img className={Styles["field__img"]} src={gamba.img} alt={gamba.text} />
            </div>
            */}

        </>
    );
};

export default GambaField;